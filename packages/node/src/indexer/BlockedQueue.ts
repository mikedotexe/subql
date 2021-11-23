// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { delay } from '../utils/promise';

export class BlockedQueue<T> {
  private _queue: T[] = [];
  private _maxSize: number;

  constructor(size: number) {
    this._maxSize = size;
  }

  get size(): number {
    return this._queue.length;
  }

  get freeSize(): number {
    return this._maxSize - this._queue.length;
  }

  put(item: T): void {
    if (this._queue.length >= this._maxSize) {
      throw new Error('BlockedQueue exceed max size');
    }
    this._queue.push(item);
  }

  putAll(items: T[]): void {
    if (this._queue.length + items.length > this._maxSize) {
      throw new Error('BlockedQueue exceed max size');
    }
    this._queue.push(...items);
  }

  async take(): Promise<T> {
    while (!this.size) {
      await delay(0.1);
    }
    return this._queue.shift();
  }
  async takeAll(max?: number): Promise<T[]> {
    while (!this.size) {
      await delay(0.1);
    }
    let result;
    if (max) {
      result = this._queue.slice(0, max);
      this._queue = this._queue.slice(max);
    } else {
      result = this._queue;
      this._queue = [];
    }
    return result;
  }
}

export class Queue<T> {
  private items: T[] = [];

  get size(): number {
    return this.items.length;
  }

  put(item: T): void {
    this.putMany([item]);
  }

  putMany(items: T[]): void {
    this.items.push(...items);
  }

  take(): T | undefined {
    return this.items.shift();
  }

  takeAll(): T[] {
    const result = this.items;

    this.items = [];
    return result;
  }
}

type Action<T> = {
  task: () => Promise<T> | T;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
};

export class AutoQueue<T> {
  private pendingPromise = false;
  private queue = new Queue<Action<T>>();

  async put(item: () => T): Promise<T> {
    return this.putMany([item])[0];
  }

  putMany(tasks: Array<() => T>): Promise<T>[] {
    return tasks.map((task, index) => {
      return new Promise((resolve, reject) => {
        this.queue.put({ task, resolve, reject });
        if (tasks.length - 1 === index) {
          void this.take();
        }
      });
    });
  }

  async take(): Promise<boolean> {
    if (this.pendingPromise) return false;

    const action = this.queue.take();

    if (!action) return false;

    try {
      this.pendingPromise = true;
      const payload = await action.task();

      action.resolve(payload);
    } catch (e) {
      action.reject(e);
    } finally {
      this.pendingPromise = false;
      void this.take();
    }

    return true;
  }
}

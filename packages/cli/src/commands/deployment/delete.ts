// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {readFileSync, existsSync} from 'fs';
import path from 'path';
import {Command, Flags} from '@oclif/core';
import cli from 'cli-ux';
import {deleteDeployment} from '../../controller/deploy-controller';

const ACCESS_TOKEN_PATH = path.resolve(process.env.HOME, '.subql/SUBQL_ACCESS_TOKEN');

export default class Delete extends Command {
  static description = 'Delete Deployment';

  static flags = {
    key: Flags.string({description: 'Enter project key', required: true}),
    deploymentID: Flags.string({description: 'Enter deployment ID', required: true}),
    // token: Flags.string({description: 'Enter access token'}),
  };

  async run(): Promise<void> {
    const {flags} = await this.parse(Delete);
    let authToken: string;
    let deploymentID: number = +flags.deploymentID;
    let projectKey: string = flags.key;

    if (process.env.SUBQL_ACCESS_TOKEN) {
      authToken = process.env.SUBQL_ACCESS_TOKEN;
    } else if (existsSync(ACCESS_TOKEN_PATH)) {
      try {
        authToken = process.env.SUBQL_ACCESS_TOKEN ?? readFileSync(ACCESS_TOKEN_PATH, 'utf8');
      } catch (e) {
        authToken = await cli.prompt('Token cannot be found, Enter token');
      }
    } else {
      authToken = await cli.prompt('Enter token');
    }

    if (!flags.deploymentID || flags.deploymentID === '') {
      try {
        deploymentID = await cli.prompt('Enter deployment ID');
      } catch (e) {
        throw new Error('Deployment ID is required');
      }
    }
    if (!flags.key || flags.key === '') {
      try {
        projectKey = await cli.prompt('Enter project key');
      } catch (e) {
        throw new Error('Project key is required');
      }
    }

    this.log(`Removing deployment: ${deploymentID}`);
    const deleteStatus = await deleteDeployment(projectKey, authToken, +deploymentID).catch((e) => this.error(e));
    this.log(`${deleteStatus}`);
  }
}

// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {readFileSync, existsSync} from 'fs';
import path from 'path';
import {Command, Flags} from '@oclif/core';
import cli from 'cli-ux';
import {createProject} from '../../controller/project-controller';

const ACCESS_TOKEN_PATH = path.resolve(process.env.HOME, '.subql/SUBQL_ACCESS_TOKEN');

export default class Create_project extends Command {
  static description = 'Delete Project from Hosted Service';

  static flags = {
    // required values
    org: Flags.string({description: 'Enter organization name'}),
    project_name: Flags.string({description: 'Enter project name'}),
    gitRepository: Flags.string({description: 'Enter git repository'}),

    // optional values
    logoURL: Flags.string({description: 'Enter logo URL', default: ''}),
    subtitle: Flags.string({description: 'Enter subtitle', default: ''}),
    description: Flags.string({description: 'Enter description', default: ''}),
    apiVersion: Flags.string({description: 'Enter api version', default: '2'}),
  };

  async run(): Promise<void> {
    const {flags} = await this.parse(Create_project);
    let authToken: string;
    let project_name: string = flags.project_name;
    let org_input: string = flags.org;
    let gitRepo_input: string = flags.gitRepository;

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

    if (!flags.org || flags.org === '') {
      try {
        org_input = await cli.prompt('Enter organization name');
      } catch (e) {
        throw new Error('Organization name is required');
      }
    }
    if (!flags.project_name || flags.project_name === '') {
      try {
        project_name = await cli.prompt('Enter project key');
      } catch (e) {
        throw new Error('Project name is required');
      }
    }

    if (!flags.gitRepository || flags.gitRepository === '') {
      try {
        gitRepo_input = await cli.prompt('Enter git repository');
      } catch (e) {
        throw new Error('Git repository is required');
      }
    }

    const createStatus = await createProject(
      org_input,
      flags.subtitle,
      flags.logoURL,
      project_name,
      authToken,
      gitRepo_input,
      flags.description,
      flags.apiVersion
    ).catch((e) => this.error(e));
    this.log(`${createStatus}`);
  }
}

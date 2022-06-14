// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {deploymentSpec} from '../types';
import {delay} from '../utils';
import {
  deployToHostedService,
  promoteDeployment,
  deleteDeployment,
  deploymentStatus,
  ipfsCID_validate,
  getEndpoint,
  getDictEndpoint,
  getImage_v,
} from './deploy-controller';
import {createProject, deleteProject} from './project-controller';

jest.setTimeout(120000);
const projectSpec: deploymentSpec = {
  org: 'bz888',
  project_name: 'mocked_starter',
  repository: 'https://github.com/bz888/test-deployment-2',
  ipfs: 'QmaVh8DGzuRCJZ5zYEDxXQsXYqP9HihjjeuxNNteSDq8xX',
  subtitle: '',
  description: '',
  logoURl: '',
  apiVersion: '2',
};

// Replace/Update your access token when test locally
const testAuth = process.env.SUBQL_ACCESS_TOKEN;

describe('CLI deploy, delete, promote', () => {
  beforeAll(async () => {
    const {apiVersion, description, logoURl, org, project_name, repository, subtitle} = projectSpec;
    try {
      await createProject(org, subtitle, logoURl, project_name, testAuth, repository, description, apiVersion, true);
    } catch (e) {
      console.warn(`Failed at create project ${project_name} ${e}`);
    }
  });

  afterAll(async () => {
    try {
      await deleteProject(testAuth, projectSpec.org, projectSpec.project_name, true);
    } catch (e) {
      console.warn('Failed to delete project', e);
    }
  });

  it('Deploy to Hosted Service and Delete', async () => {
    const {ipfs, org, project_name} = projectSpec;

    const validator = await ipfsCID_validate(ipfs, testAuth, true);
    const indexer_v = await getImage_v(
      validator.manifestRunner.node.name,
      validator.manifestRunner.node.version,
      testAuth,
      true
    );
    const query_v = await getImage_v(
      validator.manifestRunner.query.name,
      validator.manifestRunner.query.version,
      testAuth,
      true
    );
    const endpoint = await getEndpoint(validator.chainId, true);
    const dictEndpoint = await getDictEndpoint(validator.chainId, true);
    const deploy_output = await deployToHostedService(
      org,
      project_name,
      testAuth,
      ipfs,
      indexer_v[0],
      query_v[0],
      endpoint,
      'stage',
      dictEndpoint,
      true
    );

    const del_output = await deleteDeployment(org, project_name, testAuth, deploy_output.id, true);
    expect(typeof deploy_output.id).toBe('number');
    expect(+del_output).toBe(deploy_output.id);
  });

  // Only test locally
  it.skip('Promote Deployment', async () => {
    const {ipfs, org, project_name} = projectSpec;
    let status: string;
    let attempt = 0;
    const validator = await ipfsCID_validate(ipfs, testAuth, true);
    const indexer_v = await getImage_v(
      validator.manifestRunner.node.name,
      validator.manifestRunner.node.version,
      testAuth,
      true
    );
    const query_v = await getImage_v(
      validator.manifestRunner.query.name,
      validator.manifestRunner.query.version,
      testAuth,
      true
    );
    const endpoint = await getEndpoint(validator.chainId, true);
    const dictEndpoint = await getDictEndpoint(validator.chainId, true);

    const deploy_output = await deployToHostedService(
      org,
      project_name,
      testAuth,
      ipfs,
      indexer_v[0],
      query_v[0],
      endpoint,
      'stage',
      dictEndpoint,
      true
    );

    while (status !== 'running') {
      if (attempt >= 5) break;
      attempt = attempt + 1;
      await delay(30);
      status = await deploymentStatus(org, project_name, testAuth, deploy_output.id, true);
      if (status === 'running') {
        const promote_output = await promoteDeployment(org, project_name, testAuth, deploy_output.id, true);
        expect(+promote_output).toBe(deploy_output.id);
      }
    }
  });
  it('should return true for valid ipfsCID', async () => {
    const validator = await ipfsCID_validate(projectSpec.ipfs, testAuth, true);
    expect(validator.valid).toBe(true);
  });
  it('to throw error for invalid ipfsCID', async () => {
    const validator = await ipfsCID_validate(projectSpec.ipfs, testAuth, true);
    expect(validator.valid).toBe(true);
  });

  it('get Endpoint - polkadot', async () => {
    const validator = await ipfsCID_validate(projectSpec.ipfs, testAuth, true);
    const endpoint = await getEndpoint(validator.chainId, true);
    expect(endpoint).toBe('wss://polkadot.api.onfinality.io/public-ws');
  });
  it('get DictEndpoint - polkadot', async () => {
    const validator = await ipfsCID_validate(projectSpec.ipfs, testAuth, true);
    const dict = await getDictEndpoint(validator.chainId);
    expect(dict).toBe('https://api.subquery.network/sq/subquery/polkadot-dictionary');
  });
});

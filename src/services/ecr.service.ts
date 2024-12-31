import type { Repository } from '../types/ecr';

export class ECRService {
  async getRepositories(): Promise<Repository[]> {
    // Mock data for development
    return [
      { repositoryName: 'app1', repositoryUri: 'registry.example.com/app1' },
      { repositoryName: 'app2', repositoryUri: 'registry.example.com/app2' },
      { repositoryName: 'app3', repositoryUri: 'registry.example.com/app3' }
    ];
  }

  async createRepository(repositoryName: string): Promise<Repository> {
    return {
      repositoryName,
      repositoryUri: `registry.example.com/${repositoryName}`
    };
  }
}
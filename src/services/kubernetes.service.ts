import type { KubernetesDeployment, Pod, Service } from '../types/kubernetes';
import { mockDeployments, mockPods, mockServices } from './mock-data';

export class KubernetesService {
  async getDeployments(namespace: string = 'default'): Promise<KubernetesDeployment[]> {
    return mockDeployments.filter(d => d.namespace === namespace);
  }

  async scaleDeployment(name: string, namespace: string, replicas: number): Promise<void> {
    const deployment = mockDeployments.find(d => d.name === name && d.namespace === namespace);
    if (deployment) {
      deployment.replicas = replicas;
      deployment.availableReplicas = replicas;
    }
  }

  async deleteDeployment(name: string, namespace: string): Promise<void> {
    const index = mockDeployments.findIndex(d => d.name === name && d.namespace === namespace);
    if (index !== -1) {
      mockDeployments.splice(index, 1);
    }
  }

  async getPods(namespace: string = 'default'): Promise<Pod[]> {
    return mockPods.filter(p => p.namespace === namespace);
  }

  async deletePod(name: string, namespace: string): Promise<void> {
    const index = mockPods.findIndex(p => p.name === name && p.namespace === namespace);
    if (index !== -1) {
      mockPods.splice(index, 1);
    }
  }

  async getServices(namespace: string = 'default'): Promise<Service[]> {
    return mockServices.filter(s => s.namespace === namespace);
  }
}
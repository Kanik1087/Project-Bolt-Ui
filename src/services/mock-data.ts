// Mock data for development
export const mockDeployments = [
  {
    name: 'frontend',
    namespace: 'default',
    replicas: 3,
    availableReplicas: 3,
    containers: [{ name: 'frontend', image: 'nginx:latest' }],
    createdAt: '2024-01-20T10:00:00Z',
    labels: { app: 'frontend' }
  },
  {
    name: 'backend',
    namespace: 'default',
    replicas: 2,
    availableReplicas: 2,
    containers: [{ name: 'backend', image: 'node:16' }],
    createdAt: '2024-01-20T10:00:00Z',
    labels: { app: 'backend' }
  }
];

export const mockPods = [
  {
    name: 'frontend-pod-1',
    namespace: 'default',
    status: 'Running',
    ip: '10.0.0.1',
    node: 'node-1',
    containers: [{ name: 'frontend', image: 'nginx:latest' }],
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    name: 'backend-pod-1',
    namespace: 'default',
    status: 'Running',
    ip: '10.0.0.2',
    node: 'node-1',
    containers: [{ name: 'backend', image: 'node:16' }],
    createdAt: '2024-01-20T10:00:00Z'
  }
];

export const mockServices = [
  {
    name: 'frontend-svc',
    namespace: 'default',
    type: 'ClusterIP',
    clusterIP: '10.0.0.10',
    ports: [{ port: 80, targetPort: 8080, protocol: 'TCP' }],
    selector: { app: 'frontend' }
  },
  {
    name: 'backend-svc',
    namespace: 'default',
    type: 'ClusterIP',
    clusterIP: '10.0.0.11',
    ports: [{ port: 3000, targetPort: 3000, protocol: 'TCP' }],
    selector: { app: 'backend' }
  }
];
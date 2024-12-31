export interface KubernetesDeployment {
  name: string;
  namespace: string;
  replicas: number;
  availableReplicas: number;
  containers: Container[];
  createdAt: string;
  labels: Record<string, string>;
}

export interface Container {
  name: string;
  image: string;
  ports: number[];
  resources: {
    limits?: {
      cpu?: string;
      memory?: string;
    };
    requests?: {
      cpu?: string;
      memory?: string;
    };
  };
}

export interface Pod {
  name: string;
  namespace: string;
  status: string;
  ip: string;
  node: string;
  containers: Container[];
  createdAt: string;
}

export interface Service {
  name: string;
  namespace: string;
  type: string;
  clusterIP: string;
  ports: ServicePort[];
  selector: Record<string, string>;
}

export interface ServicePort {
  port: number;
  targetPort: number;
  protocol: string;
}
import { ref } from 'vue';
import type { Repository } from '@aws-sdk/client-ecr';

interface DeploymentForm {
  name: string;
  namespace: string;
  image: Repository | null;
  replicas: number;
}

export function useDeploymentForm() {
  const loading = ref(false);
  const form = ref<DeploymentForm>({
    name: '',
    namespace: 'default',
    image: null,
    replicas: 1
  });

  function closeDialog() {
    form.value = {
      name: '',
      namespace: 'default',
      image: null,
      replicas: 1
    };
  }

  async function handleSubmit() {
    loading.value = true;
    try {
      // Implementation for creating new deployment
      closeDialog();
    } catch (error) {
      console.error('Error creating deployment:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    form,
    loading,
    closeDialog,
    handleSubmit
  };
}
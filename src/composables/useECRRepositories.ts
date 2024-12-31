import { ref, onMounted } from 'vue';
import { ECRService } from '../services/ecr.service';
import type { Repository } from '../types/ecr';

export function useECRRepositories() {
  const images = ref<Repository[]>([]);
  const ecrService = new ECRService();

  async function loadRepositories() {
    try {
      images.value = await ecrService.getRepositories();
    } catch (error) {
      console.error('Error loading ECR repositories:', error);
    }
  }

  onMounted(() => {
    loadRepositories();
  });

  return {
    images,
    loadRepositories
  };
}
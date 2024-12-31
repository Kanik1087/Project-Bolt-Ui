<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Pods</h2>
    <DataTable :value="pods" :paginator="true" :rows="10">
      <Column field="name" header="Name" sortable />
      <Column field="namespace" header="Namespace" sortable />
      <Column field="status" header="Status" sortable>
        <template #body="slotProps">
          <Tag :severity="getStatusSeverity(slotProps.data.status)">
            {{ slotProps.data.status }}
          </Tag>
        </template>
      </Column>
      <Column field="ip" header="IP" sortable />
      <Column field="node" header="Node" sortable />
      <Column header="Actions">
        <template #body="slotProps">
          <PrimeButton icon="pi pi-trash" 
                  class="p-button-sm p-button-danger" 
                  @click="deletePod(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { KubernetesService } from '../services/kubernetes.service';
import type { Pod } from '../types/kubernetes';

const k8sService = new KubernetesService();
const pods = ref<Pod[]>([]);

onMounted(async () => {
  await loadPods();
});

async function loadPods() {
  try {
    pods.value = await k8sService.getPods();
  } catch (error) {
    console.error('Error loading pods:', error);
  }
}

function getStatusSeverity(status: string): string {
  switch (status) {
    case 'Running':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Failed':
      return 'danger';
    default:
      return 'info';
  }
}

async function deletePod(pod: Pod) {
  try {
    await k8sService.deletePod(pod.name, pod.namespace);
    await loadPods();
  } catch (error) {
    console.error('Error deleting pod:', error);
  }
}
</script>
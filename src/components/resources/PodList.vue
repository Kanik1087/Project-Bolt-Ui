<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <ResourceCard
        title="Running Pods"
        :subtitle="runningPods + ' pods active'"
        icon="pi pi-check-circle"
        iconBackground="bg-green-500"
      />
      <ResourceCard
        title="Pod Status"
        :subtitle="statusSummary"
        icon="pi pi-chart-bar"
        iconBackground="bg-purple-500"
      />
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Pods</h2>
      </div>

      <DataTable :value="pods" :paginator="true" :rows="10" class="p-4" stripedRows>
        <Column field="name" header="Name" sortable />
        <Column field="namespace" header="Namespace" sortable />
        <Column field="status" header="Status" sortable>
          <template #body="slotProps">
            <Tag :severity="getStatusSeverity(slotProps.data.status)" :value="slotProps.data.status" />
          </template>
        </Column>
        <Column field="ip" header="IP" sortable />
        <Column field="node" header="Node" sortable />
        <Column header="Actions">
          <template #body="slotProps">
            <PrimeButton 
              icon="pi pi-trash" 
              class="p-button-sm p-button-danger p-button-outlined" 
              @click="deletePod(slotProps.data)" 
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { KubernetesService } from '../../services/kubernetes.service';
import type { Pod } from '../../types/kubernetes';
import { useStatusSeverity } from '../../composables/useStatusSeverity';
import ResourceCard from '../dashboard/ResourceCard.vue';

const k8sService = new KubernetesService();
const pods = ref<Pod[]>([]);
const { getStatusSeverity } = useStatusSeverity();

const runningPods = computed(() => {
  return pods.value.filter(pod => pod.status.toLowerCase() === 'running').length;
});

const statusSummary = computed(() => {
  const statuses = pods.value.reduce((acc, pod) => {
    acc[pod.status] = (acc[pod.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(statuses)
    .map(([status, count]) => `${status}: ${count}`)
    .join(' | ');
});

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

async function deletePod(pod: Pod) {
  try {
    await k8sService.deletePod(pod.name, pod.namespace);
    await loadPods();
  } catch (error) {
    console.error('Error deleting pod:', error);
  }
}
</script>
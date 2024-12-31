<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Services</h2>
    <DataTable :value="services" :paginator="true" :rows="10">
      <Column field="name" header="Name" sortable />
      <Column field="namespace" header="Namespace" sortable />
      <Column field="type" header="Type" sortable />
      <Column field="clusterIP" header="Cluster IP" sortable />
      <Column field="ports" header="Ports">
        <template #body="slotProps">
          <div v-for="port in slotProps.data.ports" :key="port.port">
            {{ port.port }}:{{ port.targetPort }} ({{ port.protocol }})
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { KubernetesService } from '../services/kubernetes.service';
import type { Service } from '../types/kubernetes';

const k8sService = new KubernetesService();
const services = ref<Service[]>([]);

onMounted(async () => {
  await loadServices();
});

async function loadServices() {
  try {
    services.value = await k8sService.getServices();
  } catch (error) {
    console.error('Error loading services:', error);
  }
}
</script>
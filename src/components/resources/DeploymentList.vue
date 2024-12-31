<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <ResourceCard
        title="Total Deployments"
        :subtitle="deployments.length + ' deployments running'"
        icon="pi pi-server"
        iconBackground="bg-blue-500"
      />
      <ResourceCard
        title="Total Replicas"
        :subtitle="totalReplicas + ' pods managed'"
        icon="pi pi-copy"
        iconBackground="bg-indigo-500"
      />
      <ResourceCard
        title="Cluster Status"
        subtitle="All systems operational"
        icon="pi pi-check-circle"
        iconBackground="bg-green-500"
      />
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">Deployments</h2>
        <PrimeButton 
          label="New Deployment" 
          icon="pi pi-plus" 
          class="p-button-primary" 
          @click="showNewDeploymentDialog" 
        />
      </div>

      <DataTable 
        :value="deployments" 
        :paginator="true" 
        :rows="10"
        class="p-4"
        stripedRows
        responsiveLayout="scroll"
      >
        <Column field="name" header="Name" sortable>
          <template #body="slotProps">
            <div class="font-semibold text-blue-600">{{ slotProps.data.name }}</div>
          </template>
        </Column>
        <Column field="namespace" header="Namespace" sortable />
        <Column field="replicas" header="Replicas" sortable>
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <div class="flex items-center space-x-2">
                <span class="font-medium">{{ slotProps.data.availableReplicas }}/{{ slotProps.data.replicas }}</span>
                <div class="flex -space-x-1">
                  <PrimeButton 
                    icon="pi pi-minus" 
                    class="p-button-sm p-button-outlined" 
                    @click="scaleDeployment(slotProps.data, -1)" 
                  />
                  <PrimeButton 
                    icon="pi pi-plus" 
                    class="p-button-sm p-button-outlined" 
                    @click="scaleDeployment(slotProps.data, 1)" 
                  />
                </div>
              </div>
            </div>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex gap-2">
              <PrimeButton 
                icon="pi pi-pencil" 
                class="p-button-sm p-button-outlined" 
                @click="editDeployment(slotProps.data)" 
              />
              <PrimeButton 
                icon="pi pi-trash" 
                class="p-button-sm p-button-danger p-button-outlined" 
                @click="deleteDeployment(slotProps.data)" 
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { KubernetesService } from '../../services/kubernetes.service';
import type { KubernetesDeployment } from '../../types/kubernetes';
import ResourceCard from '../dashboard/ResourceCard.vue';

const k8sService = new KubernetesService();
const deployments = ref<KubernetesDeployment[]>([]);

const totalReplicas = computed(() => {
  return deployments.value.reduce((sum, dep) => sum + dep.replicas, 0);
});

onMounted(async () => {
  await loadDeployments();
});

async function loadDeployments() {
  try {
    deployments.value = await k8sService.getDeployments();
  } catch (error) {
    console.error('Error loading deployments:', error);
  }
}

async function scaleDeployment(deployment: KubernetesDeployment, change: number) {
  const newReplicas = deployment.replicas + change;
  if (newReplicas < 0) return;

  try {
    await k8sService.scaleDeployment(deployment.name, deployment.namespace, newReplicas);
    await loadDeployments();
  } catch (error) {
    console.error('Error scaling deployment:', error);
  }
}

async function deleteDeployment(deployment: KubernetesDeployment) {
  try {
    await k8sService.deleteDeployment(deployment.name, deployment.namespace);
    await loadDeployments();
  } catch (error) {
    console.error('Error deleting deployment:', error);
  }
}

function editDeployment(deployment: KubernetesDeployment) {
  // Implementation for editing deployment
}

function showNewDeploymentDialog() {
  // Implementation for showing new deployment dialog
}
</script>
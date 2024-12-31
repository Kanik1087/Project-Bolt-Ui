<template>
  <DataTable :value="deployments" :paginator="true" :rows="10">
    <Column field="name" header="Name" sortable>
      <template #body="slotProps">
        <div class="font-semibold">{{ slotProps.data.name }}</div>
      </template>
    </Column>
    <Column field="namespace" header="Namespace" sortable />
    <Column field="replicas" header="Replicas" sortable>
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <span>{{ slotProps.data.availableReplicas }}/{{ slotProps.data.replicas }}</span>
          <PrimeButton icon="pi pi-minus" class="p-button-sm" @click="$emit('scale', slotProps.data, -1)" />
          <PrimeButton icon="pi pi-plus" class="p-button-sm" @click="$emit('scale', slotProps.data, 1)" />
        </div>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <div class="flex gap-2">
          <PrimeButton icon="pi pi-pencil" class="p-button-sm" @click="$emit('edit', slotProps.data)" />
          <PrimeButton icon="pi pi-trash" class="p-button-sm p-button-danger" @click="$emit('delete', slotProps.data)" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import type { KubernetesDeployment } from '../../types/kubernetes';

defineProps<{
  deployments: KubernetesDeployment[]
}>();

defineEmits<{
  (e: 'scale', deployment: KubernetesDeployment, change: number): void
  (e: 'edit', deployment: KubernetesDeployment): void
  (e: 'delete', deployment: KubernetesDeployment): void
}>();
</script>
// Update Button component name in template
<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Deployments</h2>
      <PrimeButton label="New Deployment" icon="pi pi-plus" @click="showNewDeploymentDialog" />
    </div>

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
            <PrimeButton icon="pi pi-minus" class="p-button-sm" @click="scaleDeployment(slotProps.data, -1)" />
            <PrimeButton icon="pi pi-plus" class="p-button-sm" @click="scaleDeployment(slotProps.data, 1)" />
          </div>
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <PrimeButton icon="pi pi-pencil" class="p-button-sm" @click="editDeployment(slotProps.data)" />
            <PrimeButton icon="pi pi-trash" class="p-button-sm p-button-danger" @click="deleteDeployment(slotProps.data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
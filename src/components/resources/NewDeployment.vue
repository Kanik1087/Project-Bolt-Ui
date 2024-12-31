<template>
  <Dialog v-model:visible="visible" header="New Deployment" :modal="true" class="w-[600px]">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model="form.name" required class="w-full" />
      </div>

      <div class="field">
        <label for="namespace">Namespace</label>
        <InputText id="namespace" v-model="form.namespace" required class="w-full" />
      </div>

      <div class="field">
        <label for="image">Container Image</label>
        <Dropdown id="image" 
                  v-model="form.image" 
                  :options="images" 
                  optionLabel="name"
                  class="w-full" />
      </div>

      <div class="field">
        <label for="replicas">Replicas</label>
        <InputNumber id="replicas" 
                     v-model="form.replicas" 
                     :min="1" 
                     required 
                     class="w-full" />
      </div>

      <div class="flex justify-end gap-2">
        <PrimeButton type="button" 
                label="Cancel" 
                class="p-button-secondary" 
                @click="closeDialog" />
        <PrimeButton type="submit" 
                label="Create" 
                :loading="loading" />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useECRRepositories } from '../../composables/useECRRepositories';
import { useDeploymentForm } from '../../composables/useDeploymentForm';

const { images } = useECRRepositories();
const { form, loading, closeDialog, handleSubmit } = useDeploymentForm();

defineExpose({ visible: ref(false) });
</script>
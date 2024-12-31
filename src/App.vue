<template>
  <div class="min-h-screen bg-gray-100">
    <AppHeader />
    <main class="max-w-7xl mx-auto px-4 py-6">
      <MainTabs />
    </main>
    <NewDeployment ref="newDeploymentDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import MainTabs from './components/layout/MainTabs.vue';
import NewDeployment from './components/resources/NewDeployment.vue';

const newDeploymentDialog = ref();
</script>
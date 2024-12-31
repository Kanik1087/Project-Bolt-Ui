<template>
  <div class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
    <div class="flex items-center space-x-3">
      <div class="p-3 rounded-full" :class="iconBackground">
        <i :class="icon" class="text-white text-xl"></i>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="text-gray-500 text-sm">{{ subtitle }}</p>
      </div>
    </div>
    <div class="mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  icon: string;
  iconBackground: string;
}>();
</script>
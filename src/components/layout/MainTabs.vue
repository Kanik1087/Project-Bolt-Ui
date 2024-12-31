<template>
  <TabView>
    <TabPanel header="Deployments">
      <DeploymentList />
    </TabPanel>
    <TabPanel header="Pods">
      <PodList />
    </TabPanel>
    <TabPanel header="Services">
      <ServiceList />
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import DeploymentList from '../resources/DeploymentList.vue';
import PodList from '../resources/PodList.vue';
import ServiceList from '../resources/ServiceList.vue';
</script>
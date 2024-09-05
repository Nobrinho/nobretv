<script setup lang="ts">
import TopBar from './layout/TopBar.vue';
</script>
<template>
  <TopBar />
  <main>
    <router-view />
  </main>
</template>
<style scoped lang="css">
main {
  padding: 20px;
  background-color: rgb(0, 0, 0);
  color: rgb(0, 0, 0);
}
</style>
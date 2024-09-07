<template>
  <div class="main">
    <TopBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TopBar from './layout/TopBar.vue';
</script>

<style lang="css">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
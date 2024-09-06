<script setup lang="ts">
import TopBar from './layout/TopBar.vue';
</script>
<template>
  <div class="main">
    <TopBar />
    <div>
      <router-view />
    </div>
  </div>
</template>
<style lang="css"></style>
<template>
  <div class="h-screen text-white">
    <p>This is an Home page</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import nobretvService from '@/services/nobretv.service'
import type { MediaType } from '@/types/MediaType';
const list = ref([] as MediaType[])



const fetchList = async () => {
  try {
    const response = await nobretvService.getAll()
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
};

fetchList()


</script>

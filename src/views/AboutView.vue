<template>
  <ContainerCard>
    <p class="text-white">Olá, eu sou o AboutView</p>
    <pre class="text-white">{{ mediaInfo.original_title }}</pre>
  </ContainerCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ContainerCard from '@/components/ContainerCard.vue'
import nobretvService from '@/services/nobretv.service';
import type { AboutMediaType } from '@/types/AboutMediaType';
import router from '@/router';

const mediaInfo = ref({} as AboutMediaType)
const id = Number(router.currentRoute.value.params.id)


const getMediaById = async (id: number) => {
  try {
    const response = await nobretvService.getMovieById(id)
    mediaInfo.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
getMediaById(id)
</script>

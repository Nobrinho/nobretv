<template>
  <ContainerCard>
    <p class="text-white">Olá, eu sou o AboutView</p>
    <pre class="text-white">{{ mediaInfo }}</pre>
  </ContainerCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ContainerCard from '@/components/ContainerCard.vue'
import nobretvService from '@/services/nobretv.service';
import type { AboutMediaType } from '@/types/AboutMediaType';

const id = 220564 as unknown as number
const mediaInfo = ref({} as AboutMediaType)

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

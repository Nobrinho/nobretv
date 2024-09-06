<template>
  <div class="h-dvh text-white">
    <ContainerCard>
      <CardMedia :result="media" v-for="media in list" :key="media.id" />
    </ContainerCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardMedia from '@/components/CardMedia.vue'
import nobretvService from '@/services/nobretv.service'
import ContainerCard from '@/components/ContainerCard.vue'
import type { ResultType } from '@/types/ResultType'

const list = ref([] as ResultType[])

const getMedias = async () => {
  try {
    const response = await nobretvService.getAll()
    list.value = response.data.results.slice(0, 24)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

getMedias()
</script>

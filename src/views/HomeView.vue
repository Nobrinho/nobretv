<template>
  <div class="h-dvh text-white">
    <ContainerCard>
      <CardMedia :result="media" v-for="media in list" :key="media.id" />
    </ContainerCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CardMedia from '@/components/CardMedia.vue'
import nobretvService from '@/services/nobretv.service'
import ContainerCard from '@/components/ContainerCard.vue'
import type { ResultType } from '@/types/ResultType'

const list = ref([] as ResultType[])
const isLoading = ref(false)
const page = ref(1)

const getMedias = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const response = await nobretvService.getAll(page.value)
    list.value = [...list.value, ...response.data.results]
    page.value++
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleScroll = () => {
  const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 10
  if (bottomOfWindow) {
    getMedias()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  getMedias()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

getMedias()
</script>

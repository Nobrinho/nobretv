<template>
  <div class="h-dvh text-white">
    <FirstLoadingComponent v-if="firstLoading" />
    <ContainerCard v-else>
      <CardMedia :result="media" v-for="media in list" :key="media.id" />
    </ContainerCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CardMedia from '@/components/CardMediaComponent.vue'
import nobretvService from '@/services/nobretv.service'
import ContainerCard from '@/components/ContainerCardComponent.vue'
import type { ResultType } from '@/types/ResultType'
import FirstLoadingComponent from '@/components/FirstLoadingComponent.vue'

const list = ref([] as ResultType[])
const isLoading = ref(false)
const page = ref(1)
const firstLoading = ref(true)

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
    firstLoading.value = false
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
<style scoped></style>

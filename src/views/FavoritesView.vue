<template>
  <div class="h-dvh text-white">
    <ContainerCard>
      <CardMedia @reload="removedId" :result="media" v-for="media in list" :key="media.id" />
    </ContainerCard>
    <div v-if="showToast"
      class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300"
      @click="showToast = false">
      Favorito removido com sucesso!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CardMedia from '@/components/CardMedia.vue'
import nobretvService from '@/services/nobretv.service'
import ContainerCard from '@/components/ContainerCard.vue'
import type { ResultType } from '@/types/ResultType'

const list = ref([] as ResultType[])
const showToast = ref(false)
const removedId = (id: number) => {
  list.value = list.value.filter((media) => media.id !== id)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 1000)
}
const isLoading = ref(false)
const page = ref(1)

const getMedias = async () => {
  const account_id = 21501065
  if (isLoading.value) return
  isLoading.value = true
  try {
    const [response, responseSeries] = await Promise.all([
      nobretvService.getFavorites(account_id, page.value),
      nobretvService.getFavoritesSeries(account_id, page.value)
    ])
    list.value = [...list.value, ...response.data.results, ...responseSeries.data.results]
    page.value += 2
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}
getMedias()

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
</script>

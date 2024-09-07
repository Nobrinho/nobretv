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
import { ref } from 'vue'
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

const getMedias = async () => {
  const account_id = 21501065
  try {
    const response = await nobretvService.getFavorites(account_id)
    list.value.push(...response.data.results)
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  try {
    const response = await nobretvService.getFavoritesSeries(account_id)
    list.value.push(...response.data.results)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
getMedias()
</script>

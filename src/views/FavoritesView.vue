<template>
  <div class="h-dvh text-white w-full">
    <FirstLoadingComponent v-if="firstLoading" />
    <div v-else>
      <div v-if="!list.length" class="flex justify-center">
        <img :src="emptList" alt="lista-vazia">
      </div>
      <ContainerCard>
        <CardMedia @reload="removedId" :result="media" v-for="media in list" :key="media.id" />
      </ContainerCard>
      <div v-if="showToast"
        class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300"
        @click="showToast = false">
        Favorito removido com sucesso!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CardMedia from '@/components/CardMediaComponent.vue'
import nobretvService from '@/services/nobretv.service'
import ContainerCard from '@/components/ContainerCardComponent.vue'
import type { ResultType } from '@/types/ResultType'
import emptList from '@/assets/list.svg'
import FirstLoadingComponent from '@/components/FirstLoadingComponent.vue'

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
const firstLoading = ref(true)
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
    firstLoading.value = false
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
<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  /* Light grey */
  border-top: 16px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

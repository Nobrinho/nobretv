<template>
  <div class="realtive h-full">
    <FirstLoadingComponent v-if="firstLoading" class="h-screen" />
    <div v-else>

      <div class="relative flex text-white px-0 py-5 sm:py-0 sm:px-2 gap-4">
        <div class="absolute bg-cover bg-center bg-no-repeat h-full w-full bg-fixed md:h-screen"
          :style="`background-image: url(https://image.tmdb.org/t/p/original/${mediaInfo.backdrop_path}); filter: brightness(40%);`">
        </div>

        <div class="z-30 flex flex-wrap w-full justify-center md:mt-10">
          <div class="w-full md:max-w-96 shadow-xl">
            <img :src="`https://image.tmdb.org/t/p/original/${mediaInfo.poster_path}`" alt="poster"
              class="w-full col-span-1" />
          </div>
          <div class="text-3xl px-2 text-white sm:max-w-[42rem]">
            <p>{{ mediaInfo.name }} - {{ getYear(mediaInfo.first_air_date) }}</p>
            <div class="flex flex-wrap gap-2">
              <p class="text-lg">Lançamento: {{ formatDateBR(mediaInfo.first_air_date) }}</p>
              <div class="text-lg bg-gray-700 rounded shadow  px-2">{{ (mediaInfo.number_of_seasons)
                }} temporada</div>
              <div class="text-lg bg-gray-700 rounded shadow px-2">{{ (mediaInfo.number_of_episodes)
                }} episódios</div>
              <div class="flex gap-2 flex-wrap">
                <div v-for="item in mediaInfo.genres" :key="item.id"
                  class="bg-gray-300 rounded shadow text-black text-lg px-2">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="flex gap-4 mt-2">
              <ModalTrailerComponent :trailer_key="trailer_key" :disable="disableButton" v-if="trailer_key" />
              <button v-if="favorite" @click="addFavorite" class="rounded-full bg-gray-700 w-10 h-10 flex justify-center items-center shadow-md hover:bg-red-600 hover:scale-110
            ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                  <path
                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </button>
            </div>
            <div class="text-2xl my-4">
              {{ mediaInfo.tagline }}
            </div>
            <div class="italic text-2xl md:max-w-[40rem]">
              {{ mediaInfo.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showToast"
      class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300"
      @click="showToast = false">
      Favorito adicionado com sucesso!
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import nobretvService from '@/services/nobretv.service'
import type { AboutMediaType } from '@/types/AboutMediaType'
import FirstLoadingComponent from '@/components/FirstLoadingComponent.vue'
import ModalTrailerComponent from '@/components/ModalTrailerComponent.vue'

const mediaInfo = ref({} as AboutMediaType)
const id = Number(localStorage.getItem('mediaId'))
const trailer_key = ref('')
const disableButton = ref(false)
const favorite = ref(true)
const page = ref(1)
const showToast = ref(false)
const firstLoading = ref(true)


const getMediaById = async (id: number) => {
  try {
    let response
    response = await nobretvService.getSerieById(id)
    mediaInfo.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    firstLoading.value = false
  }
}

const getTrailer = async () => {
  try {
    const response = await nobretvService.getDataTrailerSeries(id)
    const trailer = response.data.results.find((item: any) => item.type === 'Trailer' && item.site === 'YouTube')
    if (trailer) {
      trailer_key.value = trailer.key
      disableButton.value = true
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
getMediaById(id)
getTrailer()


const formatDateBR = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getYear = (value: string) => {
  if (!value) return ''
  const date = new Date(value)
  const year = date.getFullYear()
  return year
}

const addFavorite = () => {
  const acount_id = 21501065
  const payload = {
    media_type: 'tv',
    media_id: mediaInfo.value.id,
    favorite: true
  }
  nobretvService.addToFavorites(acount_id, payload)
    .then(() => {
      favorite.value = true
      isFavorite()
    })
    .catch((error) => {
      console.error('Error adding favorite:', error)
    }).finally(() => {
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 1000)
    })
}

const isFavorite = () => {
  const acount_id = 21501065
  nobretvService.getFavoritesSeries(acount_id, page.value)
    .then((response) => {
      const favorite_id = response.data.results.find((item: any) => item.id === mediaInfo.value.id)
      if (favorite_id) {
        favorite.value = false
      }
    })
    .catch((error) => {
      console.error('Error fetching favorites:', error)
    })
}
isFavorite()



</script>
<style scoped>
@media (max-width: 640px) {
  .grid-cols-4 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

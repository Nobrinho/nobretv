<template>
  <div class="realtive h-full">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="`background-image: url(https://image.tmdb.org/t/p/original/${mediaInfo.backdrop_path})`">
    </div>
    <div class="absolute inset-0 bg-black opacity-70"></div>
    <div class="relative grid grid-cols-4 text-white px-10 py-10 gap-4">
      <div class="sm:col-span-4 md:col-span-1 lg:col-span-1 xl:col-span-1 flex justify-center max-w-96">
        <img :src="`https://image.tmdb.org/t/p/original/${mediaInfo.poster_path}`" alt="poster"
          class="w-full h-full col-span-1 bg-blue-200" />
      </div>
      <div class=" sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 text-3xl px-2">
        <p>{{ mediaInfo.title }} - {{ getYear(mediaInfo.release_date) }}</p>
        <div class="flex flex-wrap gap-2">
          <p class="text-lg">Lançamento: {{ formatDateBR(mediaInfo.release_date) }}</p>
          <div class="text-lg bg-gray-700 rounded shadow text-white px-2">{{ convertMinutesToHours(mediaInfo.runtime)
            }}</div>
          <div class="flex gap-2">
            <div v-for="item in mediaInfo.genres" :key="item.id"
              class="bg-gray-200 rounded shadow text-black text-lg px-2">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="flex gap-4 mt-2">
          <button class="rounded-full bg-gray-900 w-10 h-10 flex justify-center items-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>
          <ModalComponent :trailer_key="trailer_key" :disable="disableButton" />
        </div>
        <div>
          {{ mediaInfo.tagline }}
        </div>
        <div>
          {{ mediaInfo.overview }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import nobretvService from '@/services/nobretv.service';
import type { AboutMediaType } from '@/types/AboutMediaType';
import router from '@/router';
import ModalComponent from '@/components/ModalComponent.vue';

const mediaInfo = ref({} as AboutMediaType)
const id = Number(router.currentRoute.value.params.id)
const trailer_key = ref('')
const disableButton = ref(false)


const getMediaById = async (id: number) => {
  const { name } = router.currentRoute.value

  try {
    let response
    if (name === 'movies-view') {
      response = await nobretvService.getMovieById(id)
    } else {
      response = await nobretvService.getSerieById(id)
    }
    mediaInfo.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const getTrailer = async () => {
  try {
    const response = await nobretvService.getDataTrailer(id)
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

const convertMinutesToHours = (minutes: number) => {
  if (isNaN(minutes) || minutes < 0) return 'Invalid input'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}



</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div @click="navigateToView" @mouseover="hover = true" @mouseleave="hover = false"
            class=" relative rounded shadow-lg w-full sm:w-2/2 md:w-3/3 lg:w-4/4 xl:w-5/5 transform transition-transform duration-200 hover:scale-105">
            <img :src="`https://image.tmdb.org/t/p/original/${props.result.poster_path}`" alt="media-poster"
                class="w-full h-auto rounded-t">
            <button v-if="hover && routeName === 'favorites'"
                class="absolute top-0 right-0 shadow-lg p-2 bg-red-600 text-white hover:border-red-600 hover:bg-white hover:text-red-600"
                @click.stop="removeFavorites">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { ResultType } from '@/types/ResultType'
import { ref } from 'vue'
import nobretvService from '@/services/nobretv.service'

const router = useRouter()
const hover = ref(false)
const routeName = router.currentRoute.value.name



const navigateToView = () => {
    const { id, release_date } = props.result;
    const route = release_date ? '/movies/' : '/series/';
    router.push(route + id)
}
const props = defineProps({
    result: {
        type: Object as () => ResultType,
        required: true
    }
})

const emits = defineEmits(['reload']);

const removeFavorites = () => {
    const { release_date } = props.result
    const media = release_date ? 'movie' : 'tv';
    const acount_id = 21501065
    const payload = {
        media_type: media,
        media_id: props.result.id,
        favorite: false
    }
    nobretvService.addToFavorites(acount_id, payload)
        .then(() => {
            emits('reload', props.result.id)
        })
        .catch((error) => {
            console.error('Error adding favorite:', error)
        })
}
</script>
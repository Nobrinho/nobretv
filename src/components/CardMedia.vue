<template>
    <div class="flex flex-col items-center justify-center" @click=navigateToView>
        <div
            class="rounded shadow-lg w-full sm:w-2/2 md:w-3/3 lg:w-4/4 xl:w-5/5 transform transition-transform duration-200 hover:scale-105">
            <img :src="`https://image.tmdb.org/t/p/original/${props.result.poster_path}`" alt="media-poster"
                class="w-full h-auto rounded-t">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { ResultType } from '@/types/ResultType'

const router = useRouter()

const navigateToView = () => {
    const id = props.result.id
    router.push('/view/' + id)
};
const props = defineProps({
    result: {
        type: Object as () => ResultType,
        required: true
    }
})
</script>
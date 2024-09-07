<template>
    <div>
        <div v-if="props.disable" @click="openModal" class="flex item-center justify-center gap-2">
            <button
                class="rounded-xl bg-gray-700 hover:bg-red-600 hover:scale-105 w-30 h-10 flex justify-center items-center gap-2 px-2 shadow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd"
                        d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                        clip-rule="evenodd" />
                </svg>
                <p class="flex items-center text-lg">Assistir trailer</p>
            </button>

        </div>
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-gray-900 p-6 rounded-xl shadow relative sm:w-full md:w-3/4 lg:w-4/4 xl:w-2/4 pt-6 px-0">
                <div v-if="trailer_key" class="flex justify-center py-3">
                    <div class="w-full aspect-w-16 aspect-h-9 sm:h-[26rem] md:h-[24rem] lg:h-[28rem] xl:h-[61rem]">
                        <iframe :src="trailer_url" frameborder="0" class="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <button @click="closeModal"
                    class="absolute top-1 right-2 hover:bg-gray-700 text-white font-bold py-1/2 px-1/2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
        <div :class="{ 'modal-overlay': isModalOpen }" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const trailer_url = ref('')

const props = defineProps({
    trailer_key: String,
    disable: Boolean
})
watch(() => props.trailer_key, () => {
    trailer_url.value = `https://www.youtube.com/embed/${props.trailer_key}`
})

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
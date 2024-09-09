<template>
    <nav
        class="hidden md:flex flex-col md:flex-row py-3 font-bold font-sans text-xl text-white divide-x divide-teal-300 border-b-2 border-teal-300">
        <div class="md:w-1/3 flex justify-center items-center">
            <img :src="logo" alt="">
        </div>
        <div class="md:w-2/3 flex justify-center items-center gap-10 w-full">
            <router-link to="/" class="hover:text-teal-300">Em alta</router-link>
            <router-link to="/movies" class="hover:text-teal-300">Filmes</router-link>
            <router-link to="/series" class="hover:text-teal-300">Séries</router-link>
        </div>
        <div class="md:w-1/3 flex items-center justify-center gap-2">
            <FavoriteIcon />
            <router-link to="/favorites" class="hover:text-teal-300">Minha lista</router-link>
        </div>
    </nav>
    <div class="flex justify-between items center bg-[#11171c] h-16 w-full px-4 md:hidden shadow-2xl">
        <div class="flex items-center">
            <button v-if="!showMenu" class="text-white shadow-2xl" @click="showMenu = true">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </button>
            <button v-else class="text-white shadow-2xl" @click="showMenu = false">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
            <transition name="fade" class="w-full text-xl text-white text-center py-4 shadow-2xl">
                <ul @click="showMenu = false" v-if="showMenu"
                    class="absolute top-12 left-0 bg-[#11171c] text-black z-50">
                    <router-link to="/">
                        <li class="hover:bg-[#18c6b3] mb-2">Em alta</li>
                    </router-link>
                    <router-link to="/movies">
                        <li class="hover:bg-[#18c6b3] mb-2">Filmes</li>
                    </router-link>
                    <router-link to="/series">
                        <li class="hover:bg-[#18c6b3] mb-2">Séries</li>
                    </router-link>
                </ul>
            </transition>
        </div>
        <div class="flex items-center">
            <router-link to="/"> <img :src="logo" alt="NobreTV" /></router-link>
        </div>
        <div class="flex items-center">
            <router-link to="/favorites">
                <FavoriteIcon />
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FavoriteIcon from '@/assets/icons/FavoriteIcon.vue'
import logo from '@/assets/NobreTV2.svg'
const showMenu = ref(false)
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.router-link-active {
    color: #18c6b3;
}
</style>
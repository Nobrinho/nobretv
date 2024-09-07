<template>
    <nav class="flex flex-col md:flex-row h-20 font-bold font-sans text-xl text-white mb-10">
        <div class="md:w-1/3 border-2 border-white flex justify-center items-center">
            <p class="">NobreTV</p>
        </div>
        <div class="md:w-2/3 flex justify-center items-center gap-10 w-full border-2">
            <router-link to="/">Em alta</router-link>
            <router-link to="/movies">Filmes</router-link>
            <router-link to="/series">Séries</router-link>
        </div>
        <div class="md:w-1/3 border-2 flex items-center justify-center">
            <router-link to="/favorites">Minha lista</router-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
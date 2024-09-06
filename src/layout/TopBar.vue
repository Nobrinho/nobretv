<template>
    <nav class="flex flex-row h-20 font-bold font-sans text-xl text-white mb-10">
        <div class="basis-1/3 border-2 border-white flex justify-center items-center">
            <p class="">NobreTV</p>
        </div>
        <div class="basis-3/3 flex justify-center items-center gap-10 w-full border-2">
            <router-link to="/">Home</router-link>
            <router-link to="/movies">Filmes</router-link>
            <router-link to="/series">Séries</router-link>
        </div>
        <div class="basis-1/3 border-2 flex items-center justify-center">
            Search
        </div>
    </nav>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
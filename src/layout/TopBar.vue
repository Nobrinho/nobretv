<template>
    <nav class="bg-brand-400 flex flex-row">
        <div class="basis-1/3">
            NobreTV
        </div>
        <div class="basis-1/3 bg-red-500 flex justify-between">
            <router-link to="/">Home</router-link>
            <router-link to="/series">Séries</router-link>
            <router-link to="/movies">Filmes</router-link>
        </div>
        <div class="basis-1/3">
            Search
        </div>
    </nav>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
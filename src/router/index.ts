import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeriesView from '../views/SeriesView.vue'
import MoviesView from '@/views/MoviesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/series',
      name: 'series',
      component: SeriesView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    }
  ]
})

export default router

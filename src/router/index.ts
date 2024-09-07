import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeriesView from '../views/SeriesView.vue'
import MoviesView from '@/views/MoviesView.vue'
import AboutMovieView from '@/views/AboutMovieView.vue'
import AboutSerieView from '@/views/AboutSerieView.vue'

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
      path: '/series/:id',
      name: 'series-view',
      component: AboutSerieView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/movies/:id',
      name: 'movies-view',
      component: AboutMovieView
    }
  ]
})

export default router

import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/form',
        name: 'form',
        component: FormView
      },
      {
        path: '/favoritos',
        name: 'favoritos',
        component: FavoritosView
      },
    ]
})

export default router

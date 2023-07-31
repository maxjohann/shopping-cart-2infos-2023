import { createRouter, createWebHistory } from 'vue-router'
import FinalizarCompra from '../components/formulario.vue' 
import formularioVue from '../components/formulario.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/FinalizarCompra',
      name: '/Finalizar Compra',
      component: formularioVue
    },
    {
      path: '/',
      name: 'pagamento',
      component: PagamentoView
    },
  

  ]
})

export default router
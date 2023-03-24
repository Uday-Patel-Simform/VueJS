import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AppLogin.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/AppReg.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/carDetail.vue')
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active_nav_link'
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requires_auth: true
    }
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
    component: () => import('../views/CarDetail.vue'),
    meta: {
      requires_auth: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    redirect:{name:'home'}
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active_nav_link'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requires_auth) {
    (window.localStorage.getItem("isLoggedIN")) ? next({ name: 'home' })  : next()
  } else {
    (window.localStorage.getItem("isLoggedIN")) ? next()  : next({ name: 'login' })
  }

})

export default router

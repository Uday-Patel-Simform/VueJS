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
    path: '/users',
    name: 'users',
    component: () => import('../views/UsersList.vue'),
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
  const isLoggedIn = window.localStorage.getItem("isLoggedIN");
  const hasRole = window.localStorage.getItem("role");
  
  if (!to.meta.requires_auth) {
    isLoggedIn ? next({ name: 'home' }) : next();
  } else if (isLoggedIn) {
    if (to.fullPath === '/users' && !hasRole) {
      alert('You are not allowed to access this page!!')
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next({ name: 'login' });
  }
})

export default router

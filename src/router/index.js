import { createRouter, createWebHistory } from 'vue-router'
import { trackEvent } from '@/axios/service/track'
import convertToSeconds from '@/utils/convertToSeconds'
import enterTimeClosure from '@/utils/enterTimeClosure'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/article',
    component: () => import('@/views/admin/index.vue'),
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/article/index.vue')
      },
      {
        path: 'album',
        name: 'album',
        component: () => import('@/views/album/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (from.name && from.name !== 'login') {
    const stayTime = Date.now() - enterTimeClosure.getEnterTime()
    trackEvent('停留页面', `在${from.path}页面停留了${convertToSeconds(stayTime)}秒`)
  }
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
    enterTimeClosure.setEnterTime(Date.now())
  }
})
export default router

import { storeToRefs } from 'pinia'
import useAuthStore from '@/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuth } = storeToRefs(useAuthStore())

  if (!isAuth.value && to.path !== '/login') {
    return navigateTo({
      path: '/login',
      query: { ...to.query, from: to.path }
    })
  }

  if (isAuth.value && (to.path === '/login' || to.path === '/registration')) {
    return navigateTo('/')
  }
})

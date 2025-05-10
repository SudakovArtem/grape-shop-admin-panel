import { defineStore } from 'pinia'
import type { Auth } from '@/types'

export default defineStore('auth', () => {
  const state = reactive<Auth.Model>({
    isAuth: false
  })

  const isAuth = computed<boolean>(() => state.isAuth)

  const setAuth = (value: boolean): void => {
    state.isAuth = value
  }

  return {
    state,
    isAuth,
    setAuth
  }
})

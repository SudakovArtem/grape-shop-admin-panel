import type { nuxtContext } from '@nuxt/types'

// @ts-expect-error nuxtContext
export default defineNuxtPlugin(async (context: nuxtContext) => {
  const {
    $services: { user: userService }
  } = context

  try {
    await userService.checkAuth()
  } catch (error) {
    console.error('Auth check failed:', error)
  }
})

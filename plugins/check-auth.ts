import type { nuxtContext } from '@nuxt/types'

// @ts-expect-error nuxtContext
export default defineNuxtPlugin(async (context: nuxtContext) => {
  const {
    $services: { user: userService }
  } = context

  await userService.checkAuth()
})

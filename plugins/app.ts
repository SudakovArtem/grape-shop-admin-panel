import type { nuxtContext } from '@nuxt/types'

import setConfigs from '@/core/configs'
import setServices from '@/core/services'
import setApi from '@/core/api'
import setAdapters from '@/core/adapters'

// @ts-expect-error nuxtContext
export default defineNuxtPlugin((context: nuxtContext) => {
  setConfigs(context)
  setApi(context)
  setAdapters(context)
  setServices(context)
})

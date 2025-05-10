import { useNuxtApp } from '#app'
import type { CoreContext } from '@/types'

export default (): CoreContext.Services => {
  return useNuxtApp().$services as CoreContext.Services
}

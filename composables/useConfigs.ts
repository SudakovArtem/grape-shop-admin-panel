import { useNuxtApp } from '#app'
import type { CoreContext } from '@/types'

export default (): CoreContext.Configs => {
  return useNuxtApp().$configs as CoreContext.Configs
}

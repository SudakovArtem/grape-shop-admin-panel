import type { Context } from '@nuxt/types'
import type { CoreContext } from '@/types'

declare module '@nuxt/types' {
  interface nuxtContext extends Context {
    $api: CoreContext.Api
    $services: CoreContext.Services
    $adapters: CoreContext.Adapters
    $configs: CoreContext.Configs
  }
}

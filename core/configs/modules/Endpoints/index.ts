import type {nuxtContext} from '@nuxt/types'
import type {Endpoints} from '@/types'
import user from './UserEndpoints'

export default (context: nuxtContext) => {
  const endpoints: Endpoints = {
    user
  }

  context.$configs.endpoints = endpoints
}

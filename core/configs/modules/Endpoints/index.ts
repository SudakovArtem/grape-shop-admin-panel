import type { nuxtContext } from '@nuxt/types'
import type { Endpoints } from '@/types'
import user from './UserEndpoints'
import product from './ProductEndpoints'

export default (context: nuxtContext) => {
  const endpoints: Endpoints = {
    user,
    product
  }

  context.$configs.endpoints = endpoints
}

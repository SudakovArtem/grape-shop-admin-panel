import type { nuxtContext } from '@nuxt/types'
import useAuthStore from '@/store/auth'
import type { ApiClientService } from '@/types'
import FetchService from '@services/modules/apiServices/FetchService'

export default (context: nuxtContext) => {
  const authStore = useAuthStore()

  class APIClientService implements ApiClientService {
    client: any

    context: nuxtContext

    constructor(client: any, context: nuxtContext) {
      this.client = client
      this.context = context
    }

    async request(data = {}) {
      return this.client.request(data)
    }
  }

  const baseApiUrl: string = useRuntimeConfig().public.baseApiUrl ?? '/api'
  context.$services.useAPI = new APIClientService(
    new FetchService(context, {
      baseApiUrl,
      async onRequestCallback(config) {
        if (!(config.options?.body instanceof FormData)) {
          config.options.headers['Content-Type'] = 'application/vnd.api+json'
          config.options.headers.accept = 'application/vnd.api+json'
        }

        const cookieToken = useCookie('token').value ?? ''

        if (cookieToken) {
          config.options.headers.authorization = `Bearer ${cookieToken}`
        }

        const sanctumToken = useCookie('token')
        config.options.headers['X-XSRF-TOKEN'] = sanctumToken.value ?? ''
      },
      onRequestErrorCallback: async (config) => {
        console.log('FATAL', config)
      },
      onResponseErrorCallback: async (config) => {
        if (config?.response?.status === 401) {
          useCookie('token', {
            maxAge: -1
          }).value = ''
          authStore.setAuth(false)
        }
      }
    }),
    context
  )
}

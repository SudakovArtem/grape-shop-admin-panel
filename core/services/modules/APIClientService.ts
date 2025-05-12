import AxiosService from '@services/modules/apiServices/UseFetchService'
import type { nuxtContext } from '@nuxt/types'
import type { ApiClientService, Request } from '@/types'

class APIClient {
  client: ApiClientService

  context: nuxtContext

  constructor(client: ApiClientService, context: nuxtContext) {
    this.client = client
    this.context = context
  }

  async request<T>(data: Request.Options): Promise<T> {
    return this.client.request<T>(data)
  }

  setAuthorizationToken(token = ''): void {
    this.client.setAuthorizationToken(token)
  }
}

export default (context: nuxtContext) => {
  context.$services.useAPI = new APIClient(AxiosService(context), context)
}

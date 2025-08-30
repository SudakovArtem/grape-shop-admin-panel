import useAuthStore from '@/stores/auth'
import type { nuxtContext } from '@nuxt/types'
import { type ApiClientService, Request } from '@/types'

export default ({ $config, $configs, $services }: nuxtContext): ApiClientService => {
  class UseFetchService implements ApiClientService {
    private token: string = ''
    private authStore = useAuthStore()

    constructor(
      private config: nuxtContext['$config'],
      private services: nuxtContext['$services']
    ) {}

    async request<T = unknown, K = unknown>({
      config,
      body = {}
    }: {
      config: Request.Config
      body?: K | Request.Body | FormData
    }): Promise<T> {
      try {
        const { url, options } = this.prepareRequest({ config, body })

        const result = await $fetch<T>(url, {
          method: options.method as
            | 'GET'
            | 'POST'
            | 'PUT'
            | 'DELETE'
            | 'PATCH'
            | 'HEAD'
            | 'OPTIONS'
            | 'CONNECT'
            | 'TRACE',
          params: options.params,
          headers: options.headers,
          body: options.body,
          signal: options.signal,
          onResponseError: ({ response }) => {
            if (response.status === 401) {
              this.clearUserData()
            }
          }
        })

        return result as T
      } catch (error) {
        this.handleError(error)
        throw error
      }
    }

    private prepareRequest<T>({
      config,
      body
    }: {
      config: Request.Config
      body: T | Request.Body | FormData
    }): Request.Prepared {
      const {
        url = '',
        method = Request.Methods.GET,
        params = {},
        headers = {},
        customServer = '',
        noSignal = false
      } = config

      const options: Request.Prepared['options'] = {
        method,
        params,
        headers: {
          accept: 'application/vnd.api+json'
        },
        processData: false,
        contentType: false
      }

      if (!noSignal) {
        options.signal = this.services.abort.getControllerSignal()
      }

      if (body instanceof FormData || Object.keys(body as object).length > 0) {
        options.body = body as Request.Body
      }

      if (this.token) {
        options.headers.authorization = `Bearer ${this.token}`
      }

      options.headers = { ...headers, ...options.headers }

      return {
        url: customServer || `${this.config.public.baseApiUrl}${url}`,
        options
      }
    }

    private clearUserData(): void {
      const { AUTHORIZATION_TOKEN_NAME } = $configs.constants
      const token = useCookie(AUTHORIZATION_TOKEN_NAME)
      token.value = null
      this.authStore.setAuth(false)
      this.setAuthorizationToken()
    }

    private handleError(error: unknown): void {
      if (error && typeof error === 'object' && 'statusCode' in error) {
        if ((error as { statusCode: number }).statusCode === 401) {
          this.clearUserData()
        } else if (
          error instanceof Error &&
          error.cause &&
          typeof error.cause === 'object' &&
          'name' in error.cause &&
          error.cause.name === 'AbortError'
        ) {
          console.log('Request aborted')
        } else {
          console.error('Request failed:', error)
        }
      }
    }

    setAuthorizationToken(token: string = ''): void {
      this.token = token
    }
  }

  return new UseFetchService($config, $services)
}

import type { nuxtContext } from '@nuxt/types'
import type { IBaseConfig, IFetchService, IMappedOptions, IMappedResult, IRequestSettings } from './types'
import { IRequestService } from './types'

export default class FetchService extends IRequestService<IFetchService> {
  private readonly baseConfig: IBaseConfig

  private context: nuxtContext

  constructor(context: nuxtContext, config: Partial<IBaseConfig>) {
    super()

    this.context = context

    this.baseConfig = {
      baseApiUrl: '',
      globalOptions: () => ({}),
      fatalErrorCallback: (error: any) => error,
      onRequestCallback: () => ({}),
      onRequestErrorCallback: () => ({}),
      onResponseCallback: () => ({}),
      onResponseErrorCallback: () => ({}),
      ...config
    }
  }

  public async request(requestSettings: IRequestSettings) {
    try {
      const { url, options } = this.prepareRequest(requestSettings)
      const result = await $fetch(url, options)
      return result
    } catch (error: any) {
      return this.baseConfig.fatalErrorCallback(error)
    }
  }

  private prepareRequest({ config, body = {} }: IRequestSettings): IMappedResult {
    const url = config?.customServer || `${this.baseConfig.baseApiUrl}${config.url}`
    const globalOptions = this.baseConfig.globalOptions() || {}
    const options: IMappedOptions = {
      method: config.method,
      params: config.params ?? {},
      headers: config.headers ?? {},
      processData: false,
      contentType: false,
      onRequest: async (data) => {
        await this.baseConfig.onRequestCallback(data)

        if (config.onRequestCallback) {
          await config.onRequestCallback(data)
        }
      },
      onRequestError: async (data) => {
        await this.baseConfig.onRequestErrorCallback(data)

        if (config.onRequestErrorCallback) {
          await config.onRequestErrorCallback(data)
        }
      },
      onResponse: async (data) => {
        await this.baseConfig.onResponseCallback(data)

        if (config.onResponseCallback) {
          await config.onResponseCallback(data)
        }
      },
      onResponseError: async (data) => {
        await this.baseConfig.onResponseErrorCallback(data)

        if (config.onResponseErrorCallback) {
          await config.onResponseErrorCallback(data)
        }
      },
      ...globalOptions
    }

    const cookieToken = useCookie('token').value ?? ''

    if (cookieToken) {
      (options.headers as Record<string, string>).authorization = `Bearer ${cookieToken}`
    }

    const { noSignal = false } = config

    if (!noSignal) {
      options.signal = this.context.$services.abort.getControllerSignal()
    }

    if (Object.values(body).length || body instanceof FormData) {
      options.body = body
    }

    return { url, options }
  }
}

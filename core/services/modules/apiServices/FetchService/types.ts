import { Request } from '@/types'

export interface IConfigSettings {
  url: string
  method: Request.Methods
  params?: Record<string, string>
  headers?: Record<string, string>
  customServer?: string
  customToken?: string
  onRequestCallback?: (data?: any) => any
  onRequestErrorCallback?: (data?: any) => any
  onResponseCallback?: (data?: any) => any
  onResponseErrorCallback?: (data?: any) => any
  noSignal?: boolean
}

export interface IMappedOptions {
  method: Request.Methods
  params?: Record<string, string>
  headers?: Record<string, string>
  body?: Record<string, string> | FormData
  processData?: boolean
  contentType?: boolean
  onRequest?: (data?: any) => any
  onRequestError?: (data?: any) => any
  onResponse?: (data?: any) => any
  onResponseError?: (data?: any) => any
  signal?: AbortSignal
}

export interface IMappedResult {
  url: string
  options: IMappedOptions
}

export interface IRequestSettings {
  config: IConfigSettings
  body?: Record<string, string>
}

export abstract class Singleton<T> {
  private static instances: Map<string, unknown> = new Map()

  public static getInstance<T>(this: new () => T): T {
    const className = this.name
    if (!Singleton.instances.has(className)) {
      Singleton.instances.set(className, new this())
    }

    return Singleton.instances.get(className) as T
  }
}

export abstract class IRequestService<T> extends Singleton<T> {
  abstract request(requestSettings: IRequestSettings): unknown
}

export interface IFetchService {
  request(requestSettings: IRequestSettings): unknown
}

export interface IBaseConfig {
  baseApiUrl: string
  fatalErrorCallback: (error?: any) => any | void
  globalOptions: (config?: IRequestSettings['config']) => Partial<IMappedOptions>
  onRequestCallback: (data?: any) => any | void
  onRequestErrorCallback: (data?: any) => any | void
  onResponseCallback: (data?: any) => any | void
  onResponseErrorCallback: (data?: any) => any | void
}

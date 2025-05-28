export namespace Request {
  export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS'
  }

  export type Params = Record<string, string | string[] | boolean | null | undefined>

  export interface Body {
    _token?: string
    [key: string]: unknown
  }

  export interface Prepared {
    url: string
    options: {
      method?: Request.Methods
      params?: Record<string, unknown>
      headers: Record<string, string>
      body?: Request.Body | FormData
      signal?: AbortSignal
      processData?: boolean
      contentType?: boolean | string
    }
  }

  export interface Options<T = unknown> {
    config: Request.Config
    body?: T | Request.Body | FormData
  }

  export interface Config<T = unknown> {
    url: string
    method: Request.Methods
    headers?: Record<string, string>
    customServer?: string
    params?: Request.Params
    body?: Record<string, T>
    noSignal?: boolean
  }
}

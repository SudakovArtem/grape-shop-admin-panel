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

  export interface Config<T = unknown> {
    url: string
    method: Methods
    headers?: Record<string, string>
    customServer?: string
    params?: Params
    body?: Record<string, T>
  }
}

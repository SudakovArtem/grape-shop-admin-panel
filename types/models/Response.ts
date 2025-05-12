export namespace Response {
  export interface Default<T> {
    data: T
  }

  export type Pagination = {
    page: number
    pageSize: number
    total: number
    lastPage: number
  }

  export interface WithMeta<T> extends Response.Default<T> {
    meta: Response.Pagination
  }
}

import type { nuxtContext } from '@nuxt/types'

export * from './models/CoreContext'
export * from './models/Config'
export * from './models/Api'
export * from './models/Services'
export * from './models/Adapters'
export * from './models/Auth'
export * from './models/User'
export * from './models/Request'
export * from './models/Response'
export * from './models/Product'
export * from './models/Category'

export type coreFunctionList = ((context: nuxtContext) => void)[]

export type PaginationSettings<T = unknown> = {
  pageNumber?: number
  pageSize?: number
  total?: number
  list?: T[]
  replace?: boolean
}

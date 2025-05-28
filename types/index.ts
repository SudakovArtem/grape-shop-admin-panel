import type { nuxtContext } from '@nuxt/types'

export * from './models/CoreContext'
export * from './models/Config'
export * from './models/Api'
export * from './models/Services'
export * from './models/Adapters'
export * from './models/Auth'
export * from './models/Category'
export * from './models/Product'
export * from './models/Request'
export * from './models/Response'
export * from './models/User'
export * from './models/Article'
export type { Upload } from './models/Upload'
export type { Article } from './models/Article'
export * from './models/Cart'
export * from './models/Order'
export * from './models/Upload'
export * from './models/CoreContext'
export * from './models/Services'
export * from './models/Api'
export * from './models/Config'
export * from './models/Adapters'
export * from './system/NuxtContext'

export type coreFunctionList = ((context: nuxtContext) => void)[]

export type PaginationSettings<T = unknown> = {
  pageNumber?: number
  pageSize?: number
  total?: number
  list?: T[]
  replace?: boolean
}

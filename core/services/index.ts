import type { nuxtContext } from '@nuxt/types'
import type { CoreContext, coreFunctionList } from '@/types'
import APIClientService from '@services/modules/APIClientService'
import UserService from '@services/modules/UserService'
import AbortService from '@services/modules/AbortService'
import ProductService from '@services/modules/ProductService'
import CartService from '@services/modules/CartService'
import OrderService from '@services/modules/OrderService'
import CategoryService from '@services/modules/CategoryService'
import UploadService from '@services/modules/UploadService'
import ArticleService from '@services/modules/ArticleService'

const serviceList: coreFunctionList = [
  APIClientService, 
  UserService, 
  ProductService, 
  CartService, 
  OrderService, 
  CategoryService, 
  UploadService,
  ArticleService,
  AbortService
]

export default (context: nuxtContext) => {
  class ServicesLocator {}

  context.$services = <CoreContext.Services>new ServicesLocator()
  serviceList.forEach((fn) => fn(context))
}

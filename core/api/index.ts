import type { nuxtContext } from '@nuxt/types'
import type { CoreContext, coreFunctionList } from '@/types'
import UserMethods from '@api/modules/UserMethods'
import ProductMethods from '@api/modules/ProductMethods'
import CartMethods from '@api/modules/CartMethods'
import OrderMethods from '@api/modules/OrderMethods'
import CategoryMethods from '@api/modules/CategoryMethods'
import UploadMethods from '@api/modules/UploadMethods'
import ArticleMethods from '@api/modules/ArticleMethods'

const apiList: coreFunctionList = [
  UserMethods, 
  ProductMethods, 
  CartMethods, 
  OrderMethods, 
  CategoryMethods, 
  UploadMethods,
  ArticleMethods
]

export default (context: nuxtContext) => {
  class ApiLocator {}

  context.$api = <CoreContext.Api>new ApiLocator()
  apiList.forEach((fn) => fn(context))
}

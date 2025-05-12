import type { nuxtContext } from '@nuxt/types'
import type { CoreContext, coreFunctionList } from '@/types'
import UserMethods from '@api/modules/UserMethods'
import ProductMethods from '@api/modules/ProductMethods'

const apiList: coreFunctionList = [UserMethods, ProductMethods]

export default (context: nuxtContext) => {
  class ApiLocator {}

  context.$api = <CoreContext.Api>new ApiLocator()
  apiList.forEach((fn) => fn(context))
}

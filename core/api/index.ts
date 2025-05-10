import type {nuxtContext} from '@nuxt/types'
import type {CoreContext, coreFunctionList} from '@/types'
import UserMethods from '@api/modules/UserMethods'

const apiList: coreFunctionList = [
  UserMethods
]

export default (context: nuxtContext) => {
  class ApiLocator {}

  context.$api = <CoreContext.Api>new ApiLocator()
  apiList.forEach((fn) => fn(context))
}

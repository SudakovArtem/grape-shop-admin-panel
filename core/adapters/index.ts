import type {nuxtContext} from '@nuxt/types'
import type {CoreContext, coreFunctionList} from '@/types'
import UserAdapter from '@adapters/modules/UserAdapter'

const adapterList: coreFunctionList = [UserAdapter]

export default (context: nuxtContext) => {
  class AdaptersLocator {}

  context.$adapters = <CoreContext.Adapters>new AdaptersLocator()
  adapterList.forEach((fn) => fn(context))
}

import type {nuxtContext} from '@nuxt/types'
import type {CoreContext, coreFunctionList} from '@/types'
import Validations from '@configs/modules/Validations'
import Constants from '@configs/modules/Constants'
import Endpoints from '@configs/modules/Endpoints'

const configList: coreFunctionList = [Validations, Constants, Endpoints]

export default (context: nuxtContext) => {
  class ConfigsLocator {}

  context.$configs = <CoreContext.Configs>new ConfigsLocator()
  configList.forEach((fn) => fn(context))
}

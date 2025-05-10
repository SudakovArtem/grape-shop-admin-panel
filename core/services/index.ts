import type {nuxtContext} from '@nuxt/types'
import type {CoreContext, coreFunctionList} from '@/types'
import APIClientService from '@services/modules/APIClientService'
import UserService from '@services/modules/UserService'
import AbortService from "@services/modules/AbortService";

const serviceList: coreFunctionList = [APIClientService, UserService, AbortService]

export default (context: nuxtContext) => {
  class ServicesLocator {}

  context.$services = <CoreContext.Services>new ServicesLocator()
  serviceList.forEach((fn) => fn(context))
}

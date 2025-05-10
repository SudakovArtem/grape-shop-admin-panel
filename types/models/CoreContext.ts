import type {
  ApiClientService,
  UserService,
  UserAdapter,
  Validations,
  Endpoints,
  Constants,
  AbortService,
  UserApi
} from '@/types'

export namespace CoreContext {
  export interface Api {
    user: UserApi
  }

  export interface Services {
    useAPI: ApiClientService
    user: UserService
    abort: AbortService
  }

  export interface Adapters {
    user: UserAdapter
  }

  export interface Configs {
    validations: Validations.Model
    endpoints: Endpoints
    constants: Constants
  }
}

import type {
  ApiClientService,
  UserService,
  UserAdapter,
  Validations,
  Endpoints,
  AbortService,
  UserApi,
  ProductService,
  ProductApi,
  ArticleService,
  ArticleApi,
  CartService,
  CategoryService,
  OrderService,
  UploadService,
  CartApi,
  OrderApi,
  CategoryApi,
  UploadApi
} from '@/types'
import type { Constants } from '@configs/modules/Constants.ts'

export namespace CoreContext {
  export interface Api {
    user: UserApi
    product: ProductApi
    article: ArticleApi
    cart: CartApi
    category: CategoryApi
    order: OrderApi
    upload: UploadApi
  }

  export interface Services {
    useAPI: ApiClientService
    abort: AbortService
    user: UserService
    product: ProductService
    article: ArticleService
    cart: CartService
    category: CategoryService
    order: OrderService
    upload: UploadService
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

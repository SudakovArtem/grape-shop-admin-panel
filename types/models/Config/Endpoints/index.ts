import type { UserEndpoints } from './UserEndpoints'
import type { ProductEndpoints } from './ProductEndpoints'
import type { CartEndpoints } from './CartEndpoints'
import type { OrderEndpoints } from './OrderEndpoints'
import type { CategoryEndpoints } from './CategoryEndpoints'
import type { UploadEndpoints } from './UploadEndpoints'
import ArticleEndpoints from '@configs/modules/Endpoints/ArticleEndpoints'

export interface Endpoints {
  user: UserEndpoints
  product: ProductEndpoints
  cart: CartEndpoints
  order: OrderEndpoints
  category: CategoryEndpoints
  upload: UploadEndpoints
  article: typeof ArticleEndpoints
}
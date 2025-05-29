import type { UserEndpoints } from './UserEndpoints'
import type { ProductEndpoints } from './ProductEndpoints'
import type { CartEndpoints } from './CartEndpoints'
import type { OrderEndpoints } from './OrderEndpoints'
import type { CategoryEndpoints } from './CategoryEndpoints'
import type { UploadEndpoints } from './UploadEndpoints'
import type { ArticleEndpoints } from './ArticleEndpoints'

export interface Endpoints {
  user: UserEndpoints
  product: ProductEndpoints
  cart: CartEndpoints
  order: OrderEndpoints
  category: CategoryEndpoints
  upload: UploadEndpoints
  article: ArticleEndpoints
}


import type { Request } from '@/types'

export interface CartEndpoints {
  addItem(): Request.Config
  getCart(): Request.Config
  updateItemQuantity(itemId: string): Request.Config
  removeItem(itemId: string): Request.Config
}


import type { Request } from '@/types'

export interface CartEndpoints {
  addItem(): Request.Config
  getCart(): Request.Config
  updateItemQuantity(itemId: number): Request.Config
  removeItem(itemId: number): Request.Config
}

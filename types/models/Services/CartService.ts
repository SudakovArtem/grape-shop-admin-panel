
import type { Request, Response, Cart } from '@/types'

export interface CartService {
  addItem(body: Cart.AddItemDto): Promise<Cart.Item>
  getCart(): Promise<Cart.Response>
  updateItemQuantity(itemId: string, body: Cart.UpdateQuantityDto): Promise<Cart.Item>
  removeItem(itemId: string): Promise<unknown>
}

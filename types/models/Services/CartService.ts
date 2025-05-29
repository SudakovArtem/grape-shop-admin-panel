import type { Request, Response, Cart } from '@/types'

export interface CartService {
  addItem(body: Cart.AddItemDto): Promise<Cart.Model>
  getCart(): Promise<Cart.Model>
  updateItemQuantity(itemId: number, body: Cart.UpdateQuantityDto): Promise<Cart.Item>
  removeItem(itemId: number): Promise<Cart.Model>
}

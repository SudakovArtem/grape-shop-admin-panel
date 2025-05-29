import type { Cart } from '@/types'

export interface CartApi {
  addItem(body: Cart.AddItemDto): Promise<Cart.Model>
  getCart(): Promise<Cart.Model>
  updateItemQuantity(itemId: number, body: Cart.UpdateQuantityDto): Promise<Cart.Item>
  removeItem(itemId: number): Promise<Cart.Model>
}

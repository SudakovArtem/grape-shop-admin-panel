import type { nuxtContext } from '@nuxt/types'
import type { Cart, CartService as ICartService } from '@/types'

export default (context: nuxtContext) => {
  class CartService implements ICartService {
    private static CART_METHODS = context.$api.cart

    async addItem(body: Cart.AddItemDto): Promise<Cart.Model> {
      const response = await CartService.CART_METHODS.addItem(body)
      return response
    }

    async getCart(): Promise<Cart.Model> {
      const response = await CartService.CART_METHODS.getCart()
      return response
    }

    async updateItemQuantity(itemId: number, body: Cart.UpdateQuantityDto): Promise<Cart.Item> {
      const response = await CartService.CART_METHODS.updateItemQuantity(itemId, body)
      return response
    }

    async removeItem(itemId: number): Promise<Cart.Model> {
      const response = await CartService.CART_METHODS.removeItem(itemId)
      return response
    }
  }

  context.$services.cart = new CartService()
}

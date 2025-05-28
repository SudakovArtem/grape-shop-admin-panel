
import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Cart, CartService as ICartService } from '@/types'

export default (context: nuxtContext) => {
  class CartService implements ICartService {
    private static CART_METHODS = context.$api.cart

    async addItem(body: Cart.AddItemDto): Promise<Cart.Item> {
      const response = await CartService.CART_METHODS.addItem(body)
      return response
    }

    async getCart(): Promise<Cart.Response> {
      const response = await CartService.CART_METHODS.getCart()
      return response
    }

    async updateItemQuantity(itemId: string, body: Cart.UpdateQuantityDto): Promise<Cart.Item> {
      const response = await CartService.CART_METHODS.updateItemQuantity(itemId, body)
      return response
    }

    async removeItem(itemId: string): Promise<unknown> {
      const response = await CartService.CART_METHODS.removeItem(itemId)
      return response
    }
  }

  context.$services.cart = new CartService()
}

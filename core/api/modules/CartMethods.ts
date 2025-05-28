import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Cart, CartApi } from '@/types'

export default (context: nuxtContext) => {
  class CartMethods implements CartApi {
    private static CART_ENDPOINTS = context.$configs.endpoints.cart

    async addItem(body: Cart.AddItemDto): Promise<Cart.Item> {
      const config = CartMethods.CART_ENDPOINTS.addItem()
      const result = await context.$services.useAPI.request<Cart.Item, Cart.AddItemDto>({ config, body })
      return result
    }

    async getCart(): Promise<Cart.Response> {
      const config = CartMethods.CART_ENDPOINTS.getCart()
      const result = await context.$services.useAPI.request<Cart.Response>({ config })
      return result
    }

    async updateItemQuantity(itemId: string, body: Cart.UpdateQuantityDto): Promise<Cart.Item> {
      const config = CartMethods.CART_ENDPOINTS.updateItemQuantity(itemId)
      const result = await context.$services.useAPI.request<Cart.Item, Cart.UpdateQuantityDto>({ config, body })
      return result
    }

    async removeItem(itemId: string): Promise<unknown> {
      const config = CartMethods.CART_ENDPOINTS.removeItem(itemId)
      const result = await context.$services.useAPI.request({ config })
      return result
    }
  }

  context.$api.cart = new CartMethods()
}

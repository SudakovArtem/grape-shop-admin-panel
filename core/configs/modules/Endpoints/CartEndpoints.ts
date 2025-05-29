import { type Endpoints, Request } from '@/types'

const cart = {
  addItem(): Request.Config {
    return {
      url: '/cart',
      method: Request.Methods.POST
    }
  },

  getCart(): Request.Config {
    return {
      url: '/cart',
      method: Request.Methods.GET
    }
  },

  updateItemQuantity(itemId: number): Request.Config {
    return {
      url: `/cart/${itemId}`,
      method: Request.Methods.PUT
    }
  },

  removeItem(itemId: number): Request.Config {
    return {
      url: `/cart/${itemId}`,
      method: Request.Methods.DELETE
    }
  }
} satisfies Endpoints['cart']

export default cart

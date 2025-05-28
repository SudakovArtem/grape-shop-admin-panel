
import type { Request } from '@/types'
import type { CartEndpoints } from '@/types'

const cart: CartEndpoints = {
  addItem(): Request.Config {
    return {
      url: '/cart',
      method: 'POST'
    }
  },

  getCart(): Request.Config {
    return {
      url: '/cart',
      method: 'GET'
    }
  },

  updateItemQuantity(itemId: string): Request.Config {
    return {
      url: `/cart/${itemId}`,
      method: 'PUT'
    }
  },

  removeItem(itemId: string): Request.Config {
    return {
      url: `/cart/${itemId}`,
      method: 'DELETE'
    }
  }
}

export default cart

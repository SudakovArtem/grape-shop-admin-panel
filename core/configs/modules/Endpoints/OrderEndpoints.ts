
import type { Request } from '@/types'
import type { OrderEndpoints } from '@/types'

const order: OrderEndpoints = {
  createOrder(): Request.Config {
    return {
      url: '/orders',
      method: 'POST'
    }
  },

  getOrders(params?: Request.Params): Request.Config {
    return {
      url: '/orders',
      method: 'GET',
      params
    }
  },

  getAllOrders(params?: Request.Params): Request.Config {
    return {
      url: '/orders/all',
      method: 'GET',
      params
    }
  },

  getOrderById(id: string): Request.Config {
    return {
      url: `/orders/${id}`,
      method: 'GET'
    }
  },

  cancelOrder(id: string): Request.Config {
    return {
      url: `/orders/${id}/cancel`,
      method: 'POST'
    }
  }
}

export default order

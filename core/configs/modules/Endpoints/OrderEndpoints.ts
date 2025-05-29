import { type Endpoints, Request } from '@/types'

const order = {
  createOrder(): Request.Config {
    return {
      url: '/orders',
      method: Request.Methods.POST
    }
  },

  getOrders(params?: Request.Params): Request.Config {
    return {
      url: '/orders',
      method: Request.Methods.GET,
      params
    }
  },

  getAllOrders(params?: Request.Params): Request.Config {
    return {
      url: '/orders/all',
      method: Request.Methods.GET,
      params
    }
  },

  getOrderById(id: string): Request.Config {
    return {
      url: `/orders/${id}`,
      method: Request.Methods.GET
    }
  },

  cancelOrder(id: string): Request.Config {
    return {
      url: `/orders/${id}/cancel`,
      method: Request.Methods.POST
    }
  }
} satisfies Endpoints['order']

export default order

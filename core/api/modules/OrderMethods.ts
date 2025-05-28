
import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Order, OrderApi } from '@/types'
import getParams from '@/core/utils/getParams'

export default (context: nuxtContext) => {
  class OrderMethods implements OrderApi {
    private static ORDER_ENDPOINTS = context.$configs.endpoints.order

    async createOrder(): Promise<Order.Model> {
      const config = OrderMethods.ORDER_ENDPOINTS.createOrder()
      const result = await context.$services.useAPI.request<Order.Model>({ config })
      return result
    }

    async getOrders(settings: Request.Params): Promise<Response.WithMeta<Order.Model[]>> {
      const paramNames: Record<string, string | string[]> = {
        pageNumber: 'page',
        pageSize: 'limit',
        status: 'status',
        sortBy: 'sortBy'
      }
      const params: Request.Params = getParams(settings, paramNames)

      const config = OrderMethods.ORDER_ENDPOINTS.getOrders(params)
      const result = await context.$services.useAPI.request<Response.WithMeta<Order.Model[]>>({ config })
      return result
    }

    async getAllOrders(settings: Request.Params): Promise<Response.WithMeta<Order.Model[]>> {
      const paramNames: Record<string, string | string[]> = {
        pageNumber: 'page',
        pageSize: 'limit',
        userId: 'userId',
        status: 'status',
        sortBy: 'sortBy'
      }
      const params: Request.Params = getParams(settings, paramNames)

      const config = OrderMethods.ORDER_ENDPOINTS.getAllOrders(params)
      const result = await context.$services.useAPI.request<Response.WithMeta<Order.Model[]>>({ config })
      return result
    }

    async getOrderById(id: string): Promise<Order.Model> {
      const config = OrderMethods.ORDER_ENDPOINTS.getOrderById(id)
      const result = await context.$services.useAPI.request<Order.Model>({ config })
      return result
    }

    async cancelOrder(id: string): Promise<Order.Model> {
      const config = OrderMethods.ORDER_ENDPOINTS.cancelOrder(id)
      const result = await context.$services.useAPI.request<Order.Model>({ config })
      return result
    }
  }

  context.$api.order = new OrderMethods()
}

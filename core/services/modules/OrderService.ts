
import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Order, OrderService as IOrderService } from '@/types'

export default (context: nuxtContext) => {
  class OrderService implements IOrderService {
    private static ORDER_METHODS = context.$api.order

    async createOrder(): Promise<Order.Model> {
      const response = await OrderService.ORDER_METHODS.createOrder()
      return response
    }

    async getOrders(settings: Request.Params): Promise<Response.WithMeta<Order.Model[]>> {
      const response = await OrderService.ORDER_METHODS.getOrders(settings)
      return response
    }

    async getAllOrders(settings: Request.Params): Promise<Response.WithMeta<Order.Model[]>> {
      const response = await OrderService.ORDER_METHODS.getAllOrders(settings)
      return response
    }

    async getOrderById(id: string): Promise<Order.Model> {
      const response = await OrderService.ORDER_METHODS.getOrderById(id)
      return response
    }

    async cancelOrder(id: string): Promise<Order.Model> {
      const response = await OrderService.ORDER_METHODS.cancelOrder(id)
      return response
    }
  }

  context.$services.order = new OrderService()
}

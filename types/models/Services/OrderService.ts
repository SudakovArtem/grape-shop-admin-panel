
import type { Request, Response, Order } from '@/types'

export interface OrderService {
  createOrder(): Promise<Order.Model>
  getOrders(settings: Request.Params): Promise<Response.WithMeta<Order.Model[]>>
  getAllOrders(settings: Request.Params): Promise<Response.WithMeta<Order.Model[]>>
  getOrderById(id: string): Promise<Order.Model>
  cancelOrder(id: string): Promise<Order.Model>
}


import type { Request } from '@/types'

export interface OrderEndpoints {
  createOrder(): Request.Config
  getOrders(params?: Request.Params): Request.Config
  getAllOrders(params?: Request.Params): Request.Config
  getOrderById(id: string): Request.Config
  cancelOrder(id: string): Request.Config
}

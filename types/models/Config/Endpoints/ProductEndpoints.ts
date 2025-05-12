import type { Request } from '@/types'

export interface ProductEndpoints {
  getProducts(params: Request.Params): Request.Config

  getProductById(id: string): Request.Config

  createProduct(): Request.Config

  updateProduct(id: string): Request.Config

  deleteProduct(id: string): Request.Config
}

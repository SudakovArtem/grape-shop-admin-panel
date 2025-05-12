import type { Product, Request, Response } from '@/types'

export interface ProductApi {
  getProductById(id: string): Promise<Product.Model>
  deleteProduct(id: string): Promise<unknown>
  getProducts(settings: Request.Params): Promise<Response.WithMeta<Product.Model[]>>
}

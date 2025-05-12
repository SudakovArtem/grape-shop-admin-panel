import type { Product, ProductService as IProductService, Request, Response } from '@/types'
import type { nuxtContext } from '@nuxt/types'

export default (context: nuxtContext) => {
  class ProductService implements IProductService {
    private static readonly PRODUCT_METHODS = context.$api.product

    async getProducts(settings: Request.Params): Promise<Response.WithMeta<Product.Model[]>> {
      const response = await ProductService.PRODUCT_METHODS.getProducts(settings)
      return response
    }

    async deleteProduct(id: string): Promise<unknown> {
      const response = ProductService.PRODUCT_METHODS.deleteProduct(id)
      return response
    }

    getProductById(id: string): Promise<Product.Model> {
      const response = ProductService.PRODUCT_METHODS.getProductById(id)
      return response
    }
  }

  context.$services.product = new ProductService()
}

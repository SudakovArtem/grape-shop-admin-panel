import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Product, ProductApi } from '@/types'
import getParams from '@/core/utils/getParams'

export default (context: nuxtContext) => {
  class ProductMethods implements ProductApi {
    private static PRODUCT_ENDPOINTS = context.$configs.endpoints.product

    async getProductById(id: string): Promise<Product.Model> {
      const config = ProductMethods.PRODUCT_ENDPOINTS.getProductById(id)
      const result = await context.$services.useAPI.request<Product.Model>({ config })
      return result
    }

    async getProducts(settings: Request.Params): Promise<Response.WithMeta<Product.Model[]>> {
      const paramNames: Record<string, string | string[]> = {
        pageNumber: 'page',
        pageSize: 'limit',
        categoryId: 'categoryId',
        minPrice: 'minPrice',
        maxPrice: 'maxPrice',
        variety: 'variety',
        maturationPeriod: 'maturationPeriod',
        berryShape: 'berryShape',
        color: 'color',
        taste: 'taste',
        search: 'search',
        sortBy: 'sortBy'
      }
      const params: Request.Params = getParams(settings, paramNames)

      const config = ProductMethods.PRODUCT_ENDPOINTS.getProducts(params)
      const result = await context.$services.useAPI.request<Response.WithMeta<Product.Model[]>>({ config })
      return result
    }

    async deleteProduct(id: string): Promise<unknown> {
      const config = ProductMethods.PRODUCT_ENDPOINTS.deleteProduct(id)
      const result = await context.$services.useAPI.request({ config })
      return result
    }
  }

  context.$api.product = new ProductMethods()
}

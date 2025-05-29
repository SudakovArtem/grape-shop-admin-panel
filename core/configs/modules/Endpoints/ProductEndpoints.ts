import { type Endpoints, Request } from '@/types'

export default {
  getProducts: (params: Request.Params): Request.Config => ({
    url: '/products',
    method: Request.Methods.GET,
    params
  }),
  getProductById: (id: string): Request.Config => ({
    url: `/products/${id}`,
    method: Request.Methods.GET
  }),
  createProduct: (): Request.Config => ({
    url: '/products',
    method: Request.Methods.POST
  }),
  updateProduct: (id: string): Request.Config => ({
    url: `/products/${id}`,
    method: Request.Methods.PUT
  }),
  deleteProduct: (id: string): Request.Config => ({
    url: `/products/${id}`,
    method: Request.Methods.DELETE
  })
} satisfies Endpoints['product']

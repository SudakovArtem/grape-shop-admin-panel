import { type Endpoints, Request } from '@/types'

const category = {
  getCategories(): Request.Config {
    return {
      url: '/categories',
      method: Request.Methods.GET
    }
  },

  getCategoryById(id: string): Request.Config {
    return {
      url: `/categories/${id}`,
      method: Request.Methods.GET
    }
  },

  createCategory(): Request.Config {
    return {
      url: '/categories',
      method: Request.Methods.POST
    }
  },

  updateCategory(id: string): Request.Config {
    return {
      url: `/categories/${id}`,
      method: Request.Methods.PATCH
    }
  },

  deleteCategory(id: string): Request.Config {
    return {
      url: `/categories/${id}`,
      method: Request.Methods.DELETE
    }
  }
} satisfies Endpoints['category']

export default category


import type { Request } from '@/types'
import type { CategoryEndpoints } from '@/types'

const category: CategoryEndpoints = {
  getCategories(): Request.Config {
    return {
      url: '/categories',
      method: 'GET'
    }
  },

  getCategoryById(id: string): Request.Config {
    return {
      url: `/categories/${id}`,
      method: 'GET'
    }
  },

  createCategory(): Request.Config {
    return {
      url: '/categories',
      method: 'POST'
    }
  },

  updateCategory(id: string): Request.Config {
    return {
      url: `/categories/${id}`,
      method: 'PATCH'
    }
  },

  deleteCategory(id: string): Request.Config {
    return {
      url: `/categories/${id}`,
      method: 'DELETE'
    }
  }
}

export default category

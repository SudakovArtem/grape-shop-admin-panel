
import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Category, CategoryService as ICategoryService } from '@/types'

export default (context: nuxtContext) => {
  class CategoryService implements ICategoryService {
    private static CATEGORY_METHODS = context.$api.category

    async getCategories(): Promise<Category.Model[]> {
      const response = await CategoryService.CATEGORY_METHODS.getCategories()
      return response
    }

    async getCategoryById(id: string): Promise<Category.Model> {
      const response = await CategoryService.CATEGORY_METHODS.getCategoryById(id)
      return response
    }

    async createCategory(body: Category.CreateDto): Promise<Category.Model> {
      const response = await CategoryService.CATEGORY_METHODS.createCategory(body)
      return response
    }

    async updateCategory(id: string, body: Category.UpdateDto): Promise<Category.Model> {
      const response = await CategoryService.CATEGORY_METHODS.updateCategory(id, body)
      return response
    }

    async deleteCategory(id: string): Promise<unknown> {
      const response = await CategoryService.CATEGORY_METHODS.deleteCategory(id)
      return response
    }
  }

  context.$services.category = new CategoryService()
}

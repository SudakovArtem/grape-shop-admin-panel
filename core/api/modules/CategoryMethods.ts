import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Category, CategoryApi } from '@/types'

export default (context: nuxtContext) => {
  class CategoryMethods implements CategoryApi {
    private static CATEGORY_ENDPOINTS = context.$configs.endpoints.category

    async getCategories(): Promise<Category.Model[]> {
      const config = CategoryMethods.CATEGORY_ENDPOINTS.getCategories()
      const result = await context.$services.useAPI.request<Category.Model[]>({ config })
      return result
    }

    async getCategoryById(id: string): Promise<Category.Model> {
      const config = CategoryMethods.CATEGORY_ENDPOINTS.getCategoryById(id)
      const result = await context.$services.useAPI.request<Category.Model>({ config })
      return result
    }

    async createCategory(body: Category.CreateDto): Promise<Category.Model> {
      const config = CategoryMethods.CATEGORY_ENDPOINTS.createCategory()
      const result = await context.$services.useAPI.request<Category.Model, Category.CreateDto>({ config, body })
      return result
    }

    async updateCategory(id: string, body: Category.UpdateDto): Promise<Category.Model> {
      const config = CategoryMethods.CATEGORY_ENDPOINTS.updateCategory(id)
      const result = await context.$services.useAPI.request<Category.Model, Category.UpdateDto>({ config, body })
      return result
    }

    async deleteCategory(id: string): Promise<unknown> {
      const config = CategoryMethods.CATEGORY_ENDPOINTS.deleteCategory(id)
      const result = await context.$services.useAPI.request({ config })
      return result
    }
  }

  context.$api.category = new CategoryMethods()
}


import type { Request } from '@/types'

export interface CategoryEndpoints {
  getCategories(): Request.Config
  getCategoryById(id: string): Request.Config
  createCategory(): Request.Config
  updateCategory(id: string): Request.Config
  deleteCategory(id: string): Request.Config
}

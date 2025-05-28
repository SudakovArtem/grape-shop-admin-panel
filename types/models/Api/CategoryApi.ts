
import type { Request, Response, Category } from '@/types'

export interface CategoryApi {
  getCategories(): Promise<Category.Model[]>
  getCategoryById(id: string): Promise<Category.Model>
  createCategory(body: Category.CreateDto): Promise<Category.Model>
  updateCategory(id: string, body: Category.UpdateDto): Promise<Category.Model>
  deleteCategory(id: string): Promise<unknown>
}

import type { Request } from '@/types'

export interface ArticleEndpoints {
  createArticle(): Request.Config
  getArticles(params: Request.Params): Request.Config
  getArticleById(id: string): Request.Config
  getArticleBySlug(slug: string): Request.Config
  updateArticle(id: string): Request.Config
  deleteArticle(id: string): Request.Config
  getArticlesCategories(): Request.Config
}

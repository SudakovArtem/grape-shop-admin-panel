import type { Request, Response, Article } from '@/types'

export interface ArticleService {
  createArticle(body: Article.CreateDto): Promise<Article.Model>
  getArticles(settings: Request.Params): Promise<Response.WithMeta<Article.Model[]>>
  getArticleById(id: string): Promise<Article.Model>
  getArticleBySlug(slug: string): Promise<Article.Model>
  updateArticle(id: string, body: Article.UpdateDto): Promise<Article.Model>
  deleteArticle(id: string): Promise<unknown>
  getArticlesCategories(): Promise<Article.Category[]>
}

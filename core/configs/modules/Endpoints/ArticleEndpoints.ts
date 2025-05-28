import { Request } from '@/types'

export default {
  createArticle: (): Request.Config => ({
    url: '/articles',
    method: Request.Methods.POST
  }),
  getArticles: (params: Request.Params): Request.Config => ({
    url: '/articles',
    method: Request.Methods.GET,
    params
  }),
  getArticleById: (id: string): Request.Config => ({
    url: `/articles/${id}`,
    method: Request.Methods.GET
  }),
  getArticleBySlug: (slug: string): Request.Config => ({
    url: `/articles/slug/${slug}`,
    method: Request.Methods.GET
  }),
  updateArticle: (id: string): Request.Config => ({
    url: `/articles/${id}`,
    method: Request.Methods.PUT
  }),
  deleteArticle: (id: string): Request.Config => ({
    url: `/articles/${id}`,
    method: Request.Methods.DELETE
  }),
  getArticlesCategories: (): Request.Config => ({
    url: '/article-categories',
    method: Request.Methods.GET
  })
}

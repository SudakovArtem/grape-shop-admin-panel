import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Article, ArticleApi } from '@/types'
import getParams from '@/core/utils/getParams'

export default (context: nuxtContext) => {
  class ArticleMethods implements ArticleApi {
    private static ARTICLE_ENDPOINTS = context.$configs.endpoints.article

    async createArticle(body: Article.CreateDto): Promise<Article.Model> {
      const config = ArticleMethods.ARTICLE_ENDPOINTS.createArticle()
      const result = await context.$services.useAPI.request<Article.Model, Article.CreateDto>({ config, body })
      return result
    }

    async getArticles(settings: Request.Params): Promise<Response.WithMeta<Article.Model[]>> {
      const paramNames: Record<string, string | string[]> = {
        pageNumber: 'page',
        pageSize: 'limit',
        search: 'search',
        categoryId: 'categoryId',
        published: 'published',
        sortBy: 'sortBy'
      }
      const params: Request.Params = getParams(settings, paramNames)

      const config = ArticleMethods.ARTICLE_ENDPOINTS.getArticles(params)
      const result = await context.$services.useAPI.request<Response.WithMeta<Article.Model[]>>({ config })
      return result
    }

    async getArticleById(id: string): Promise<Article.Model> {
      const config = ArticleMethods.ARTICLE_ENDPOINTS.getArticleById(id)
      const result = await context.$services.useAPI.request<Article.Model>({ config })
      return result
    }

    async getArticleBySlug(slug: string): Promise<Article.Model> {
      const config = ArticleMethods.ARTICLE_ENDPOINTS.getArticleBySlug(slug)
      const result = await context.$services.useAPI.request<Article.Model>({ config })
      return result
    }

    async updateArticle(id: string, body: Article.UpdateDto): Promise<Article.Model> {
      const config = ArticleMethods.ARTICLE_ENDPOINTS.updateArticle(id)
      const result = await context.$services.useAPI.request<Article.Model, Article.UpdateDto>({ config, body })
      return result
    }

    async deleteArticle(id: string): Promise<unknown> {
      const config = ArticleMethods.ARTICLE_ENDPOINTS.deleteArticle(id)
      const result = await context.$services.useAPI.request({ config })
      return result
    }

    async getArticlesCategories(): Promise<Article.Category[]> {
      const config = ArticleMethods.ARTICLE_ENDPOINTS.getArticlesCategories()
      const result = await context.$services.useAPI.request<Article.Category[]>({ config })
      return result
    }
  }

  context.$api.article = new ArticleMethods()
}

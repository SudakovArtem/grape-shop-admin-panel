import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Article, ArticleService as IArticleService } from '@/types'

export default (context: nuxtContext) => {
  class ArticleService implements IArticleService {
    private static ARTICLE_METHODS = context.$api.article

    async createArticle(body: Article.CreateDto): Promise<Article.Model> {
      const response = await ArticleService.ARTICLE_METHODS.createArticle(body)
      return response
    }

    async getArticles(settings: Request.Params): Promise<Response.WithMeta<Article.Model[]>> {
      const response = await ArticleService.ARTICLE_METHODS.getArticles(settings)
      return response
    }

    async getArticleById(id: string): Promise<Article.Model> {
      const response = await ArticleService.ARTICLE_METHODS.getArticleById(id)
      return response
    }

    async getArticleBySlug(slug: string): Promise<Article.Model> {
      const response = await ArticleService.ARTICLE_METHODS.getArticleBySlug(slug)
      return response
    }

    async updateArticle(id: string, body: Article.UpdateDto): Promise<Article.Model> {
      const response = await ArticleService.ARTICLE_METHODS.updateArticle(id, body)
      return response
    }

    async deleteArticle(id: string): Promise<unknown> {
      const response = await ArticleService.ARTICLE_METHODS.deleteArticle(id)
      return response
    }

    async getArticlesCategories(): Promise<Article.Category[]> {
      const response = await ArticleService.ARTICLE_METHODS.getArticlesCategories()
      return response
    }
  }

  context.$services.article = new ArticleService()
}

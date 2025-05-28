export namespace Article {
  export interface Model {
    id: number
    title: string
    content: string
    imageUrl: string
    slug: string
    authorId: number
    categoryId: number
    published: boolean
    createdAt: string
    updatedAt: string
    authorName: string
    categoryName: string
  }

  export interface CreateDto {
    title: string
    content: string
    slug: string
    categoryId?: number
    published?: boolean
    imageUrl?: string
  }

  export interface UpdateDto {
    title?: string
    content?: string
    slug?: string
    categoryId?: number
    published?: boolean
    imageUrl?: string
  }

  export interface Category {
    id: 1
    name: string
    slug: string
    createdAt: string
    articlesCount: number
  }
}

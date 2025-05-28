export namespace Cart {
  export interface Model {
    items: Item[]
  }

  export interface AddItemDto {
    productId: number
    type: 'cutting' | 'seedling'
    quantity?: number
  }

  export interface UpdateQuantityDto {
    quantity: number
  }

  export interface Item {
    id: number
    userId: number
    productId: number
    type: string | null
    quantity: number
    productName: string
    berryShape: string | null
    color: string | null
    taste: string | null
    variety: string | null
    imageUrl: string | null
    inStock: boolean | null
    unitPrice: number
    itemTotalPrice: number
  }

  export interface Response {
    items: Item[]
    totalCartPrice: number
    totalItems: number
  }
}

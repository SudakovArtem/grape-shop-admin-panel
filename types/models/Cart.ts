export namespace Cart {
  export interface Model {
    items: Item[]
    totalCartPrice: number
    totalItems: number
  }

  export interface AddItemDto {
    productId: number
    type: Cart.Item['type']
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
    cuttingInStock: boolean
    seedlingInStock: boolean
    unitPrice: number
    itemTotalPrice: number
  }
}

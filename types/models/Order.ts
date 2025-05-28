export namespace Order {
  export interface Item {
    id: number
    orderId: number
    productId: number
    type: 'cutting' | 'seedling'
    quantity: number
    price: string
  }

  export interface Model {
    id: number
    userId: number
    totalPrice: string
    status: 'Создан' | 'В обработке' | 'Отправлен' | 'Доставлен' | 'Отменен'
    createdAt: string
    items: Order.Item[]
  }
}

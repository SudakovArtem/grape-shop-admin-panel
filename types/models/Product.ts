export namespace Product {
  export type Model = {
    id: number
    name: string
    description: string
    cuttingPrice: string
    seedlingPrice: string
    categoryId: number
    variety: string
    maturationPeriod: string
    berryShape: string
    color: string
    taste: string
    inStock: boolean
    images: { id: number; url: string }[]
  }

  export type UploadFile = {
    id: number
    productId: number
    imageUrl: string
    s3FileKey: string
    isPrimary: boolean
    createdAt: string
  }

  export type FormProps = {
    product?: Product.Model
    title?: string
    isUpdate?: boolean
    loading?: boolean
  }

  export type FormEmits = {
    (e: 'refresh'): void
  }
}

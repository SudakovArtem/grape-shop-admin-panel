export namespace Product {
  export interface Model {
    id: number
    name: string
    description?: string
    cuttingPrice?: number
    seedlingPrice?: number
    categoryId?: number
    categoryName?: string
    variety?: string
    maturationPeriod?: string
    berryShape?: string
    color?: string
    taste?: string
    inStock?: boolean
    createdAt: string
    updatedAt: string
    images?: Product.Image[]
  }

  export type Image = {
    id: number
    url: string
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

  export interface CreateDto {
    name: string
    description?: string
    cuttingPrice?: number
    seedlingPrice?: number
    categoryId?: number
    variety?: string
    maturationPeriod?: string
    berryShape?: string
    color?: string
    taste?: string
    inStock?: boolean
  }

  export interface UpdateDto {
    name?: string
    description?: string
    cuttingPrice?: number
    seedlingPrice?: number
    categoryId?: number
    variety?: string
    maturationPeriod?: string
    berryShape?: string
    color?: string
    taste?: string
    inStock?: boolean
  }
}

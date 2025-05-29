export namespace Product {
  export interface Model {
    id: number
    name: string
    description?: string
    cuttingPrice?: string
    seedlingPrice?: string
    categoryId?: number
    categoryName?: string
    variety?: string
    maturationPeriod?: string
    berryShape?: string
    color?: string
    taste?: string
    cuttingInStock: number
    seedlingInStock: number
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
    cuttingPrice?: string
    seedlingPrice?: string
    categoryId?: number
    variety?: string
    maturationPeriod?: string
    berryShape?: string
    color?: string
    taste?: string
    cuttingInStock: number
    seedlingInStock: number
  }

  export interface UpdateDto {
    name?: string
    description?: string
    cuttingPrice?: string
    seedlingPrice?: string
    categoryId?: number
    variety?: string
    maturationPeriod?: string
    berryShape?: string
    color?: string
    taste?: string
    cuttingInStock: number
    seedlingInStock: number
  }
}

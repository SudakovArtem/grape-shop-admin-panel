export namespace Category {
  export interface Model {
    id: number
    name: string
    createdAt: string
  }

  export interface CreateDto {
    name: string
  }

  export interface UpdateDto {
    name?: string
  }
}
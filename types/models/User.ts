import type { Select } from '@/types'

export namespace User {
  export enum Types {
    CANDIDATE = 'candidate',
    COMPANY = 'company'
  }

  export type SocialMedia = {
    telegram: string
    vk: string
    hh: string
  }

  export interface LoginData {
    email: string
    ogrn: string
    password: string
    agreement: boolean
  }

  export interface LoginDto {
    email: string
    password: string
  }

  export interface RegisterData {
    email: string
    password: string
    passwordRepeat: string
    ogrn: string
    fullName: string
    phone: string
    agreement: boolean
  }

  export interface RegisterDto extends Record<string, unknown> {
    email: string
    password: string
    ogrn: string
    fullName: string
    phone: string
    userType: User.Types
  }

  export interface CooperationDto {
    name: string
    email: string
    phone: string
    description: string
    agreement: boolean
  }

  export interface UpdateData {
    email: string
    ogrn: string
    fullName: string
    phone: string
    description: string
    jobTitle: string
    cvLink: string
    telegram: SocialMedia['telegram']
    vk: SocialMedia['vk']
    hh: SocialMedia['hh']
    direction: Select.Option | null
    status: Select.Option | null
  }

  export interface UpdateDto extends Record<string, unknown> {
    email: string
    ogrn: string
    fullName: string
    phone: string
    description: string
    jobTitle: string
    cvLink: string
    socialMedia: SocialMedia
    direction: number | null
    status: number | null
  }

  export type DirectionServerResponse = {
    id: number
    value: string
    updatedAt: string | null
    createdAt: string
    deletedAt: string | null
  }

  export type StatusServerResponse = {
    id: number
    value: string
    updatedAt: string | null
    createdAt: string
    deletedAt: string | null
  }

  export interface Model {
    id: number
    fullName: string
    email: string
    ogrn: string
    userType: User.Types
    phone: string
    role: 'user' | 'admin'
    direction?: number | User.DirectionServerResponse | null
    status?: number | User.StatusServerResponse | null
    socialMedia: SocialMedia
    updatedAt?: string | null
    createdAt?: string | null
    deletedAt?: string | null
  }

  export interface Session {
    user: User.Model
    [key: string]: unknown
  }

  export interface ServerModel {
    id: number
    fullName: string
    email: string
    ogrn: string
    userType: string
    phone: string
    description: string
    jobTitle: string
    cvLink: string
    role: string
    isVisible: boolean
    socialMedia: SocialMedia
    direction: DirectionServerResponse
    status: StatusServerResponse
    updatedAt: string | null
    createdAt: string
    deletedAt: string | null
  }
}

import type { User } from '@/types'

export namespace Auth {
  export interface Model {
    isAuth: boolean
    modalMode: 'login' | 'register'
    isModalOpen: boolean
  }

  export interface ModalProps {
    url: string
  }

  export interface ResponseServer {
    expires_in?: number
    token: string
    user: User.Model
  }

  export interface SSOServerResponse {
    redirect: string
  }
}

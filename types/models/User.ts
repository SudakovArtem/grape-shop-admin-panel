export namespace User {
  export interface LoginDto extends Record<string, unknown> {
    email: string
    password: string
  }

  export interface RegisterDto extends Record<string, unknown> {
    email: string
    password: string
    name: string
    phone?: string
    address?: string
  }

  export interface ForgotPasswordDto extends Record<string, unknown> {
    email: string
  }

  export interface ResetPasswordDto extends Record<string, unknown> {
    token: string
    newPassword: string
  }

  export interface UpdateProfileDto extends Record<string, unknown> {
    name?: string
    phone?: string
    address?: string
  }

  export interface Model {
    id: number
    email: string
    name: string
    address: string | null
    phone: string | null
    avatar: string | null
    role: 'admin' | 'user'
    createdAt: string
  }
}

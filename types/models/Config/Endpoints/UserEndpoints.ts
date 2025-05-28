import type { Request } from '@/types'

export interface UserEndpoints {
  getUsers(params: Request.Params): Request.Config
  getUserById(id: string): Request.Config
  login(): Request.Config
  register(): Request.Config
  getProfile(): Request.Config
  updateProfile(): Request.Config
  updateUser(id: string): Request.Config
  deleteUser(id: string): Request.Config
  forgotPassword(): Request.Config
  resetPassword(): Request.Config
}

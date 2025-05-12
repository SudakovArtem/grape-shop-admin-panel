import type { Request, User } from '@/types'

export interface UserEndpoints {
  getUsers(params: Request.Params): Request.Config
  login(): Request.Config
  getProfile(): Request.Config
  createUser(): Request.Config
  deleteUser(id: string): Request.Config
  updateUser(id: string, body: User.UpdateDto): Request.Config
  getUserById(id: string): Request.Config
}

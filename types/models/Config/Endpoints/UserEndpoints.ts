import type { Request, User } from '@/types'

export interface UserEndpoints {
  getUsers(params: Request.Params): Request.Config
  login(body: User.LoginDto): Request.Config
  createUser(body: User.RegisterDto): Request.Config
  updateUser(id: string, body: User.UpdateDto): Request.Config
  getUserById(id: string, params: Request.Params): Request.Config
}

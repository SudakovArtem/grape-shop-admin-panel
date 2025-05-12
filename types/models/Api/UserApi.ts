import type { Request, Response, User } from '@/types'

export interface UserApi {
  login(body: User.LoginDto): Promise<User.Session>
  getUsers(settings: Request.Params): Promise<Response.WithMeta<User.Model[]>>
  getProfile(): Promise<User.Model>
  deleteUser(id: string): Promise<unknown>
}

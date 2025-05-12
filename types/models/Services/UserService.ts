import type { Request, Response, User } from '@/types'

export interface UserService {
  // getUserCards(settings: Request.Params): Promise<Response.WithMeta<Offer.Card[]>>
  login(body: User.LoginDto): Promise<User.Model>
  // createUser(body: User.RegisterDto): Promise<unknown>
  getProfile(): Promise<User.Model>
  getUsers(settings: Request.Params): Promise<Response.WithMeta<User.Model[]>>
  deleteUser(id: string): Promise<unknown>
  logout(): void
  checkAuth(): Promise<void>
}

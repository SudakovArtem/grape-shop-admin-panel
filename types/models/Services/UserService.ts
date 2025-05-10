import type { User } from '@/types'

export interface UserService {
  // getUserCards(settings: Request.Params): Promise<Response.WithMeta<Offer.Card[]>>
  login(body: User.LoginDto): Promise<User.Model>
  createUser(body: User.RegisterDto): Promise<unknown>
  // updateUser(id: string, body: User.UpdateDto): Promise<Response.Default<User.Model>>
  // getUserById(id: string, settings?: Request.Params): Promise<Profile.Model>
}

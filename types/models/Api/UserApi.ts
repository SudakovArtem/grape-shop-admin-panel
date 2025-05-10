import type { User } from '@/types'

export interface UserApi {
  login(body: User.LoginDto): Promise<User.Session>
}

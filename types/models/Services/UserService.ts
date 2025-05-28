import type { Request, Response, User } from '@/types'

export interface UserService {
  login(body: User.LoginDto): Promise<User.Model>
  register(body: User.RegisterDto): Promise<User.Model>
  getProfile(): Promise<User.Model>
  updateProfile(body: User.UpdateProfileDto): Promise<User.Model>
  getUsers(settings: Request.Params): Promise<Response.WithMeta<User.Model[]>>
  getUserById(id: string): Promise<User.Model>
  updateUser(id: string, body: User.UpdateProfileDto): Promise<User.Model>
  deleteUser(id: string): Promise<unknown>
  forgotPassword(body: User.ForgotPasswordDto): Promise<{ message: string }>
  resetPassword(body: User.ResetPasswordDto): Promise<{ message: string }>
  logout(): void
  checkAuth(): Promise<void>
}

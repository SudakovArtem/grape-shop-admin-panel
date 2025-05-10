import { Request, type User } from '@/types'

export default {
  getUsers: (params: Request.Params): Request.Config => ({
    url: '/api/users',
    method: Request.Methods.GET,
    query: params
  }),
  getUserById: (id: string, params: Request.Params): Request.Config => ({
    url: `/api/users/${id}`,
    method: Request.Methods.GET,
    query: params
  }),
  login: (body: User.LoginDto): Request.Config => ({
    url: '/users/login',
    method: Request.Methods.POST,
    body
  }),
  createUser: (body: User.RegisterDto): Request.Config => ({
    url: '/users/register',
    method: Request.Methods.POST,
    body
  }),
  updateUser: (id: string, body: User.UpdateDto): Request.Config => ({
    url: `/api/users/${id}`,
    method: Request.Methods.PUT,
    body
  })
}

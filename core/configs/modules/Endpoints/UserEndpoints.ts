import { Request, type User } from '@/types'

export default {
  getUsers: (params: Request.Params): Request.Config => ({
    url: '/users',
    method: Request.Methods.GET,
    params
  }),
  getUserById: (id: string, params: Request.Params): Request.Config => ({
    url: `/api/users/${id}`,
    method: Request.Methods.GET,
    params
  }),
  login: (): Request.Config => ({
    url: '/users/login',
    method: Request.Methods.POST
  }),
  getProfile: (): Request.Config => ({
    url: '/users/profile',
    method: Request.Methods.GET
  }),
  createUser: (): Request.Config => ({
    url: '/users/register',
    method: Request.Methods.POST
  }),
  updateUser: (id: string, body: User.UpdateDto): Request.Config => ({
    url: `/users/${id}`,
    method: Request.Methods.PUT,
    body
  }),
  deleteUser: (id: string): Request.Config => ({
    url: `/users/${id}`,
    method: Request.Methods.DELETE
  })
}

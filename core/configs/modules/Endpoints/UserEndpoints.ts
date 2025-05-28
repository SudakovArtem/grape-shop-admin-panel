import { Request, type User } from '@/types'

export default {
  getUsers: (params: Request.Params): Request.Config => ({
    url: '/users',
    method: Request.Methods.GET,
    params
  }),
  getUserById: (id: string): Request.Config => ({
    url: `/users/${id}`,
    method: Request.Methods.GET
  }),
  login: (): Request.Config => ({
    url: '/users/login',
    method: Request.Methods.POST
  }),
  register: (): Request.Config => ({
    url: '/users/register',
    method: Request.Methods.POST
  }),
  getProfile: (): Request.Config => ({
    url: '/users/profile',
    method: Request.Methods.GET
  }),
  updateProfile: (): Request.Config => ({
    url: '/users/profile',
    method: Request.Methods.PUT
  }),
  updateUser: (id: string): Request.Config => ({
    url: `/users/${id}`,
    method: Request.Methods.PUT
  }),
  deleteUser: (id: string): Request.Config => ({
    url: `/users/${id}`,
    method: Request.Methods.DELETE
  }),
  forgotPassword: (): Request.Config => ({
    url: '/users/forgot-password',
    method: Request.Methods.POST
  }),
  resetPassword: (): Request.Config => ({
    url: '/users/reset-password',
    method: Request.Methods.POST
  }),
  adminLogin: (): Request.Config => ({
    url: '/users/admin/login',
    method: Request.Methods.POST
  })
}

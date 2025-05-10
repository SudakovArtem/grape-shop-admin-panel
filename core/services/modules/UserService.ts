import type {nuxtContext} from '@nuxt/types'
import {User, type UserService as IUserService} from '@/types'

export default (context: nuxtContext) => {
  class UserService implements IUserService {
    private static readonly USER_ADAPTERS = context.$adapters.user

    private static readonly USER_ENDPOINTS = context.$configs.endpoints.user

    async login(body: User.LoginDto): Promise<User.Session> {
      const { url, ...options } = UserService.USER_ENDPOINTS.login(body)

      const response: User.Session = await $fetch(url, options)
      return response
    }

    async createUser(body: User.RegisterDto): Promise<unknown> {
      const { url, ...options } = UserService.USER_ENDPOINTS.createUser(body)

      const response: unknown = await $fetch(url, options)
      return response
    }
    //
    // async updateUser(id: string, body: User.UpdateDto): Promise<Response.Default<User.Model>> {
    //   const { url, ...options } = UserService.USER_ENDPOINTS.updateUser(id, body)
    //
    //   const response: Response.Default<User.Model> = await $fetch(url, options)
    //   return response
    // }
  }

  context.$services.user = new UserService()
}

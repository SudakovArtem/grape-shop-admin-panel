import type {nuxtContext} from '@nuxt/types'
import {Request, User, type UserService as IUserService} from '@/types'
import useUserStore from '@/store/user'
import useAuthStore from '@/store/auth'

export default (context: nuxtContext) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  class UserService implements IUserService {
    private static readonly USER_ADAPTERS = context.$adapters.user

    private static readonly USER_METHODS = context.$api.user

    private static readonly USER_ENDPOINTS = context.$configs.endpoints.user

    async getProfile(): Promise<User.Model> {
      const response: User.Model = await UserService.USER_METHODS.getProfile()
      return response
    }

    async getUsers(settings: Request.Params): Promise<User.Model> {
      const response: User.Model = await UserService.USER_METHODS.getUsers(settings)
      return response
    }

    async login(body: User.LoginDto): Promise<User.Model> {
      const data: User.Session = await UserService.USER_METHODS.login(body)
      const { accessToken } = data
      if (accessToken) {
        const token = useCookie<string | null>('token', {
          maxAge: 3600 * 24 * 30,
          secure: false
        })
        token.value = accessToken
      }

      const result = await new Promise<User.Model>((resolve) => {
        setTimeout(async () => {
          const user = (await this.getProfile()) ?? false

          userStore.setUser(user)
          authStore.setAuth(true)
          resolve(user)
        }, 0)
      })

      return result
    }

    deleteUser(id: string): Promise<unknown> {
      const response: unknown = UserService.USER_METHODS.deleteUser(id)
      return response
    }
  }

  context.$services.user = new UserService()
}

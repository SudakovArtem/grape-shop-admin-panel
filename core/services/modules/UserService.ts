import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, User, UserService as IUserService } from '@/types'
import useUserStore from '@/store/user'
import useAuthStore from '@/store/auth'

export default (context: nuxtContext) => {
  const { setAuth } = useAuthStore()
  const { setUser } = useUserStore()

  class UserService implements IUserService {
    private static readonly USER_ADAPTERS = context.$adapters.user

    private static readonly USER_METHODS = context.$api.user

    private static readonly API_SERVICE = context.$services.useAPI

    async getProfile(): Promise<User.Model> {
      const response: User.Model = await UserService.USER_METHODS.getProfile()
      return response
    }

    async getUsers(settings: Request.Params): Promise<Response.WithMeta<User.Model[]>> {
      const response = await UserService.USER_METHODS.getUsers(settings)
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
        UserService.API_SERVICE.setAuthorizationToken(accessToken)
        token.value = accessToken
      }

      const result = await new Promise<User.Model>((resolve) => {
        setTimeout(async () => {
          const user = (await this.getProfile()) ?? false

          setUser(user)
          setAuth(true)
          resolve(user)
        }, 0)
      })

      return result
    }

    deleteUser(id: string): Promise<unknown> {
      const response = UserService.USER_METHODS.deleteUser(id)
      return response
    }

    logout(): void {
      useCookie('token').value = null
      setAuth(false)
      UserService.API_SERVICE.setAuthorizationToken('')
    }

    async checkAuth(): Promise<void> {
      const token = useCookie('token')

      if (token.value) {
        UserService.API_SERVICE.setAuthorizationToken(token.value)
        const user = await this.getProfile()

        if (!user?.id) {
          this.logout()
          return
        }

        setUser(user)
        setAuth(true)
      } else {
        this.logout()
      }
    }
  }

  context.$services.user = new UserService()
}

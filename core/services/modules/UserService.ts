import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, User, UserService as IUserService } from '@/types'
import useUserStore from '@/stores/user'
import useAuthStore from '@/stores/auth'

export default (context: nuxtContext) => {
  const { setAuth } = useAuthStore()
  const { setUser } = useUserStore()
  const { AUTHORIZATION_TOKEN_NAME } = context.$configs.constants

  class UserService implements IUserService {
    private static USER_METHODS = context.$api.user

    private static API_SERVICE = context.$services.useAPI

    async getProfile(): Promise<User.Model> {
      const response: User.Model = await UserService.USER_METHODS.getProfile()
      return response
    }

    async updateProfile(body: User.UpdateProfileDto): Promise<User.Model> {
      const response = await UserService.USER_METHODS.updateProfile(body)
      setUser(response)
      return response
    }

    async getUsers(settings: Request.Params): Promise<Response.WithMeta<User.Model[]>> {
      const response = await UserService.USER_METHODS.getUsers(settings)
      return response
    }

    async getUserById(id: string): Promise<User.Model> {
      const response = await UserService.USER_METHODS.getUserById(id)
      return response
    }

    async updateUser(id: string, body: User.UpdateProfileDto): Promise<User.Model> {
      const response = await UserService.USER_METHODS.updateUser(id, body)
      return response
    }

    async register(body: User.RegisterDto): Promise<User.Model> {
      const response = await UserService.USER_METHODS.register(body)
      return response
    }

    async login(body: User.LoginDto): Promise<User.Model> {
      const data: User.Session = await UserService.USER_METHODS.login(body)
      const { accessToken } = data
      if (accessToken) {
        const token = useCookie<string | null>(AUTHORIZATION_TOKEN_NAME, {
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

    async forgotPassword(body: User.ForgotPasswordDto): Promise<{ message: string }> {
      const response = await UserService.USER_METHODS.forgotPassword(body)
      return response
    }

    async resetPassword(body: User.ResetPasswordDto): Promise<{ message: string }> {
      const response = await UserService.USER_METHODS.resetPassword(body)
      return response
    }

    deleteUser(id: string): Promise<unknown> {
      const response = UserService.USER_METHODS.deleteUser(id)
      return response
    }

    logout(): void {
      const token = useCookie(AUTHORIZATION_TOKEN_NAME)
      token.value = null
      setAuth(false)
      setUser(null)
      UserService.API_SERVICE.setAuthorizationToken('')
    }

    async checkAuth(): Promise<void> {
      const token = useCookie(AUTHORIZATION_TOKEN_NAME)

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

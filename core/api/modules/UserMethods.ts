import type {nuxtContext} from '@nuxt/types'
import type {User, UserApi} from '@/types'

export default (context: nuxtContext) => {
  class UserMethods implements UserApi {
    private static readonly USER_ENDPOINTS = context.$configs.endpoints.user

    async login(body: User.LoginDto): Promise<User.Session> {
      const config = UserMethods.USER_ENDPOINTS.login(body)
      const result = await context.$services.useAPI.request({ config })
      return result
    }
  }

  context.$api.user = new UserMethods()
}

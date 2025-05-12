import type { nuxtContext } from '@nuxt/types'
import { type UserAdapter as IUserAdapter } from '@/types'

export default (context: nuxtContext) => {
  class UserAdapter implements IUserAdapter {}

  context.$adapters.user = new UserAdapter()
}

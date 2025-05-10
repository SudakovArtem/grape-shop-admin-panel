import { type Validations } from '@/types'
import type { nuxtContext } from '@nuxt/types'
// import auth from './validations/auth'

export default (ctx: nuxtContext) => {
  const validations: Validations.Model = {
    // auth,
  }

  ctx.$configs.validations = validations
}

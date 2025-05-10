import type { nuxtContext } from '@nuxt/types'

export default (context: nuxtContext) => {
  const constants = {}

  context.$configs.constants = constants
}

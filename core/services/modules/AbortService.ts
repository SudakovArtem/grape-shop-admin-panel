import type { nuxtContext } from '@nuxt/types'
import type { AbortService as IAbortService } from '@/types'

export default (context: nuxtContext) => {
  class AbortService implements IAbortService {
    controller: AbortController

    constructor() {
      this.controller = new AbortController()
    }

    getControllerSignal(): AbortSignal {
      return this.controller.signal
    }

    abortController(): void {
      this.controller.abort()
    }

    reloadController(): void {
      this.controller = new AbortController()
    }
  }

  context.$services.abort = new AbortService()
}

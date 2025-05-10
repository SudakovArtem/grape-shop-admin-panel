import type { Request } from '@/types'

export default function getParams(settings: Request.Params, paramNames: Request.Params): Request.Params {
  const params: Request.Params = {}

  Object.entries(settings).forEach(([key, value]) => {
    if (key in paramNames) {
      if (typeof value === 'boolean' || (typeof value === 'string' && value.length)) {
        params[paramNames[key] as string] = value
      }
    }
  })

  return params
}

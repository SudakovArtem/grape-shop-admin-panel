import { Request } from '@/types'

export interface ApiClientService {
  request: <T>(options: Request.Options) => Promise<T>
  setAuthorizationToken: (token?: string) => void
}

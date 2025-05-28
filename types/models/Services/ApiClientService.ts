import { Request } from '@/types'

export interface ApiClientService {
  request: <T = unknown, K = unknown>(options: Request.Options<K>) => Promise<T>
  setAuthorizationToken: (token?: string) => void
}

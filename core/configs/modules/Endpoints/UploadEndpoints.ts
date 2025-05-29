import { type Endpoints, Request } from '@/types'

const upload = {
  uploadFile(folder?: string): Request.Config {
    const params = folder ? { folder } : undefined
    return {
      url: '/uploads',
      method: Request.Methods.POST,
      params
    }
  }
} satisfies Endpoints['upload']

export default upload

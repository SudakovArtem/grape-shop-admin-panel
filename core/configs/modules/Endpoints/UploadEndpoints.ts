
import type { Request } from '@/types'
import type { UploadEndpoints } from '@/types'

const upload: UploadEndpoints = {
  uploadFile(folder?: string): Request.Config {
    const params = folder ? { folder } : undefined
    return {
      url: '/uploads',
      method: 'POST',
      params
    }
  }
}

export default upload


import type { Request } from '@/types'

export interface UploadEndpoints {
  uploadFile(folder?: string): Request.Config
}


import type { Request, Response, Upload } from '@/types'

export interface UploadApi {
  uploadFile(file: FormData, folder?: string): Promise<Upload.Response>
}

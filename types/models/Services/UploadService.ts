
import type { Request, Response, Upload } from '@/types'

export interface UploadService {
  uploadFile(file: FormData, folder?: string): Promise<Upload.Response>
}

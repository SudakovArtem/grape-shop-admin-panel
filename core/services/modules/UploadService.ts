
import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Upload, UploadService as IUploadService } from '@/types'

export default (context: nuxtContext) => {
  class UploadService implements IUploadService {
    private static UPLOAD_METHODS = context.$api.upload

    async uploadFile(file: FormData, folder?: string): Promise<Upload.Response> {
      const response = await UploadService.UPLOAD_METHODS.uploadFile(file, folder)
      return response
    }
  }

  context.$services.upload = new UploadService()
}

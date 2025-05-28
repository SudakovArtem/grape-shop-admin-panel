import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, Upload, UploadApi } from '@/types'

export default (context: nuxtContext) => {
  class UploadMethods implements UploadApi {
    private static UPLOAD_ENDPOINTS = context.$configs.endpoints.upload

    async uploadFile(file: FormData, folder?: string): Promise<Upload.Response> {
      const config = UploadMethods.UPLOAD_ENDPOINTS.uploadFile(folder)
      const result = await context.$services.useAPI.request<Upload.Response, FormData>({
        config,
        body: file
      })
      return result
    }
  }

  context.$api.upload = new UploadMethods()
}

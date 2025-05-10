// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from "url";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    '@img': fileURLToPath(new URL('./assets/images', import.meta.url)),
    '@icons': fileURLToPath(new URL('./assets/icons', import.meta.url)),
    '@adapters': fileURLToPath(new URL('./core/adapters', import.meta.url)),
    '@configs': fileURLToPath(new URL('./core/configs', import.meta.url)),
    '@api': fileURLToPath(new URL('./core/api', import.meta.url)),
    '@services': fileURLToPath(new URL('./core/services', import.meta.url))
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.API_BASE_URL,
      nodeEnv: process.env.APP_NODE_ENV,
    }
  },
  modules: ['@nuxt/ui', '@pinia/nuxt', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css']
})

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAuthStore from '@/store/auth'

const { isAuth } = storeToRefs(useAuthStore())
const router = useRouter()
const route = useRoute()

const fromUrl = computed<string | undefined>(() => route.query?.from as string)

watch(isAuth, (value) => {
  if (value) {
    router.push(unref(fromUrl) || '/')
  }
})
</script>

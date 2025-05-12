<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'login'
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>
const { user: userService } = useServices()

const router = useRouter()
const route = useRoute()
const fromUrl = computed<string>(() => (route?.query?.from as string) ?? '/')
const isSending = ref<boolean>(false)

const state = reactive<Schema>({
  email: '',
  password: ''
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSending.value = true

  try {
    const user = await userService.login({
      email: state.email,
      password: state.password
    })

    if (user) {
      toast.add({ title: 'Success', description: 'Вход в аккаунт выполнен успешно.', color: 'success' })
    }

    await router.push(fromUrl.value || '/')
  } catch (error) {
    toast.add({ title: 'Error', description: 'Произошла ошибка при входе в аккаунт.', color: 'error' })
    console.error(error)
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-lg" variant="subtle">
    <template #header>
      <h2 class="text-4xl">Вход</h2>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" class="w-full" />
      </UFormField>

      <UButton type="submit" size="xl"> Submit </UButton>
    </UForm>

    <template #footer> </template>
  </UCard>
</template>

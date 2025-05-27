<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()
const id = route.params.id
const {
  public: { baseApiUrl }
} = useRuntimeConfig()

const { data: user } = await useLazyAsyncData(
  () =>
    $fetch(`${baseApiUrl}/users/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${useCookie('token').value ?? ''}`
      }
    }),
  {
    default: () => ({})
  }
)

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const breadcrumbsArray = [
    {
      icon: 'i-lucide-house',
      to: '/'
    },
    {
      label: 'Пользователи',
      icon: 'i-lucide-users',
      to: '/users'
    }
  ]

  if (user.value) {
    const { name, id } = user.value
    return [
      ...breadcrumbsArray,
      {
        label: name,
        icon: 'i-lucide-square-pen',
        to: `/users/${id}`
      }
    ]
  }
  return breadcrumbsArray
})
</script>

<template>
  <UContainer class="pt-6 pb-6">
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />

    <pre>{{ user }}</pre>
  </UContainer>
</template>

<style scoped></style>

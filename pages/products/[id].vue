<script setup lang="ts">
import type { Product } from '@/types'
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()
const id = route.params.id
const {
  public: { baseApiUrl }
} = useRuntimeConfig()

const { data: product, refresh } = await await useLazyAsyncData<Product.Model>(() => {
  return $fetch(`${baseApiUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    }
  })
})

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const breadcrumbsArray = [
    {
      icon: 'i-lucide-house',
      to: '/'
    },
    {
      label: 'Продукты',
      icon: 'i-lucide-grape',
      to: '/products'
    }
  ]

  if (product.value) {
    const { name, id } = product.value
    return [
      ...breadcrumbsArray,
      {
        label: name,
        icon: 'i-lucide-square-pen',
        to: `/products/${id}`
      }
    ]
  }
  return breadcrumbsArray
})
</script>

<template>
  <UContainer class="pt-6 pb-6">
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />
    <ProductForm is-update title="Редактирование продукта" :product="product" @refresh="refresh" />
  </UContainer>
</template>

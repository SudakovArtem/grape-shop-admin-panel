<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Продукты',
    icon: 'i-lucide-grape',
    to: '/products'
  },
  {
    label: 'Новый продукт',
    icon: 'i-lucide-file-plus-2',
    to: `/products/new`
  }
])
</script>

<template>
  <UContainer class="pt-6 pb-6">
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />
    <ProductForm title="Новый продукт" />
  </UContainer>
</template>

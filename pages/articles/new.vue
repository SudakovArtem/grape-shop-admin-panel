<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Статьи',
    icon: 'i-lucide-newspaper',
    to: '/articles'
  },
  {
    label: 'Новая статья',
    icon: 'i-lucide-file-plus-2',
    to: `/articles/new`
  }
])
</script>

<template>
  <UContainer class="pt-6 pb-6">
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />
    <ArticleForm title="Новая статья" />
  </UContainer>
</template>

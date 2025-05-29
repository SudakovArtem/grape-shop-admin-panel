<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()
const id = route.params.id
const { article: articleService } = useServices()

const { data: article, refresh } = await useLazyAsyncData(() => articleService.getArticleById(id as string))

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const breadcrumbsArray = [
    {
      icon: 'i-lucide-house',
      to: '/'
    },
    {
      label: 'Статьи',
      icon: 'i-lucide-newspaper',
      to: '/articles'
    }
  ]

  if (article.value) {
    const { title, id } = article.value
    return [
      ...breadcrumbsArray,
      {
        label: title,
        icon: 'i-lucide-square-pen',
        to: `/articles/${id}`
      }
    ]
  }
  return breadcrumbsArray
})
</script>

<template>
  <UContainer class="pt-6 pb-6 max-w-none">
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />
    <ArticleForm v-if="article" is-update title="Редактирование статьи" :article="article" @refresh="refresh" />
  </UContainer>
</template>

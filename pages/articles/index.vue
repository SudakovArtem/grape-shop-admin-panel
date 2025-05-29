<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { Article, Response } from '@/types'

const { article: articleService } = useServices()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Статьи',
    icon: 'i-lucide-newspaper',
    to: '/articles'
  }
])

const { pageNumber, pageSize, list, loadList, setPageNumber, totalCount } = usePagination<Article.Model>({
  replace: true
})

const deleteArticle = async (id: string) => {
  isSending.value = true
  try {
    await articleService.deleteArticle(id)
    await refresh()
  } catch (error) {
    console.error(error)
  } finally {
    isSending.value = false
  }
}

const { search, columns, getDropdownActions } = useArticles({
  onSearch: () => {
    setPageNumber(1)
    refresh()
  },
  onDelete: deleteArticle
})

const {
  data: articles,
  status: articlesStatus,
  refresh
} = await useLazyAsyncData(
  () =>
    articleService.getArticles({
      pageSize: unref(pageSize).toString(),
      pageNumber: unref(pageNumber).toString(),
      search: unref(search),
      sortBy: 'createdAt_desc'
    }),
  {
    default: () => ({
      data: [],
      meta: {}
    }),
    watch: [pageNumber]
  }
)

const isSending = ref<boolean>(false)
const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(articlesStatus)) || unref(isSending)
})

watch(
  articles,
  (value) => {
    if (!value) {
      return
    }

    loadList(value?.data ?? [], (value.meta as Response.Pagination).total ?? 0)
  },
  { immediate: true }
)
</script>

<template>
  <ClientOnly>
    <UContainer class="pt-6 pb-6 max-w-none">
      <UBreadcrumb :items="breadcrumbs" />
      <div class="flex px-4 py-3.5 border-b border-accented justify-between gap-4">
        <UInput v-model="search" class="max-w-sm" placeholder="Поиск по заголовку..." />
        <UButton icon="i-lucide-plus" size="md" color="primary" variant="solid" to="/articles/new" />
      </div>
      <div class="w-full space-y-4 pb-4">
        <UTable :data="list" class="flex-1" :columns="columns" :loading="isLoading">
          <template #action-cell="{ row }">
            <UDropdownMenu :items="getDropdownActions(row.original)">
              <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
            </UDropdownMenu>
          </template>
        </UTable>
      </div>
      <div class="flex justify-center border-t border-default pt-4">
        <UPagination
          v-model:page="pageNumber"
          :items-per-page="pageSize"
          :show-controls="false"
          show-edges
          :total="totalCount"
        />
      </div>
    </UContainer>
  </ClientOnly>
</template>

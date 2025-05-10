<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import type {DropdownMenuItem, TableColumn, BreadcrumbItem} from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Product = {
  id: number
  name: string
  description: string
  cuttingPrice: string
  seedlingPrice: string
  categoryId: number
  variety: string
  maturationPeriod: string
  berryShape: string
  color: string
  taste: string
  inStock: boolean
  createdAt: string
  updatedAt: string
  categoryName: string
  images: string[]
}
const {public: {baseApiUrl}} = useRuntimeConfig()

const router = useRouter()

const breadcrumbs = computed<BreadcrumbItem[]>( () => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Продукты',
    icon: 'i-lucide-box',
    to: '/products'
  }
])

const {pageNumber, pageSize, isMaxItems, list, loadList, totalCount, increasePageNumber, setPageNumber} = usePagination<Product>()

const {data: products, status: productsStatus, refresh} = useAsyncData(() =>
        $fetch(`${baseApiUrl}/products`, {
          method: 'GET',
          params: {
            limit: unref(pageSize),
            page: unref(pageNumber),
            sortBy: 'price_asc'
          }
        }),
    {
      default: () => ({
        data: [],
        meta: {}
      }),
      watch: [pageNumber]
    })

const isSending = ref<boolean>(false)
const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(productsStatus)) || unref(isSending)
})

const columns: TableColumn<Product>[] = [
  {
    id: 'action'
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Название'
  },
  {
    accessorKey: 'description',
    header: 'Описание'
  },
  {
    accessorKey: 'berryShape',
    header: 'Форма'
  },
  {
    accessorKey: 'color',
    header: 'Цвет'
  },
  {
    accessorKey: 'taste',
    header: 'Вкус'
  },
  {
    accessorKey: 'inStock',
    header: 'Наличие',
    cell: ({ row }) => {
      const color = {
        success: 'success' as const,
        failed: 'error' as const
      }[row.getValue('inStock') ? 'success' : 'failed']

      return h(UBadge, { variant: 'subtle', color }, () =>
          row.getValue('inStock') ? 'В наличии' : 'Нет в наличии'
      )
    }
  },
  {
    accessorKey: 'cuttingPrice',
    header: 'Черенок',
    cell: ({ row }) => {
      const prise = Number.parseFloat(row.getValue('cuttingPrice'))

      const formatted = new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB'
      }).format(prise)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    accessorKey: 'seedlingPrice',
    header: 'Саженец',
    cell: ({ row }) => {
      const prise = Number.parseFloat(row.getValue('seedlingPrice'))

      const formatted = new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB'
      }).format(prise)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
]
const toast = useToast()

const deleteProduct = async (id: string) => {
  isSending.value = true
  try {
    await useFetch(`${baseApiUrl}/products/${id}`, {
      method: 'DELETE',
    })
    await refresh()
  } catch (error) {
    console.error(error)
  } finally {
    isSending.value = false
  }
}
function getDropdownActions(product: Product): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Скопировать Название',
        icon: 'i-lucide-copy',
        onSelect: () => {
          navigator.clipboard.writeText(product.name.toString())
          toast.add({
            title: 'Email пользователя скопирован!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Редактировать',
        icon: 'i-lucide-edit',
        onSelect: () => router.push(`/products/${product.id}`)
      },
      {
        label: 'Удалить',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: () => deleteProduct(product.id.toString())
      }
    ]
  ]
}

watch(
    products,
    (value) => {
      if (!value) {
        return
      }

      loadList(value?.data ?? [], value.meta.total ?? 0)
    },
    {immediate: true}
)
</script>

<template>
  <UContainer>
    <UBreadcrumb :items="breadcrumbs" />
    <div class="flex items-center justify-end pt-4">
    <UButton icon="i-lucide-plus" size="md" color="primary" variant="solid" to="/products/new" />
  </div>
  <USeparator class="mb-4 mt-4" />
    <div class="w-full space-y-4 pb-4">
  <UTable :data="list" class="flex-1" :columns="columns" :loading="isLoading">
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            aria-label="Actions"
        />
      </UDropdownMenu>
    </template>
  </UTable>
  </div>
    <div class="flex justify-center border-t border-default pt-4">
  <UPagination v-model:page="pageNumber" :show-controls="false" show-edges :total="totalCount" />
  </div>
  </UContainer>
</template>

<style scoped>

</style>

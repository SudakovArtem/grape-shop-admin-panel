<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import type { BreadcrumbItem, TableColumn, TableRow } from '@nuxt/ui'
import type { Response } from '@/types'

const UBadge = resolveComponent('UBadge')

type Order = {
  id: number
  userId: number
  totalPrice: string
  status: string
  createdAt: string
  items: {
    id: number
    orderId: number
    productId: number
    type: string
    quantity: number
    price: string
  }[]
}
const {
  public: { baseApiUrl }
} = useRuntimeConfig()

const router = useRouter()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Заказы',
    icon: 'i-lucide-logs',
    to: '/orders'
  }
])

const statusColors = {
  Создан: 'neutral',
  'В обработке': 'info',
  Отправлен: 'secondary',
  Доставлен: 'success',
  Отменен: 'error'
} as const

const { pageNumber, pageSize, list, loadList, totalCount } = usePagination<Order>()

const { data: orders } = await useLazyAsyncData(
  () =>
    $fetch(`${baseApiUrl}/orders/all`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${useCookie('token').value ?? ''}`
      },
      params: {
        limit: unref(pageSize),
        page: unref(pageNumber),
        sortBy: '-createdAt'
      }
    }),
  {
    default: () => ({
      data: [],
      meta: {}
    }),
    watch: [pageNumber]
  }
)

const columns: TableColumn<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'userId',
    header: 'ID пользователя'
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      const color = statusColors[row.getValue('status') as keyof typeof statusColors]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('status'))
    }
  },
  {
    accessorKey: 'items',
    header: 'Товары',
    cell: ({ row }) => {
      return h(
        UBadge,
        { class: 'capitalize', variant: 'outline', color: 'neutral' },
        () => (row.getValue('items') as Array<unknown>).length
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'totalPrice',
    header: () => h('div', { class: 'text-right' }, 'Стоимость'),
    cell: ({ row }) => {
      const prise = Number.parseFloat(row.getValue('totalPrice'))

      const formatted = new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB'
      }).format(prise)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]

function onSelect(row: TableRow<Order>, e?: Event) {
  const id = row.getValue('id')
  router.push(`/orders/${id}`)
}

watch(
  orders,
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
    <UContainer class="pt-6 pb-6">
      <UBreadcrumb :items="breadcrumbs" />
      <div class="w-full space-y-4 pb-4 pt-4">
        <UTable :data="list" class="flex-1" :columns="columns" @select="onSelect" />
      </div>
      <div class="flex justify-center border-t border-default pt-4">
        <UPagination v-model:page="pageNumber" :show-controls="false" show-edges :total="totalCount" />
      </div>
    </UContainer>
  </ClientOnly>
</template>

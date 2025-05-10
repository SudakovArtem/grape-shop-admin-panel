<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import type { TableColumn, TableRow } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

// {
//   "id": 2,
//     "userId": 4,
//     "totalPrice": "31.98",
//     "status": "Создан",
//     "createdAt": "2025-05-10T12:59:38.154Z",
//     "items": [
//   {
//     "id": 2,
//     "orderId": 2,
//     "productId": 3,
//     "type": "cutting",
//     "quantity": 2,
//     "price": "15.99"
//   }
// ]
// }
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
const {public: {baseApiUrl}} = useRuntimeConfig()

const router = useRouter()

// const statusColors = {
//   "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"
// }

const statusColors = {
  'Создан': 'neutral',
  'В обработке': 'info',
  'Отправлен': 'secondary',
  'Доставлен': 'success',
  'Отменен': 'error'
} as const

const {pageNumber, pageSize, isMaxItems, list, loadList, totalCount, increasePageNumber, setPageNumber} = usePagination<Order>()

const {data: orders} = useAsyncData(() =>
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
    })

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

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
          row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'items',
    header: 'Товары',
    cell: ({ row }) => {
      return h(UBadge, { class: 'capitalize', variant: 'outline', color: 'neutral' }, () =>
          (row.getValue('items') as Array<unknown>).length
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

      loadList(value?.data ?? [], value.meta.total ?? 0)
    },
    {immediate: true}
)
</script>

<template>
  <UContainer>
    <div class="w-full space-y-4 pb-4 pt-4">
      <UTable :data="list" class="flex-1" :columns="columns" @select="onSelect" />
    </div>
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination v-model:page="pageNumber" :show-controls="false" show-edges :total="totalCount" />
    </div>
  </UContainer>
</template>

<style scoped>

</style>

<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import type { TableColumn, DropdownMenuItem, BreadcrumbItem } from '@nuxt/ui'
import { debounce } from 'lodash'
import type { Response, User } from '@/types'

const UBadge = resolveComponent('UBadge')

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Пользователи',
    icon: 'i-lucide-users',
    to: '/users'
  }
])

const router = useRouter()
const { user: userService } = useServices()
const search = ref<string>('')
const isSending = ref<boolean>(false)

const { pageNumber, pageSize, list, loadList, totalCount, setPageNumber } = usePagination<User.Model>()

const {
  data: users,
  status: usersStatus,
  refresh
} = await useLazyAsyncData(
  () =>
    userService.getUsers({
      limit: unref(pageSize).toString(),
      page: unref(pageNumber).toString(),
      email: unref(search),
      sortBy: 'createdAt'
    }),
  {
    default: () => ({
      data: [],
      meta: {}
    }),
    watch: [pageNumber]
  }
)

const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(usersStatus)) || unref(isSending)
})

const columns: TableColumn<User.Model>[] = [
  {
    id: 'action'
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'name',
    header: 'Имя'
  },
  {
    accessorKey: 'phone',
    header: 'Телефон'
  },
  {
    accessorKey: 'address',
    header: 'Адрес'
  },
  {
    accessorKey: 'role',
    header: 'Роль',
    cell: ({ row }) => {
      const color = {
        admin: 'success' as const,
        user: 'neutral' as const
      }[row.getValue('role') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => row.getValue('role'))
    }
  }
]

const toast = useToast()

const deleteUser = async (id: string) => {
  isSending.value = true
  try {
    await userService.deleteUser(id)
    await refresh()
  } catch (error) {
    console.error(error)
  } finally {
    isSending.value = false
  }
}

function getDropdownActions(user: User.Model): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Скопировать Email',
        icon: 'i-lucide-copy',
        onSelect: () => {
          navigator.clipboard.writeText(user.email.toString())
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
        onSelect: () => router.push(`/users/${user.id}`)
      },
      {
        label: 'Удалить',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: () => deleteUser(user.id.toString())
      }
    ]
  ]
}

watch(
  users,
  (value) => {
    if (!value) {
      return
    }

    loadList(value?.data ?? [], (value.meta as Response.Pagination)?.total ?? 0)
  },
  { immediate: true }
)

const onSearch = debounce(() => {
  setPageNumber(1)
  refresh()
}, 800)

watch(search, onSearch)
</script>

<template>
  <ClientOnly>
    <UContainer class="pt-6 pb-6">
      <UBreadcrumb :items="breadcrumbs" />
      <div class="flex px-4 py-3.5 border-b border-accented justify-between gap-4">
        <UInput v-model="search" class="max-w-sm" placeholder="Поиск по email..." />
        <UButton icon="i-lucide-plus" size="md" color="primary" variant="solid" />
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
        <UPagination v-model:page="pageNumber" :show-controls="false" show-edges :total="totalCount" />
      </div>
    </UContainer>
  </ClientOnly>
</template>

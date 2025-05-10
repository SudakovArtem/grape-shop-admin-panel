<script lang="ts" setup xmlns="http://www.w3.org/1999/html">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')
// {
//   "id": 1,
//     "email": "testuser_387@example.com",
//     "name": null,
//     "address": null,
//     "phone": null,
//     "role": "user",
//     "createdAt": "2025-05-08T22:41:09.349Z"
// }

type User = {
  id: number
  email: string
  name: string
  address: string
  phone: string
  role: string
  createdAt: string
}
const router = useRouter()
const {public: {baseApiUrl}} = useRuntimeConfig()
const { user: userService } = useServices()
const search = ref<string>('')
const isSending = ref<boolean>(false)

const {pageNumber, pageSize, isMaxItems, list, loadList, totalCount, increasePageNumber, setPageNumber} = usePagination<User>()

const {data: users, status: usersStatus, refresh} = useAsyncData(() =>
        userService.getUsers({
            limit: unref(pageSize),
            page: unref(pageNumber),
            email: unref(search),
            sortBy: 'createdAt'
        }),
    {
      default: () => ({
        data: [],
        meta: {}
      }),
      watch: [pageNumber]
    })

const isLoading = computed<boolean>(() => {
  return ['idle', 'pending'].includes(unref(usersStatus)) || unref(isSending)
})

const columns: TableColumn<User>[] = [
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

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
          row.getValue('role')
      )
    }
  },
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

function getDropdownActions(user: User): DropdownMenuItem[][] {
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

      loadList(value?.data ?? [], value.meta.total ?? 0)
    },
    {immediate: true}
)
</script>

<template>
  <UContainer>
    <div class="flex items-center justify-end pt-4">
      <UButton icon="i-lucide-plus" size="md" color="primary" variant="solid" />
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

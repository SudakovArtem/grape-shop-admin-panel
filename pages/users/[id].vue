<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { User } from '@/types'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { user: userService } = useServices()

const id = route.params.id as string

const isEditing = ref<boolean>(false)
const saving = ref<boolean>(false)
const deleting = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)

const { data: user, refresh } = await useLazyAsyncData(`user-${id}`, () => userService.getUserById(id), {
  default: () => null
})

const editForm = ref<User.UpdateProfileDto>({
  name: '',
  phone: '',
  address: ''
})

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const breadcrumbsArray = [
    {
      icon: 'i-lucide-house',
      to: '/'
    },
    {
      label: 'Пользователи',
      icon: 'i-lucide-users',
      to: '/users'
    }
  ]

  if (user.value) {
    const { name, id } = user.value
    return [
      ...breadcrumbsArray,
      {
        label: name,
        icon: 'i-lucide-user',
        to: `/users/${id}`
      }
    ]
  }
  return breadcrumbsArray
})

const toggleEdit = (): void => {
  if (user.value) {
    editForm.value = {
      name: user.value.name,
      phone: user.value.phone || '',
      address: user.value.address || ''
    }
  }
  isEditing.value = true
}

const cancelEdit = (): void => {
  isEditing.value = false
  editForm.value = {
    name: '',
    phone: '',
    address: ''
  }
}

const saveUser = async (): Promise<void> => {
  if (!user.value) return

  try {
    saving.value = true

    await userService.updateUser(id, editForm.value)

    toast.add({
      title: 'Успешно',
      description: 'Профиль пользователя обновлен',
      color: 'success'
    })

    await refresh()
    isEditing.value = false
  } catch (error) {
    console.error('Error updating user:', error)
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось обновить профиль',
      color: 'error'
    })
  } finally {
    saving.value = false
  }
}

const deleteUser = async (): Promise<void> => {
  if (!user.value) return

  try {
    deleting.value = true

    await userService.deleteUser(id)

    toast.add({
      title: 'Успешно',
      description: 'Пользователь удален',
      color: 'success'
    })

    router.push('/users')
  } catch (error) {
    console.error('Error deleting user:', error)
    toast.add({
      title: 'Ошибка',
      description: 'Не удалось удалить пользователя',
      color: 'error'
    })
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <UContainer class="pt-6 pb-6 max-w-none">
    <UBreadcrumb :items="breadcrumbs" class="mb-6" />

    <div v-if="user" class="max-w-4xl mx-auto">
      <!-- User Header -->
      <UCard>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <UAvatar v-if="user.avatar" :src="user.avatar" :alt="user.name" size="xl" />
            <div>
              <h1 class="text-2xl font-bold">{{ user.name }}</h1>
              <p class="text-muted">{{ user.email }}</p>
              <UBadge
                :label="user.role === 'admin' ? 'Администратор' : 'Пользователь'"
                :color="user.role === 'admin' ? 'error' : 'secondary'"
                variant="subtle"
                class="mt-1"
              />
            </div>
          </div>
          <div class="flex space-x-2">
            <UButton v-if="!isEditing" @click="toggleEdit" icon="i-lucide-edit" label="Редактировать" />
            <UButton
              v-if="isEditing"
              @click="saveUser"
              :loading="saving"
              icon="i-lucide-check"
              label="Сохранить"
              color="primary"
            />
            <UButton
              v-if="isEditing"
              @click="cancelEdit"
              icon="i-lucide-x"
              label="Отмена"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>
      </UCard>

      <!-- User Details -->
      <UCard class="mt-6">
        <h2 class="text-lg font-semibold mb-4">Информация о пользователе</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name Field -->
          <div>
            <label class="block text-sm font-medium mb-1">Имя</label>
            <UInput v-if="isEditing" v-model="editForm.name" placeholder="Введите имя" />
            <p class="text-muted" v-else>{{ user.name || 'Не указано' }}</p>
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <p class="text-muted">{{ user.email }}</p>
          </div>

          <!-- Phone Field -->
          <div>
            <label class="block text-sm font-medium mb-1">Телефон</label>
            <UInput v-if="isEditing" v-model="editForm.phone" placeholder="Введите телефон" />
            <p v-else class="text-muted">{{ user.phone || 'Не указано' }}</p>
          </div>

          <!-- Address Field -->
          <div>
            <label class="block text-sm font-medium mb-1">Адрес</label>
            <UInput v-if="isEditing" v-model="editForm.address" placeholder="Введите адрес" />
            <p v-else class="text-muted">{{ user.address || 'Не указано' }}</p>
          </div>

          <!-- Created At -->
          <div>
            <label class="block text-sm font-medium mb-1">Дата регистрации</label>
            <p class="text-muted">{{ formatDate(user.createdAt) }}</p>
          </div>

          <!-- Role -->
          <div>
            <label class="block text-sm font-medium mb-1">Роль</label>
            <p class="text-muted">{{ user.role === 'admin' ? 'Администратор' : 'Пользователь' }}</p>
          </div>
        </div>
      </UCard>

      <!-- Delete User Section (Admin only) -->
      <UCard class="mt-6">
        <h2 class="text-lg font-semibold text-red-600 mb-4">Опасная зона</h2>
        <div class="flex items-center justify-between p-4 border border-red-200 rounded-lg">
          <div>
            <h3 class="text-sm font-medium">Удалить пользователя</h3>
            <p class="text-sm text-muted">Это действие нельзя отменить</p>
          </div>
          <UButton @click="showDeleteModal = true" color="error" label="Удалить" icon="i-lucide-trash-2" />
        </div>
      </UCard>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="showDeleteModal">
      <template #header>
        <h3 class="text-lg font-semibold">Подтвердите удаление</h3>
      </template>
      <template #body>
        <p>
          Вы уверены, что хотите удалить пользователя <strong>{{ user?.name }}</strong
          >?
        </p>
        <p>Это действие нельзя отменить.</p>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton @click="showDeleteModal = false" colo="secondary" variant="outline" label="Отмена" />
          <UButton @click="deleteUser" :loading="deleting" color="error" label="Удалить" />
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

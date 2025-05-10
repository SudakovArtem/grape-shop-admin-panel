<script setup lang="ts">
import * as z from 'zod'
import type {BreadcrumbItem, FormSubmitEvent} from '@nuxt/ui'

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
  images: string[]
}

type Props = {
  title?: string
  isUpdate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Новый продукт',
  isUpdate: false
})

const schema = z.object({
  name: z.string(),
  description: z.string(),
  cuttingPrice: z.string(),
  seedlingPrice: z.string(),
  categoryId: z.number(),
  variety: z.string(),
  maturationPeriod: z.string(),
  berryShape: z.string(),
  color: z.string(),
  taste: z.string(),
  inStock: z.boolean(),
  images: z.array(z.instanceof(File)),
})

type Schema = z.output<typeof schema>
const { user: userService } = useServices()

const router = useRouter()
const route = useRoute()
const productName = ref<string>('')

const crumb = computed<string>(() => route.params?.id ? unref(productName) : props.title)

const breadcrumbs = computed<BreadcrumbItem[]>( () => [
  {
    icon: 'i-lucide-house',
    to: '/'
  },
  {
    label: 'Продукты',
    icon: 'i-lucide-box',
    to: '/products'
  },
  {
    label: unref(crumb),
    icon: 'i-lucide-link',
    to: `/components/${(route.params?.id as string) ?? ''}`
  }
])

const categories = ref([
  {
    label: 'Виноград',
    value: 2
  }
])
// Форма ягоды
const berryShapes = ref<string[]>(['Овальная', 'Пальцевидная', 'Удлиненная', 'Яйцевидная', 'Круглая'])

// Срок созревания
const ripeningPeriods = ref<string[]>(['Ультраранний', 'Очень ранний', 'Ранний', 'Ранне-средний', 'Средний', 'Не указан'])

// Цвет
const colors = ref<string[]>(['Желтый', 'Красный', 'Розово-красный', 'Темно-красный', 'Темный', 'Белый', 'Бело-розовый', 'Желто-розовый', 'Розовый'])

// Вкус
const flavors = ref<string[]>(['Гармоничный', 'Мускатный', 'Легкий мускат', 'Фруктовый'])

// Коллекция
const collections = ref<string[]>([
  'Основная коллекция',
  'Селекция Голуба А.А.',
  'Селекция Щеренкова В.А.',
  'Селекция Щенникова О.Н.',
  'Селекция Карпушева А.',
  'Киш-мишные сорта',
  'Селекция Калугина В.М.'
])

type Image = {
  fileKey: string
  url: string
}

const isSending = ref<boolean>(false)

const state = reactive<Schema>({
  name: '',
  description: '',
  cuttingPrice: '',
  seedlingPrice: '',
  categoryId: categories.value[0].value,
  variety: '',
  maturationPeriod: '',
  berryShape: '',
  color: '',
  taste: '',
  inStock: false,
  images: []
})

const toast = useToast()

const {public: {baseApiUrl}} = useRuntimeConfig()

const uploadFile = async (productId: string, file: File): Promise<string> => {
  const errorText = `При загрузке файла ${file?.name} произошла ошибка. `
  const formData = new FormData()
  formData.set('fieldName', 'file')
  formData.set('imageFile', file, file.name)

  const tempFile = await $fetch(`${baseApiUrl}/products/${productId}/images`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    },
    body: formData
  })
  if (!tempFile) {
    throw new Error(errorText)
  }
  return tempFile
}

const uploadPreviews = async (productId: string, data: File[]): Promise<string[] | false> => {
  const uploadPromises = data.map((file) => uploadFile(productId, file as File))

  try {
    const results = await Promise.all(uploadPromises)
    return results as string[]
  } catch (error) {
    console.error(error)
    return false
  }
}

const prepareData = (state: Schema) => {
  return ({
    name: state.name,
    description: state.description,
    cuttingPrice: state.cuttingPrice,
    seedlingPrice: state.seedlingPrice,
    categoryId: state.categoryId,
    variety: state.variety,
    maturationPeriod: state.maturationPeriod,
    berryShape: state.berryShape,
    color: state.color,
    taste: state.taste,
    inStock: state.inStock,
  });
}

const createProduct = async (state: Schema) => {
  const body = prepareData(state)
  const product = await $fetch<Product>(`${baseApiUrl}/products`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    },
    body
  })
  const tempFiles = await uploadPreviews(product.id?.toString(), state.images as File[])
}

const updateProduct = async (id: string, state: Schema) => {
  const body = await prepareData(state)
  const product = await $fetch<Product>(`${baseApiUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    },
    body
  })
  const tempFiles = await uploadPreviews(product.id?.toString(), state.images as File[])
}

const fetchProduct = async (id: string) => {
  const { data: product } = await useFetch<Product>(`${baseApiUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    }
  })

  if (product.value !== null) {
    productName.value = product.value.name
    Object.keys(state).forEach((key) => {
      if (key in product.value!) {
        (state as any)[key] = (product.value as Product)[key as keyof Product]
      }
    })
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const submitFunc = props.isUpdate ? () => updateProduct(route.params?.id as string, state) : () => createProduct(state)

    isSending.value = true

  try {
    await submitFunc()
    toast.add({ title: 'Success', description: 'Продукт успешно сохранен.', color: 'success' })
  } catch (error) {
    toast.add({ title: 'Error', description: 'Произошла ошибка при сохранении продукта.', color: 'error' })
    console.error(error)
  } finally {
    isSending.value = false
  }
}

watch(() => route.params?.id, (value) => {
  if (value === undefined) {
    return
  }

  fetchProduct(value as string)
}, {immediate: true})
</script>

<template>
  <UContainer>
    <UBreadcrumb :items="breadcrumbs" />
    <UCard class="w-full" variant="outline">
      <template #header>
        <h2 class="text-4xl" v-text="title" />
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit" :disabled="isSending">
        <UFormField label="Название" name="name">
          <UInput size="xl" v-model="state.name" class="w-full" />
        </UFormField>

        <UFormField required label="Коллекция" name="variety">
          <USelect size="xl" v-model="state.variety" class="w-full" :items="collections" />
        </UFormField>

        <UFormField required label="Описание" name="description">
          <UTextarea size="xl" v-model="state.description" class="w-full" autoresize />
        </UFormField>

        <UFormField required label="Категория" name="categoryId">
          <USelect size="xl" v-model="state.categoryId" class="w-full" :items="categories" disabled />
        </UFormField>

        <UFormField required label="Форма ягоды" name="berryShapes">
          <USelect size="xl" v-model="state.berryShape" class="w-full" :items="berryShapes" />
        </UFormField>

        <UFormField required label="Срок созревания" name="maturationPeriod">
          <USelect size="xl" v-model="state.maturationPeriod" class="w-full" :items="ripeningPeriods" />
        </UFormField>

        <UFormField required label="Цвет" name="color">
          <USelect size="xl" v-model="state.color" class="w-full" :items="colors" />
        </UFormField>

        <UFormField required label="Вкус" name="taste">
          <USelect size="xl" v-model="state.taste" class="w-full" :items="flavors" />
        </UFormField>

        <UFormField required label="Цена за черенок" name="cuttingPrice">
          <UInput size="xl" v-model="state.cuttingPrice" class="w-full" />
        </UFormField>

        <UFormField required label="Цена за саженец" name="seedlingPrice">
          <UInput size="xl" v-model="state.seedlingPrice" class="w-full" />
        </UFormField>

        <UFormField>
          <USwitch v-model="state.inStock" label="В наличии" />
        </UFormField>

        <UFormField label="Изображения" name="images">
          <UiFile v-model="state.images" id="images" multiple name="images" :max-size="5" />
        </UFormField>

        <UButton type="submit" size="xl" :loading="isSending">
          <span v-text="isUpdate ? 'Обновить' : 'Создать'"></span>
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Category, Product } from '@/types'
import { type ProductSchema, productSchema } from '@configs/modules/validations/product'

const { product = null, title = 'Новый продукт', isUpdate = false, loading = false } = defineProps<Product.FormProps>()

const emit = defineEmits<Product.FormEmits>()

const {
  public: { baseApiUrl }
} = useRuntimeConfig()

const { data: categories } = await useLazyAsyncData<Category.Model[]>(
  'categories',
  () => $fetch(`${baseApiUrl}/categories`),
  {
    default: () => []
  }
)

const {
  constants: { colors, flavors, berryShapes, ripeningPeriods, collections }
} = useConfigs()

const isSending = ref<boolean>(false)
const isLoading = computed<boolean>(() => loading || unref(isSending))
const isMounted = ref<boolean>(false)

const state = reactive<ProductSchema>({
  name: '',
  description: '',
  cuttingPrice: '',
  seedlingPrice: '',
  categoryId: -1,
  variety: '',
  maturationPeriod: '',
  berryShape: '',
  color: '',
  taste: '',
  cuttingInStock: 0,
  seedlingInStock: 0
})

const productImages = ref<File[]>([])

const toast = useToast()

const uploadFile = async (productId: number, file: File): Promise<string> => {
  const errorText = `При загрузке файла ${file?.name} произошла ошибка. `
  const formData = new FormData()
  formData.set('fieldName', 'file')
  formData.set('imageFile', file, file.name)

  const { imageUrl } = await $fetch<Product.UploadFile>(`${baseApiUrl}/products/${productId}/images`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    },
    body: formData
  })
  if (!imageUrl) {
    throw new Error(errorText)
  }
  return imageUrl
}

const uploadPreviews = async (productId: number, data: File[]): Promise<string[] | false> => {
  const uploadPromises = data.map((file) => uploadFile(productId, file as File))

  try {
    const results = await Promise.all(uploadPromises)
    return results as string[]
  } catch (error) {
    console.error(error)
    return false
  }
}

const prepareData = (state: ProductSchema) => {
  return {
    name: state.name,
    description: state.description || '',
    cuttingPrice: state.cuttingPrice,
    seedlingPrice: state.seedlingPrice,
    categoryId: state.categoryId,
    variety: state.variety,
    maturationPeriod: state.maturationPeriod,
    berryShape: state.berryShape,
    color: state.color,
    taste: state.taste,
    cuttingInStock: state.cuttingInStock,
    seedlingInStock: state.seedlingInStock
  }
}

const createProduct = async (state: ProductSchema) => {
  const body = prepareData(state)
  const response = await $fetch<Product.Model>(`${baseApiUrl}/products`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    },
    body
  })

  await uploadPreviews(response.id, unref(productImages))
}

const updateProduct = async (id: number, state: ProductSchema) => {
  const body = prepareData(state)
  const response = await $fetch<Product.Model>(`${baseApiUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${useCookie('token').value ?? ''}`
    },
    body
  })

  await uploadPreviews(response.id, unref(productImages))
  emit('refresh')
}

const updateProductData = (data: Product.Model | null) => {
  if (data !== null) {
    const { description, ...rest } = state
    Object.keys(rest).forEach((key) => {
      if (key in data!) {
        ;(state as any)[key] = (data as Product.Model)[key as keyof Product.Model]
      }
    })
    state.description = data.description
    productImages.value = []
  }
}

const deleteImage = async (productId: number, imageId: number) => {
  isSending.value = true
  try {
    await $fetch<Product.UploadFile>(`${baseApiUrl}/products/${productId}/images/${imageId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${useCookie('token').value ?? ''}`
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    isSending.value = false
    emit('refresh')
  }
}

async function onSubmit({ data }: FormSubmitEvent<ProductSchema>) {
  const submitFunc = isUpdate ? () => updateProduct(product?.id ?? -1, data) : () => createProduct(state)

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

watch(
  [isMounted, () => product],
  ([mounted, productValue]) => {
    if (!mounted) {
      return
    }
    updateProductData(productValue)
  },
  { immediate: true }
)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <UCard class="w-full" variant="outline">
    <template #header>
      <h2 class="text-4xl" v-text="title" />
    </template>
    <UForm :disabled="isLoading" :schema="productSchema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Название" name="name">
          <UInput v-model="state.name" class="w-full" size="xl" />
        </UFormField>

        <UFormField label="Коллекция" name="variety" required>
          <USelect v-model="state.variety" :items="collections" class="w-full" size="xl" />
        </UFormField>
      </div>

      <ClientOnly>
        <UFormField label="Описание" name="description">
          <UiEditor v-model="state.description" :disabled="isLoading" />
        </UFormField>
      </ClientOnly>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Категория" name="categoryId" required>
          <USelect
            v-model="state.categoryId"
            :items="categories"
            value-key="id"
            label-key="name"
            class="w-full"
            :disabled="false"
            size="xl"
          />
        </UFormField>

        <UFormField label="Форма ягоды" name="berryShapes" required>
          <USelect v-model="state.berryShape" :items="berryShapes" class="w-full" size="xl" />
        </UFormField>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <UFormField label="Срок созревания" name="maturationPeriod" required>
          <USelect v-model="state.maturationPeriod" :items="ripeningPeriods" class="w-full" size="xl" />
        </UFormField>

        <UFormField label="Цвет" name="color" required>
          <USelect v-model="state.color" :items="colors" class="w-full" size="xl" />
        </UFormField>

        <UFormField label="Вкус" name="taste" required>
          <USelect v-model="state.taste" :items="flavors" class="w-full" size="xl" />
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Цена за черенок" name="cuttingPrice" required>
          <UInput v-model="state.cuttingPrice" class="w-full" size="xl" />
        </UFormField>

        <UFormField label="Цена за саженец" name="seedlingPrice" required>
          <UInput v-model="state.seedlingPrice" class="w-full" size="xl" />
        </UFormField>
      </div>

      <UFormField label="Черенков в наличии" name="seedlingPrice" required>
        <UInputNumber v-model="state.cuttingInStock" :min="0" />
      </UFormField>
      <UFormField label="Саженцев в наличии" name="seedlingPrice" required>
        <UInputNumber v-model="state.seedlingInStock" :min="0" />
      </UFormField>

      <div v-if="product?.images" class="text-sm">
        <span class="block font-medium text-default">Загруженные изображения</span>
        <div class="grid grid-cols-3 gap-4">
          <UCard
            v-for="image in product.images"
            :key="image.id"
            class="w-full mt-1"
            variant="outline"
            :ui="{ footer: ['text-right'] }"
          >
            <template #footer>
              <UButton
                icon="i-lucide-x"
                size="md"
                color="neutral"
                variant="solid"
                @click="deleteImage(product.id, image.id)"
                :loading="isLoading"
                >Удалить</UButton
              >
            </template>
            <img :src="image.url" alt="" class="object-cover w-full aspect-square" data-not-lazy />
          </UCard>
        </div>
      </div>

      <div class="text-sm">
        <span class="block font-medium text-default">Добавить изображения</span>
        <UiFile id="images" v-model="productImages" :max-size="5" multiple name="images" class="mt-1" />
      </div>
      <UButton :loading="isSending" size="xl" type="submit" color="neutral">
        <span v-text="isUpdate ? 'Обновить' : 'Создать'"></span>
      </UButton>
    </UForm>
    <template #footer> </template>
  </UCard>
</template>

<style scoped>
.card {
  color: #0f172b;
}
</style>

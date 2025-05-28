<script setup lang="ts">
import type { Article } from '@/types'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { generateSlug } from '@/core/utils/generateSlug.ts'

interface Props {
  article?: Article.Model
  title?: string
  isUpdate?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'refresh'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Статья',
  isUpdate: false,
  loading: false
})

const emit = defineEmits<Emits>()

const { article: articleService, upload: uploadService } = useServices()
const router = useRouter()

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  content: z.string().min(1, 'Обязательное поле'),
  slug: z.string().min(1, 'Обязательное поле'),
  categoryId: z.number(),
  published: z.boolean().default(false)
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  title: props.article?.title || '',
  content: props.article?.content || '',
  slug: props.article?.slug || '',
  categoryId: props.article?.categoryId || -1,
  published: props.article?.published || false
})

const isLoading = ref<boolean>(false)
const isSending = ref<boolean>(false)
const isImageEdit = ref<boolean>(false)
const isSlugEdit = ref<boolean>(false)
const image = ref<File[]>([])

const { data: categories, status: categoriesStatus } = await useLazyAsyncData(
  'article-categories',
  () => articleService.getArticlesCategories(),
  { default: () => [] }
)

const uploadFile = async (): Promise<string> => {
  isSending.value = true
  try {
    const [file] = image.value
    const errorText = `При загрузке файла ${file?.name} произошла ошибка. `
    const formData = new FormData()
    formData.set('file', file)

    const { url } = await uploadService.uploadFile(formData, 'articles')
    if (!url) {
      throw new Error(errorText)
    }

    return url
  } finally {
    isSending.value = false
  }
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  try {
    const imageUrl = !props.isUpdate || isImageEdit.value ? await uploadFile() : props.article?.imageUrl
    const data = {
      ...event.data,
      imageUrl
    } satisfies Article.UpdateDto
    if (props.isUpdate && props.article) {
      await articleService.updateArticle(props.article.id.toString(), data)
      emit('refresh')
    } else {
      await articleService.createArticle(data)
      await router.push('/articles')
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => state.title,
  (value) => {
    if (value && !isSlugEdit.value) {
      state.slug = generateSlug(value)
    }
  }
)
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-semibold">{{ title }}</h2>
    </template>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit" :disabled="isSending">
      <UFormField label="Заголовок" name="title" required>
        <UInput v-model="state.title" placeholder="Введите заголовок статьи" class="w-full" size="xl" />
      </UFormField>

      <UFormField label="Слаг" name="slug" required>
        <div class="flex gap-4">
          <UInput
            v-model="state.slug"
            placeholder="Заголовок статьи, которое будет отображаться в адресной строке"
            :disabled="!isSlugEdit"
            class="w-full"
            size="xl"
          />
          <UButton
            icon="i-lucide-edit"
            size="md"
            class="shrink-0"
            color="neutral"
            variant="outline"
            @click="isSlugEdit = true"
            :loading="isLoading"
            >Ввести вручную</UButton
          >
        </div>
      </UFormField>
      <UFormField label="Категория" name="categoryId">
        <USelect
          v-model="state.categoryId"
          :loading="categoriesStatus === 'pending'"
          :items="categories"
          placeholder="Выберите категорию"
          value-key="id"
          label-key="name"
          class="w-full"
          size="xl"
        />
      </UFormField>

      <div class="text-sm">
        <span class="block font-medium text-default">Изображение статьи</span>
        <UCard
          v-if="article?.imageUrl && !isImageEdit"
          class="w-full mt-1 aspect-video relative overflow-hidden rounded-3xl"
          variant="outline"
          :ui="{ body: ['sm:p-0', 'p-0'] }"
        >
          <img :src="article.imageUrl" alt="" class="object-cover w-full h-full" data-not-lazy />
          <UButton
            icon="i-lucide-edit"
            size="md"
            class="absolute top-4 right-4"
            color="neutral"
            variant="solid"
            @click="isImageEdit = true"
            :loading="isLoading"
            >Изменить</UButton
          >
        </UCard>
        <UiFile v-else id="image" v-model="image" :max-size="5" name="image" class="mt-1" />
      </div>

      <ClientOnly>
        <UFormField label="Содержание" name="content" required>
          <UiEditor v-model="state.content" :disabled="isLoading" has-image />
        </UFormField>
      </ClientOnly>

      <UFormField name="published">
        <UCheckbox v-model="state.published" label="Опубликовать статью" />
      </UFormField>

      <div class="flex gap-4">
        <UButton type="submit" :loading="isLoading || loading">
          {{ isUpdate ? 'Обновить' : 'Создать' }}
        </UButton>
        <UButton variant="outline" @click="router.push('/articles')"> Отмена </UButton>
      </div>
    </UForm>
  </UCard>
</template>

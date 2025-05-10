<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

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
  images: z.array(z.string()),
})

type Schema = z.output<typeof schema>
const { user: userService } = useServices()

const router = useRouter()
const route = useRoute()
const fromUrl = computed<string>(() => (route?.query?.from as string) ?? '/')

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
async function onSubmit(event: FormSubmitEvent<Schema>) {

  console.log(event.data)
}
</script>

<template>
  <ProductForm />
</template>


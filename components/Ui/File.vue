<script setup lang="ts">
type FileObject = {
  name: string
  size: number
  type: string
  fileExtension: string
  url: string
  id: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: File[]
    id: string
    name: string
    accept?: string
    maxSize?: number
    multiple?: boolean
  }>(),
  {
    modelValue: () => [],
    id: '',
    name: '',
    accept: '.jpg, .jpeg, .png, .webp',
    maxSize: 1,
    multiple: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
}>()

const model = computed<File[]>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const uploadReady = ref<boolean>(true)
const errors = ref<string[]>([])
const chosenFiles = reactive<File[]>([])
const files = ref<FileObject[]>([])
const inputElement = useTemplateRef<HTMLInputElement>('input-file')
const isDragActive = ref<boolean>(false)
const inActiveTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const getFileType = computed<string>(() => {
  return (
    props.accept
      ?.split(', ')
      .map((ext) => ext.slice(1))
      .join(' / ') || ''
  )
})

const isFileSizeValid = (fileSize: number): void => {
  if (fileSize > props.maxSize) {
    errors.value.push(`Размер файла не должен превышать ${props.maxSize} Мб`)
  }
}

const isFileTypeValid = (fileExtension: string): void => {
  const filesType = props.accept.split(', ').map((index) => index.replace(/^./, ''))
  if (!filesType.includes(fileExtension)) {
    errors.value.push(`Тип файла должен быть одним из: ${props.accept}`)
  }
}

const isFileValid = (file: File): boolean => {
  if (!file) return false
  isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100)
  isFileTypeValid(file.name.split('.').pop() ?? '')
  return errors.value.length === 0
}

const createFileObject = (file: File): FileObject => ({
  name: file.name.split('.').shift() || '',
  fileExtension: file.name.split('.').pop() || '',
  size: Math.round((file.size / 1024) * 100) / 100,
  url: URL.createObjectURL(file),
  type: file.type,
  id: `${file.name}-${file.size}-${file.lastModified}-${file.type}`
})

const handleFileChange = (event: Event | DragEvent) => {
  const uploadFiles: FileList | null =
    'dataTransfer' in event ? event.dataTransfer?.files || null : (event.target as HTMLInputElement)?.files || null

  if (!uploadFiles) return

  // if (!props.multiple) {
  //   files.value = []
  //   chosenFiles.length = 0
  // }

  errors.value = []

  Array.from(uploadFiles).forEach((file) => {
    if (!isFileValid(file)) return

    const fileObj: FileObject = createFileObject(file)
    if (files.value.some(({ id }) => id === fileObj.id)) {
      errors.value.push('Данный файл уже был загружен')
      return
    }

    files.value.push(fileObj)
    chosenFiles.push(file)
  })
  model.value = chosenFiles
}

const clearInputElement = () => {
  if (inputElement.value) {
    inputElement.value.value = ''
  }
}

const removeFile = (index: number) => {
  clearInputElement()
  files.value.splice(index, 1)
  chosenFiles.splice(index, 1)
}

const resetFileInput = async (): Promise<void> => {
  chosenFiles.splice(0)
  files.value.splice(0)
  errors.value = []
  uploadReady.value = false
  await nextTick()
  uploadReady.value = true
  if (inputElement.value) inputElement.value.value = ''
}

const setDragActive = (): void => {
  isDragActive.value = true
  clearTimeout(inActiveTimeout.value as unknown as number)
  inActiveTimeout.value = null
}

const setDragInactive = (): void => {
  inActiveTimeout.value = setTimeout(() => {
    isDragActive.value = false
  }, 50)
}

const onDrop = (event: DragEvent) => {
  const files = event.dataTransfer ? event.dataTransfer.files : null
  const allowDrop = props.multiple || (files && files.length === 1)

  if (allowDrop) {
    handleFileChange(event)
  }
  setDragInactive()
}

defineExpose({ resetFileInput })
</script>

<template>
  <div
    class="flex flex-col"
    @dragenter.prevent.stop="setDragActive"
    @dragover.prevent.stop="setDragActive"
    @dragleave="setDragInactive"
    @drop.prevent.stop="onDrop"
  >
    <div class="relative overflow-hidden h-48 rounded-3xl">
      <input
        :id="id"
        ref="input-file"
        type="file"
        :multiple="multiple"
        class="sr-only"
        :name="name"
        :accept="accept"
        @change="handleFileChange"
      />
      <label
        :for="id"
        :class="[
          'w-full h-full flex items-center justify-center p-8 cursor-pointer border-4 rounded-3xl transition-colors',
          isDragActive
            ? 'border-dashed border-white text-white'
            : 'border-transparent bg-muted text-muted-foreground hover:border-white'
        ]"
      >
        <span class="flex flex-col items-center transition-colors">
          <UIcon name="i-lucide-image-up" class="size-10 mb-2" />
          <span v-if="!multiple" class="text-base mb-2">Перетяните файл сюда или просто нажмите</span>
          <span v-if="multiple" class="text-base mb-2">Перетяните / выберите один или несколько файлов</span>
          <span class="text-xs leading-tight">Формат файла: {{ getFileType }}</span>
          <span class="text-xs leading-tight">Размер файла: до {{ maxSize }} Мб</span>
        </span>
      </label>
    </div>

    <div v-if="errors.length > 0" class="mt-4 flex flex-col gap-1 text-destructive">
      <span v-for="error in errors" :key="error">{{ error }}</span>
    </div>

    <ul v-if="files.length" class="mt-8 pt-8 border-t border-muted-foreground/40 list-none">
      <li
        v-for="(file, index) in files"
        :key="file.id"
        class="pt-6 mt-6 border-t border-muted-foreground/40 first:mt-0 first:pt-0 first:border-t-0"
      >
        <div class="flex items-center relative rounded-xl">
          <div class="h-28 w-24 flex justify-center items-center overflow-hidden rounded-lg">
            <img :src="file.url" alt="" class="object-cover h-full w-full" data-not-lazy />
          </div>

          <div class="flex flex-col ml-8">
            <span class="text-white text-sm mt-4">{{ `${file.name}.${file.fileExtension}` }}</span>
            <span class="text-white text-sm">{{ `${file.size} KB` }}</span>
          </div>

          <button
            class="ml-auto h-10 w-10 flex items-center justify-center rounded-full text-destructive transition-opacity hover:opacity-70 cursor-pointer"
            type="button"
            aria-label="Очистить файл"
            @click="removeFile(index)"
          >
            <UIcon name="i-lucide-x" class="size-7" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

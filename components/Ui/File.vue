<script setup lang="ts">
import { useTemplateRef } from 'vue'

type FileObject = {
  name: string
  size: number
  type: string
  fileExtension: string
  url: string
  id: string
}

const props = withDefaults(defineProps<{
  modelValue?: File[]
  id: string
  name: string
  accept?: string
  maxSize?: number
  multiple?: boolean
}>(), {
  modelValue: () => [],
  id: '',
  name: '',
  accept: '.jpg, .png, .pdf',
  maxSize: 1,
  multiple: false
})

// NOTE: я так и не понял как эту хеработу типизировать!
const model = defineModel<File[] | null>('modelValue', { default: null })

// NOTE: объявляю рефы
const uploadReady = ref<boolean>(true)
const errors = ref<string[]>([])
const choosenFiles = reactive<File[]>([])
const files = ref<FileObject[]>([])
const inputElement = useTemplateRef<HTMLInputElement>('input-file')
const isDragActive = ref<boolean>(false)
const inActiveTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

// NOTE: Тут computed'ы
const getFileType = computed<string>(() => {
  return (
    props.accept
      ?.split(', ')
      .map((ext) => ext.slice(1))
      .join(' / ') || ''
  )
})

// const getFileIcon = (file: FileObject): string => {
//   if (!file.fileExtension) {
//     return 'icon-img-default'
//   }
//
//   // NOTE: Вот тут нужен твой совет и помощь) Хотел как то красиво сделать через enum, но не уверен уместен ли он тут
//   const extension = file.fileExtension.toUpperCase() as keyof typeof FileTypes.Image
//   return FileTypes.Image[extension] || 'icon-img-default'
// }

// NOTE: Ниже три функции не стал делать computed вроде как это не нужно, но могу ошибаться, поправь если не так)

// NOTE: тут происходит просто пуш в массив ошибок, если они есть, и если я правильно понял, то для этого не нужно computed
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

// NOTE: Общая валидация файлов
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

  if (!props.multiple) {
    files.value = []
    choosenFiles.length = 0
  }

  errors.value = []
  // choosenFiles.splice(0, choosenFiles.length, ...choosenFiles)
  // Array.prototype.forEach.apply(uploadFiles, () => {
  //
  // })

  Array.from(uploadFiles).forEach((file) => {
    if (!isFileValid(file)) return

    const fileObj: FileObject = createFileObject(file)
    if (files.value.some(({ id }) => id === fileObj.id)) {
      errors.value.push('Данный файл уже был загружен')
      return
    }

    files.value.push(fileObj)
    choosenFiles.push(file)
  })
  model.value = choosenFiles
}

const clearInputElement = () => {
  if (inputElement.value) {
    inputElement.value.value = ''
  }
}

const removeFile = (index: number) => {
  clearInputElement()
  files.value.splice(index, 1)
  choosenFiles.splice(index, 1)
}

// NOTE: Осталась старая функция, пока не придумал как очищать поля при отправки формы
const resetFileInput = async (): Promise<void> => {
  choosenFiles.splice(0)
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

// watch(
//   () => props.modelValue,
//   (newValue: File[]) => {
//     if (!newValue.length) {
//       console.log(newValue)
//     }
//   }
// )
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

          <!-- <div v-if="!file.isImage" class="h-28 w-24 flex items-center justify-center bg-muted rounded-lg">
            <BaseIconT :name="getFileIcon(file)" class="h-28" />
          </div> -->

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


<!--<style scoped lang="scss">-->
<!--$color-default-black: #000;-->
<!--$color-default-white: #fff;-->
<!--$color-transparent: rgb(255 255 255 / 0%);-->
<!--$color-light-perp: #292d3e;-->
<!--$color-light-perp-soft: #596287;-->
<!--$color-error: #F97583;-->
<!--$transition: 0.3s ease;-->

<!--.custom-file {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->

<!--  $root: &;-->

<!--  &__field {-->
<!--    //@include focus {-->
<!--    //  + #{$root}__label {-->
<!--    //    border-color: $color-default-white;-->
<!--    //    background-color: #292d3e;-->
<!--    //-->
<!--    //    #{$root}__initial {-->
<!--    //      color: #fff;-->
<!--    //    }-->
<!--    //  }-->
<!--    //}-->
<!--  }-->

<!--  &__wrapper {-->
<!--    position: relative;-->
<!--    border-radius: 1.5rem;-->
<!--    overflow: hidden;-->
<!--    height: 12rem;-->
<!--  }-->

<!--  &__label {-->
<!--    background-color: #a3a3a3;-->
<!--    width: 100%;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    justify-content: center;-->
<!--    border: 0.3rem solid $color-transparent;-->
<!--    padding: 2rem 1rem;-->
<!--    cursor: pointer;-->
<!--    height: 100%;-->
<!--    border-radius: 1.5rem;-->
<!--    transition: border-color $transition, background-color $transition;-->

<!--    //@include hover {-->
<!--    //  border-color: $color-default-white;-->
<!--    //  //background-color: #292d3e;-->
<!--    //-->
<!--    //  #{$root}__initial {-->
<!--    //    color: #fff;-->
<!--    //  }-->
<!--    //}-->

<!--    &.is-drag {-->
<!--      border: 0.3em dashed $color-default-white;-->

<!--      #{$root}__initial {-->
<!--        color: #fff;-->
<!--      }-->

<!--      //@include hover {-->
<!--      //  border-color: $color-transparent;-->
<!--      //  background-color: #a3a3a3;-->
<!--      //}-->
<!--    }-->
<!--  }-->

<!--  &__initial {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    align-items: center;-->
<!--    color: #363636;-->
<!--    transition: color $transition;-->
<!--  }-->

<!--  &__icon {-->
<!--    height: 2rem;-->
<!--    width: 2rem;-->
<!--    margin: 0 0 0.5rem;-->
<!--  }-->

<!--  &__text {-->
<!--    font-size: 1.6rem;-->
<!--    line-height: 1;-->
<!--    margin: 0 0 1rem;-->
<!--  }-->

<!--  &__note {-->
<!--    font-size: 1rem;-->
<!--    line-height: 1.2rem;-->
<!--  }-->

<!--  &__result-list {-->
<!--    margin: 2rem 0 0;-->
<!--    padding: 2rem 0 0;-->
<!--    list-style: none;-->
<!--    border-top: 3px solid $color-light-perp-soft;-->
<!--  }-->

<!--  &__result-item {-->
<!--    &:not(:first-child) {-->
<!--      margin: 1.5rem 0 0;-->
<!--      padding: 1.5rem 0 0;-->
<!--      border-top: 2px solid $color-light-perp-soft;-->
<!--    }-->
<!--  }-->

<!--  &__result {-->
<!--    border-radius: 1rem;-->
<!--    position: relative;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--  }-->

<!--  &__result-box {-->
<!--    height: 7rem;-->
<!--    width: 6rem;-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--    border-radius: 10px;-->
<!--    overflow: hidden;-->

<!--    img {-->
<!--      height: 100%;-->
<!--      width: 100%;-->
<!--      object-fit: cover;-->
<!--    }-->
<!--  }-->

<!--  &__result-icon {-->
<!--    height: 7rem;-->
<!--    width: auto;-->
<!--    background-color: $color-light-perp;-->
<!--  }-->

<!--  &__info {-->
<!--    margin: 0 0 0 2rem;-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--  }-->

<!--  &__delete {-->
<!--    margin: 0 0 0 auto;-->
<!--    padding: 0;-->
<!--    border: none;-->
<!--    background-color: $color-transparent;-->
<!--    height: 2.5rem;-->
<!--    width: 2.5rem;-->
<!--    border-radius: 50%;-->
<!--    transition: opacity $transition;-->
<!--    cursor: pointer;-->
<!--    color: $color-error;-->

<!--    //@include hover-focus {-->
<!--    //  outline: none;-->
<!--    //  opacity: 0.7;-->
<!--    //}-->
<!--  }-->

<!--  &__file-name {-->
<!--    margin: 1rem 0 0;-->
<!--    color: $color-default-white;-->
<!--    font-size: 1.4rem;-->
<!--    line-height: 1;-->
<!--  }-->

<!--  &__errors {-->
<!--    display: flex;-->
<!--    gap: 0.5rem;-->
<!--    flex-direction: column;-->
<!--    margin: 1rem 0 0;-->
<!--    color: $color-error;-->
<!--  }-->
<!--}-->
<!--</style>-->

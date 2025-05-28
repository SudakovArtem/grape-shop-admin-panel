<script setup lang="ts">
type Props = {
  folder?: string
}

const props = withDefaults(defineProps<Props>(), {
  folder: 'articles'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', value: string): void
}>()

const { upload: uploadService } = useServices()
const toast = useToast()

const images = ref<File[]>([])
const isSending = ref<boolean>(false)

const uploadFile = async (): Promise<void> => {
  isSending.value = true
  try {
    const [file] = images.value
    const errorText = `При загрузке файла ${file?.name} произошла ошибка. `
    const formData = new FormData()
    formData.set('file', file)

    const { url } = await uploadService.uploadFile(formData, props.folder)
    if (!url) {
      toast.add({ title: 'Error', description: errorText, color: 'error' })
    }

    emit('add', url)
    emit('close')
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <UModal :close="{ onClick: () => emit('close') }" title="Добавить изображение">
    <template #body>
      <UiFile id="editor-images" v-model="images" :max-size="5" name="editor-images" />
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Отменить" @click="emit('close')" />
        <UButton label="Добавить" @click="uploadFile" :disabled="!images.length" :loading="isSending" />
      </div>
    </template>
  </UModal>
</template>

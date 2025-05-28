<template>
  <div class="editor-container">
    <div class="editor-toolbar flex items-center gap-4 flex-wrap mb-4">
      <UButtonGroup>
        <UTooltip text="Отменить">
          <UButton
            :color="'neutral'"
            variant="outline"
            icon="i-ri-arrow-go-back-line"
            @click="editor?.chain().focus().undo().run()"
            :disabled="!editor?.can().chain().focus().undo().run()"
          >
          </UButton>
        </UTooltip>
        <UTooltip text="Повторить"
          ><UButton
            :color="'neutral'"
            variant="outline"
            icon="i-ri-arrow-go-forward-line"
            @click="editor?.chain().focus().redo().run()"
            :disabled="!editor?.can().chain().focus().redo().run()"
          >
          </UButton
        ></UTooltip>
      </UButtonGroup>
      <UButtonGroup>
        <UTooltip text="Полужирный"
          ><UButton
            :color="editor?.isActive('bold') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-bold"
            @click="editor?.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor?.isActive('bold') }"
            class="toolbar-button"
          />
        </UTooltip>
        <UTooltip text="Курсив"
          ><UButton
            :color="editor?.isActive('italic') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-italic"
            @click="editor?.chain().focus().toggleItalic().run()"
            class="toolbar-button"
          />
        </UTooltip>
        <UTooltip text="Зачеркнутый">
          <UButton
            :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-strikethrough"
            @click="editor?.chain().focus().toggleStrike().run()"
            class="toolbar-button"
          />
        </UTooltip>
        <UTooltip text="Подчеркнутый"
          ><UButton
            :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-underline"
            @click="editor?.chain().focus().toggleUnderline().run()"
            class="toolbar-button"
          />
        </UTooltip>
      </UButtonGroup>
      <UDropdownMenu :items="items" :content="{ align: 'start' }" :ui="{ content: 'w-48' }">
        <UTooltip text="Выбрать стиль текста">
          <UButton
            variant="outline"
            color="neutral"
            :icon="textTypeIcon"
            trailing-icon="i-ri-arrow-down-s-line"
            :ui="{ base: 'gap-0', trailingIcon: 'size-3' }"
          />
        </UTooltip>
      </UDropdownMenu>
      <UButtonGroup>
        <UTooltip text="Left">
          <UButton
            :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-align-left"
            @click="editor?.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }"
          >
          </UButton>
        </UTooltip>
        <UTooltip text="Center">
          <UButton
            :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-align-center"
            @click="editor?.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }"
          >
          </UButton>
        </UTooltip>
        <UTooltip text="Right">
          <UButton
            :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-align-right"
            @click="editor?.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }"
          >
          </UButton>
        </UTooltip>
        <UTooltip text="Justify">
          <UButton
            :color="editor?.isActive('strike') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-align-justify"
            @click="editor?.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor?.isActive({ textAlign: 'justify' }) }"
          >
          </UButton>
        </UTooltip>
      </UButtonGroup>
      <UButtonGroup>
        <UTooltip text="Маркированный список"
          ><UButton
            :color="editor?.isActive('bulletList') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-list-unordered"
            @click="editor?.chain().focus().toggleBulletList().run()"
          >
          </UButton
        ></UTooltip>
        <UTooltip text="Нумерованный список"
          ><UButton
            :color="editor?.isActive('orderedList') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-list-ordered"
            @click="editor?.chain().focus().toggleOrderedList().run()"
          >
          </UButton
        ></UTooltip>
        <UTooltip text="Блок кода"
          ><UButton
            :color="editor?.isActive('codeBlock') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-code-block"
            @click="editor?.chain().focus().toggleCodeBlock().run()"
          >
          </UButton
        ></UTooltip>
        <UTooltip :text="editor?.isActive('link') ? 'Удалить ссылку' : 'Добавить ссылку'">
          <UButton
            :color="'neutral'"
            variant="outline"
            :icon="editor?.isActive('link') ? 'i-ri-link-unlink' : 'i-ri-link'"
            @click="toggleLink(!!editor?.isActive('link'))"
            :class="{ 'is-active': editor?.isActive('link') }"
          />
        </UTooltip>
        <UTooltip text="Цитата"
          ><UButton
            :color="editor?.isActive('blockquote') ? 'primary' : 'neutral'"
            variant="outline"
            icon="i-ri-quote-text"
            @click="editor?.chain().focus().toggleBlockquote().run()"
          >
          </UButton
        ></UTooltip>
        <UTooltip text="Разделитель"
          ><UButton
            :color="'neutral'"
            variant="outline"
            @click="editor?.chain().focus().setHorizontalRule().run()"
            icon="i-ri-separator"
          >
          </UButton
        ></UTooltip>
        <UTooltip text="Перенос строки"
          ><UButton
            :color="'neutral'"
            variant="outline"
            @click="editor?.chain().focus().setHardBreak().run()"
            icon="i-ri-text-wrap"
          >
          </UButton
        ></UTooltip>
      </UButtonGroup>
      <UTooltip text="Insert table"
        ><UButton
          :color="'neutral'"
          icon="i-ri-table-view"
          variant="outline"
          @click="editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
        >
        </UButton
      ></UTooltip>
      <UTooltip text="Добавить изображение"
        ><UButton :color="'neutral'" icon="i-ri-image-add-line" variant="outline" @click="addImage">
          Добавить
        </UButton></UTooltip
      >
    </div>
    <UCollapsible :open="editor?.can().deleteTable()">
      <template #content>
        <div class="editor-toolbar flex items-center gap-4 flex-wrap mb-4">
          <UButtonGroup>
            <UTooltip text="Add column before"
              ><UButton
                :color="'neutral'"
                icon="i-ri-insert-column-left"
                variant="outline"
                @click="editor?.chain().focus().addColumnBefore().run()"
                :disabled="!editor?.can().addColumnBefore()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Add column after"
              ><UButton
                :color="'neutral'"
                icon="i-ri-insert-column-right"
                variant="outline"
                @click="editor?.chain().focus().addColumnAfter().run()"
                :disabled="!editor?.can().addColumnAfter()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Delete column"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-delete-column"
                @click="editor?.chain().focus().deleteColumn().run()"
                :disabled="!editor?.can().deleteColumn()"
              >
              </UButton
            ></UTooltip>
          </UButtonGroup>
          <UButtonGroup>
            <UTooltip text="Add row before"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-insert-row-top"
                @click="editor?.chain().focus().addRowBefore().run()"
                :disabled="!editor?.can().addRowBefore()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Add row after"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-insert-row-bottom"
                @click="editor?.chain().focus().addRowAfter().run()"
                :disabled="!editor?.can().addRowAfter()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Delete row"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-delete-row"
                @click="editor?.chain().focus().deleteRow().run()"
                :disabled="!editor?.can().deleteRow()"
              >
              </UButton
            ></UTooltip>
          </UButtonGroup>
          <UButtonGroup>
            <UTooltip text="Merge cells"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri:merge-cells-horizontal"
                @click="editor?.chain().focus().mergeCells().run()"
                :disabled="!editor?.can().mergeCells()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Split cell"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-split-cells-horizontal"
                @click="editor?.chain().focus().splitCell().run()"
                :disabled="!editor?.can().splitCell()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Toggle header column"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-layout-column-fill"
                @click="editor?.chain().focus().toggleHeaderColumn().run()"
                :disabled="!editor?.can().toggleHeaderColumn()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Toggle header row"
              ><UButton
                :color="'neutral'"
                icon="i-ri-layout-row-fill"
                variant="outline"
                @click="editor?.chain().focus().toggleHeaderRow().run()"
                :disabled="!editor?.can().toggleHeaderRow()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Toggle header cell"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-paint-fill"
                @click="editor?.chain().focus().toggleHeaderCell().run()"
                :disabled="!editor?.can().toggleHeaderCell()"
              >
              </UButton
            ></UTooltip>
          </UButtonGroup>
          <UButtonGroup>
            <UTooltip text="Go to next cell"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-contract-right-line"
                @click="editor?.chain().focus().goToNextCell().run()"
                :disabled="!editor?.can().goToNextCell()"
              >
              </UButton
            ></UTooltip>
            <UTooltip text="Go to previous cell"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-contract-left-line"
                @click="editor?.chain().focus().goToPreviousCell().run()"
                :disabled="!editor?.can().goToPreviousCell()"
              >
              </UButton
            ></UTooltip>
          </UButtonGroup>
          <UButtonGroup>
            <UTooltip text="Fix tables"
              ><UButton
                :color="'neutral'"
                variant="outline"
                @click="editor?.chain().focus().fixTables().run()"
                :disabled="!editor?.can().fixTables()"
              >
                Fix
              </UButton></UTooltip
            >
            <UTooltip text="Delete table"
              ><UButton
                :color="'neutral'"
                variant="outline"
                icon="i-ri-delete-back-2-line"
                @click="editor?.chain().focus().deleteTable().run()"
                :disabled="!editor?.can().deleteTable()"
              >
              </UButton
            ></UTooltip>
          </UButtonGroup>
        </div>
      </template>
    </UCollapsible>
    <EditorContent
      :editor="editor"
      class="editor-content rounded-md ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary overflow-hidden"
    />
  </div>
</template>

<script setup lang="ts">
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Editor, EditorContent } from '@tiptap/vue-3'
import type { DropdownMenuItem } from '@nuxt/ui'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Введите описание...',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editor = ref<Editor>()

const textTypeIcon = computed<string>(() => {
  const { level } = editor.value?.getAttributes('heading') ?? { level: 0 }
  if (!level) {
    return 'i-lucide:heading'
  }

  return `i-lucide:heading-${level}`
})

const items = computed(
  () =>
    [
      {
        label: 'Заголовок 1',
        icon: 'i-lucide:heading-1',
        type: 'checkbox' as const,
        checked: editor.value?.isActive('heading', { level: 1 }),
        onUpdateChecked() {
          editor.value?.chain().focus().toggleHeading({ level: 1 }).run()
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      },
      {
        label: 'Заголовок 2',
        icon: 'i-lucide:heading-2',
        type: 'checkbox' as const,
        checked: editor.value?.isActive('heading', { level: 2 }),
        onUpdateChecked() {
          editor.value?.chain().focus().toggleHeading({ level: 2 }).run()
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      },
      {
        label: 'Заголовок 3',
        icon: 'i-lucide:heading-3',
        type: 'checkbox' as const,
        checked: editor.value?.isActive('heading', { level: 3 }),
        onUpdateChecked() {
          editor.value?.chain().focus().toggleHeading({ level: 3 }).run()
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      },
      {
        label: 'Заголовок 4',
        icon: 'i-lucide:heading-4',
        type: 'checkbox' as const,
        checked: editor.value?.isActive('heading', { level: 4 }),
        onUpdateChecked() {
          editor.value?.chain().focus().toggleHeading({ level: 4 }).run()
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      },
      {
        label: 'Заголовок 5',
        icon: 'i-lucide:heading-5',
        type: 'checkbox' as const,
        checked: editor.value?.isActive('heading', { level: 5 }),
        onUpdateChecked() {
          editor.value?.chain().focus().toggleHeading({ level: 5 }).run()
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      },
      {
        label: 'Заголовок 6',
        icon: 'i-mynaui:heading-six',
        type: 'checkbox' as const,
        checked: editor.value?.isActive('heading', { level: 6 }),
        onUpdateChecked() {
          editor.value?.chain().focus().toggleHeading({ level: 6 }).run()
        },
        onSelect(e: Event) {
          e.preventDefault()
        }
      }
    ] satisfies DropdownMenuItem[]
)

const toggleLink = (isLinked: boolean) => {
  if (isLinked) {
    editor.value?.chain().focus().unsetLink().run()
    return
  }

  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  // update link
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
  const url = window.prompt('URL')

  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run()
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue)
    }
  }
)

watch(
  () => props.disabled,
  (disabled) => {
    if (editor.value) {
      editor.value.setEditable(!disabled)
    }
  }
)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
        defaultProtocol: 'https'
      }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm sm:prose-base m-5 focus:outline-none'
      }
    },
    editable: !props.disabled,
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    }
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid var(--ui-border);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: var(--ui-bg-elevated);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: var(--ui-bg-muted);
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--ui-bg-accented);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}
</style>

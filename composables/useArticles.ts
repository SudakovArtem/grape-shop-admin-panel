import type { Article } from '@/types'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import { debounce } from 'lodash'
import { UBadge } from '#components'

interface UseArticlesOptions {
  onSearch?: () => void
  onDelete?: (id: string) => Promise<void>
}

export const useArticles = ({ onSearch, onDelete }: UseArticlesOptions) => {
  const search = ref<string>('')
  const router = useRouter()

  watch(
    search,
    debounce(() => {
      onSearch?.()
    }, 300)
  )

  const getDropdownActions = (article: Article.Model): DropdownMenuItem[][] => [
    [
      {
        label: 'Редактировать',
        icon: 'i-lucide-square-pen',
        onSelect: () => router.push(`/articles/${article.id}`)
      }
    ],
    [
      {
        label: 'Удалить',
        icon: 'i-lucide-trash-2',
        click: () => onDelete?.(article.id.toString())
      }
    ]
  ]

  const columns: TableColumn<Article.Model>[] = [
    { id: 'action' },
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Заголовок' },
    { accessorKey: 'authorName', header: 'Автор' },
    { accessorKey: 'categoryName', header: 'Категория' },
    {
      accessorKey: 'published',
      header: () => h('div', { class: 'text-center' }, 'Опубликовано'),
      cell: ({ row }) => {
        const color = row.getValue('published') ? 'success' : 'error'
        return h(UBadge, { variant: 'subtle', color }, () => (row.getValue('published') ? 'Да' : 'Нет'))
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Дата создания',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'))
        return h('div', {}, date.toLocaleDateString('ru-RU'))
      }
    }
  ]

  return {
    search,
    columns,
    getDropdownActions
  }
}

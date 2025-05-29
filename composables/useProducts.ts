import { debounce } from 'lodash'
import type { Product, Response } from '@/types'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import { UBadge } from '#components'

type Settings = {
  onSearch: () => void
  onDelete: (id: string) => Promise<void>
}

export default (settings: Settings) => {
  const { onDelete, onSearch: onProductSearch } = settings
  const router = useRouter()
  const toast = useToast()
  const {
    constants: { DEFAULT_DEBOUNCE_DELAY }
  } = useConfigs()

  const search = ref<string>('')

  const onSearch = debounce(() => {
    onProductSearch()
  }, DEFAULT_DEBOUNCE_DELAY)

  watch(search, onSearch)

  const getDropdownActions = (product: Product.Model): DropdownMenuItem[][] => [
    [
      {
        label: 'Скопировать Название',
        icon: 'i-lucide-copy',
        onSelect: () => {
          navigator.clipboard.writeText(product.name.toString())
          toast.add({
            title: 'Название скопировано!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Редактировать',
        icon: 'i-lucide-edit',
        onSelect: () => router.push(`/products/${product.id}`)
      },
      {
        label: 'Удалить',
        icon: 'i-lucide-trash',
        color: 'error',
        onSelect: () => onDelete(product.id.toString())
      }
    ]
  ]

  const columns: TableColumn<Product.Model>[] = [
    { id: 'action' },
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Название' },
    { accessorKey: 'berryShape', header: 'Форма' },
    { accessorKey: 'color', header: 'Цвет' },
    { accessorKey: 'taste', header: 'Вкус' },
    {
      accessorKey: 'cuttingInStock',
      header: () => h('div', { class: 'text-center' }, 'Черенок'),
      cell: ({ row }) => {
        const color = row.getValue('cuttingInStock') ? 'success' : 'error'
        return h(UBadge, { variant: 'subtle', color }, () =>
          row.getValue('cuttingInStock') ? 'В наличии' : 'Нет в наличии'
        )
      }
    },
    {
      accessorKey: 'seedlingInStock',
      header: () => h('div', { class: 'text-center' }, 'Саженец'),
      cell: ({ row }) => {
        const color = row.getValue('seedlingInStock') ? 'success' : 'error'
        return h(UBadge, { variant: 'subtle', color }, () =>
          row.getValue('seedlingInStock') ? 'В наличии' : 'Нет в наличии'
        )
      }
    },
    {
      accessorKey: 'cuttingPrice',
      header: () => h('div', { class: 'text-right' }, 'Черенок'),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('cuttingPrice'))
        const formatted = new Intl.NumberFormat('ru', {
          style: 'currency',
          currency: 'RUB'
        }).format(price)
        return h('div', { class: 'text-right font-medium' }, formatted)
      }
    },
    {
      accessorKey: 'seedlingPrice',
      header: () => h('div', { class: 'text-right' }, 'Саженец'),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('seedlingPrice'))
        const formatted = new Intl.NumberFormat('ru', {
          style: 'currency',
          currency: 'RUB'
        }).format(price)
        return h('div', { class: 'text-right font-medium' }, formatted)
      }
    }
  ]

  return {
    search,
    columns,
    getDropdownActions
  }
}

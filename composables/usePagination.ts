import type { PaginationSettings } from '@/types'

const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_SIZE = 10

export default <T>(settings?: PaginationSettings<T>) => {
  const pageNumber = ref<number>(settings?.pageNumber ?? DEFAULT_PAGE_NUMBER)
  const pageSize = ref<number>(settings?.pageSize ?? DEFAULT_PAGE_SIZE)
  const list = ref<T[]>(settings?.list ?? [])
  const totalCount = ref<number>(settings?.total ?? list.value.length)
  const replace = settings?.replace ?? false

  const isMaxItems = computed<boolean>(() => {
    return totalCount.value <= list.value.length
  })

  const loadSettings = computed<PaginationSettings<T>>(() => ({
    ...settings,
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  }))

  const loadList = (items: T[] = [], total = 0) => {
    list.value = pageNumber.value === DEFAULT_PAGE_NUMBER || replace ? items : ([...list.value, ...items] as T[])

    if (total && totalCount.value !== total) {
      totalCount.value = total
    }
  }

  const setPageNumber = (num?: number): void => {
    pageNumber.value = num ?? DEFAULT_PAGE_NUMBER
  }

  const increasePageNumber = (): void => {
    setPageNumber(pageNumber.value + 1)
  }

  return {
    pageNumber,
    pageSize,
    loadSettings,
    totalCount,
    isMaxItems,
    list,
    loadList,
    setPageNumber,
    increasePageNumber
  }
}

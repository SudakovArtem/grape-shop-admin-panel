import type { nuxtContext } from '@nuxt/types'

const constants = {
  // Форма ягоды
  berryShapes: ['Овальная', 'Пальцевидная', 'Удлиненная', 'Яйцевидная', 'Круглая'] as string[],

  // Срок созревания
  ripeningPeriods: ['Ультраранний', 'Очень ранний', 'Ранний', 'Ранне-средний', 'Средний', 'Не указан'] as string[],

  // Цвет
  colors: [
    'Желтый',
    'Красный',
    'Розово-красный',
    'Темно-красный',
    'Темный',
    'Белый',
    'Бело-розовый',
    'Желто-розовый',
    'Розовый'
  ] as string[],

  // Вкус
  flavors: ['Гармоничный', 'Мускатный', 'Легкий мускат', 'Фруктовый'] as string[],

  // Коллекция
  collections: [
    'Основная коллекция',
    'Селекция Голуба А.А.',
    'Селекция Щеренкова В.А.',
    'Селекция Щенникова О.Н.',
    'Селекция Карпушева А.',
    'Киш-мишные сорта',
    'Селекция Калугина В.М.'
  ] as string[],

  DEFAULT_DEBOUNCE_DELAY: 800
} as const

export type Constants = typeof constants

export default (context: nuxtContext) => {
  context.$configs.constants = constants
}

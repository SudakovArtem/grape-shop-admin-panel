<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import Logo from '@img/logo.svg'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Навигация',
      type: 'label'
    },
    {
      label: 'Пользователи',
      icon: 'i-lucide-book-open',
      to: '/users'
    },
    {
      label: 'Продукты',
      icon: 'i-lucide-database',
      to: '/products'
    },
    {
      label: 'Заказы',
      icon: 'i-lucide-box',
      to: '/orders'
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true
    }
  ]
])
</script>

<template>
  <UContainer class="pt-6 pb-6">
    <img class="w-50 mb-4 block" :src="Logo" alt="Logo" />
    <UNavigationMenu :items="items" class="data-[orientation=vertical]:w-48" orientation="vertical" />
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const {
  public: { baseApiUrl }
} = useRuntimeConfig()

const { data: order } = useAsyncData(
  () =>
    $fetch(`${baseApiUrl}/orders/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${useCookie('token').value ?? ''}`
      }
    }),
  {
    default: () => ({})
  }
)
</script>

<template>
  <pre>{{ order }}</pre>
</template>

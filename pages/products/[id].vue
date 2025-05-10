<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const {public: {baseApiUrl}} = useRuntimeConfig()

// const {data: product} = useAsyncData(() =>
//         $fetch(`${baseApiUrl}/products/${id}`, {
//           method: 'GET',
//           headers: {
//             authorization: `Bearer ${useCookie('token').value ?? ''}`
//           }
//         }),
//     {
//       default: () => ({})
//     })
</script>

<template>
  <ProductForm is-update title="Редактирование продукта" />
</template>

<style scoped>

</style>

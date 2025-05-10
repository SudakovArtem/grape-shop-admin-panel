<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const {public: {baseApiUrl}} = useRuntimeConfig()

const {data: user} = useAsyncData(() =>
        $fetch(`${baseApiUrl}/users/${id}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${useCookie('token').value ?? ''}`
          }
        }),
    {
      default: () => ({})
    })
</script>

<template>
<pre>{{ user }}</pre>
</template>

<style scoped>

</style>

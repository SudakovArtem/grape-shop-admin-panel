<script lang="ts" setup>

</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <slot name="header"/>
    </header>
    <main class="relative flex flex-auto">
      <div class="flex-2/12">
        <slot name="aside"/>
      </div>
      <div class="flex-10/12">
        <slot name="content"/>
      </div>
    </main>
    <footer>
      <slot name="footer"/>
    </footer>
  </div>
</template>

<style scoped>

</style>

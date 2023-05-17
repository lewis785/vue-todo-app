<script lang="ts">
import ThemeToggle from './ThemeToggle.vue'

export default {
  components: {
    ThemeToggle
  }
}
</script>

<template>
  <section class="title">
    <h1>TODO</h1>
    <ThemeToggle />
  </section>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: var(--font-large);
    font-weight: 700;
    color: var(--white);
  }
}
</style>

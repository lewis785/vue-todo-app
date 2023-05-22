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
    <h1>T O D O</h1>
    <ThemeToggle />
  </section>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: var(--font-large);
    line-height: 1;
    font-weight: 700;
    color: var(--white);
    vertical-align: middle;
  }
}
</style>

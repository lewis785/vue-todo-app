<script lang="ts">
import Container from '@/components/Container.vue'
import Title from '@/components/Title.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  components: {
    Container,
    Title,
    TodoInput,
    TodoList
  }
}
</script>

<template>
  <main>
    <Title />
    <TodoInput />
    <TodoList />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 540px;
  padding-top: 4.375rem;
  gap: 1.375rem;
}
</style>

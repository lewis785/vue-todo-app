<script setup lang="ts">
import Title from '@/components/Title.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import { defaultTodos } from '@/data/defaultTodo'
import type { Todo } from '@/types/todo.js'
import { ref, watch } from 'vue'

const storedTodos = localStorage.getItem('todos')
const todos = ref<Todo[]>(storedTodos ? JSON.parse(storedTodos) : defaultTodos)

watch(
  todos,
  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },
  { deep: true }
)

const addTodo = (todo: Todo) => {
  todos.value.push(todo)
}

const updateTodo = (todo: Todo) => {
  const index = todos.value.findIndex((t) => t.id === todo.id)
  todos.value[index] = todo
}

const deleteTodo = (todo: Todo) => {
  todos.value = todos.value.filter((t) => t.id !== todo.id)
}

const clearCompletedTodos = () => {
  todos.value = todos.value.filter((t) => !t.completed)
}
</script>

<template>
  <main>
    <Title />
    <TodoInput @add-todo="addTodo" />
    <TodoList
      v-if="todos.length > 0"
      :todos="todos"
      @update="updateTodo"
      @delete="deleteTodo"
      @clear-completed="clearCompletedTodos"
    />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 33.75rem;
  margin-top: 4.375rem;
  gap: 1.375rem;

  @media screen and (max-width: 375px) {
    margin-top: 2.5rem;
    padding-inline: 24px;
  }
}
</style>

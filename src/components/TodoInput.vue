<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'
import type { Todo } from '@/types/todo'
import { uuid } from 'vue-uuid'

const value = ref('')
const isChecked = ref(false)

const emit = defineEmits<{ (event: 'addTodo', todo: Todo): void }>()

const toggleChecked = () => {
  isChecked.value = !isChecked.value
}

const onSubmit = () => {
  emit('addTodo', { id: uuid.v4(), completed: isChecked.value, value: value.value })
  value.value = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Checkbox @clicked="toggleChecked" :is-checked="isChecked" />
    <input
      v-model="value"
      type="text"
      placeholder="Create a new todo..."
      aria-label="todo input field"
    />
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  gap: 1.375rem;
  padding: 1rem;
  background: var(--container);
  font-size: var(--font-regular);
  border-radius: 5px;

  input {
    font-size: var(--font-regular);
    color: var(--text-hover);
    background: transparent;
    border: none;
    width: 100%;
    height: 1.5rem;
    padding: 0;
  }
}
</style>

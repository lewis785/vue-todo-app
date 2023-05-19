<script setup lang="ts">
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

const value = ref('')
const isChecked = ref(false)

const emit = defineEmits(['addTodo'])

const toggleChecked = () => {
  isChecked.value = !isChecked.value
}

const onSubmit = () => {
  emit('addTodo', value.value)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Checkbox @clicked="toggleChecked" :is-checked="isChecked" />
    <input v-model="value" type="text" placeholder="Create a new todo..." />
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
    outline: none;
    width: 100%;
    height: 1.5rem;
    padding: 0;
  }
}
</style>

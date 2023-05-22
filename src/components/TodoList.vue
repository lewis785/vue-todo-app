<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import TodoListItem from './TodoListItem.vue'
import type { Todo } from '@/types/todo'

const props = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true
  }
})

const emit = defineEmits<{
  (event: 'delete', todo: Todo): void
  (event: 'update', todo: Todo): void
}>()

const enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}

const filter = ref(Filter.All)
const updateFilter = (newFilter: Filter) => {
  console.log(newFilter)
  filter.value = newFilter
}

const filteredTodos = computed(() => {
  switch (filter.value) {
    case Filter.Active:
      return props.todos.filter((todo) => !todo.completed)
    case Filter.Completed:
      return props.todos.filter((todo) => todo.completed)
    default:
      return props.todos
  }
})

const itemsLeft = computed(() => {
  return props.todos.filter((todo) => !todo.completed).length
})
</script>

<template>
  <section class="container">
    <TodoListItem
      v-for="todo in filteredTodos"
      :todo="todo"
      @delete="emit('delete', $event)"
      @update="emit('update', $event)"
    />
    <menu class="actions">
      <p>{{ itemsLeft }} item left</p>
      <span>
        <button :aria-selected="filter === Filter.All" @click="() => updateFilter(Filter.All)">
          All
        </button>
        <button
          :aria-selected="filter === Filter.Active"
          @click="() => updateFilter(Filter.Active)"
        >
          Active
        </button>
        <button
          :aria-selected="filter === Filter.Completed"
          @click="() => updateFilter(Filter.Completed)"
        >
          Completed
        </button>
      </span>
      <button>Clear Completed</button>
    </menu>
  </section>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--container);
  border-radius: 5px;
  color: var(--text-hover);
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.375rem;
  color: var(--text-disabled);
  font-size: var(--font-regular);

  span {
    display: flex;
    gap: 1rem;

    @media only screen and (max-width: 375px) {
      display: none;
    }
  }
}

button {
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  color: var(--text-disabled);
  font-size: var(--font-regular);
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: var(--text-hover);
  }
  &[aria-selected='true'] {
    color: var(--text-active);
  }
}
</style>

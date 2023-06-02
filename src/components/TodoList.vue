<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import TodoListItem from './TodoListItem.vue'
import TodoListFooter from './TodoListFooter.vue'
import type { Todo } from '@/types/todo'
import draggable from 'vuedraggable'
import { Filter } from '@/types/enum/filter'

const props = defineProps({
  todos: {
    type: Array as PropType<Todo[]>,
    required: true
  }
})

const emit = defineEmits<{
  (event: 'delete', todo: Todo): void
  (event: 'update', todo: Todo): void
  (event: 'clearCompleted'): void
}>()

const selectedFilter = ref(Filter.All)
const updateSelectedFilter = (newFilter: Filter) => (selectedFilter.value = newFilter)

const filteredTodos = computed(() => {
  switch (selectedFilter.value) {
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
  <section class="container container-shadow">
    <draggable :list="filteredTodos" item-key="id">
      <template #item="{ element }: { element: Todo }">
        <TodoListItem
          :todo="element"
          @delete="emit('delete', $event)"
          @update="emit('update', $event)"
        />
      </template>
      <template #footer>
        <TodoListFooter
          :items-left="itemsLeft"
          :selected-filter="selectedFilter"
          @clear-completed="emit('clearCompleted')"
          @update-filter="updateSelectedFilter"
        />
      </template>
    </draggable>
  </section>

  <menu class="mobile-filter container-shadow">
    <button
      v-for="filter in Object.values(Filter)"
      key="filter"
      :aria-selected="selectedFilter === filter"
      @click="() => updateSelectedFilter(filter)"
      tabindex="0"
    >
      {{ filter }}
    </button>
  </menu>

  <h3 class="drag-info" v-if="selectedFilter === Filter.All">Drag and drop to reorder list</h3>
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

.container-shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.mobile-filter {
  display: none;
  justify-content: space-evenly;
  background: var(--container);
  padding: 1rem 0;
  border-radius: 5px;

  button {
    font-weight: 700;
    text-transform: capitalize;
  }

  @media only screen and (max-width: 375px) {
    display: flex;
  }
}

.drag-info {
  text-align: center;
  color: var(--text-disabled);
  font-size: var(--font-small);
  font-weight: 400;
  margin-top: 1.75rem;
}

button {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  color: var(--text-disabled);
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

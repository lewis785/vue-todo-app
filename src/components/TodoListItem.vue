<script setup lang="ts">
import CrossIcon from '@/icons/CrossIcon.vue'
import Checkbox from './Checkbox.vue'
import type { Todo } from '@/types/todo'
import type { PropType } from 'vue'

const { todo } = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    required: true
  }
})

const emit = defineEmits<{
  (event: 'delete', todo: Todo): void
  (event: 'update', todo: Todo): void
}>()
</script>

<template>
  <article class="item" :data-completed="todo.completed">
    <Checkbox
      :is-checked="todo.completed"
      @clicked="emit('update', { ...todo, completed: !todo.completed })"
    />
    <p>{{ todo.value }}</p>
    <CrossIcon
      class="remove-icon"
      @click="emit('delete', todo)"
      @keydown.space.prevent="emit('delete', todo)"
      tabindex="0"
      role="button"
    />
  </article>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding: 1rem 1.375rem;
  cursor: grab;

  p {
    width: 100%;
  }

  &[data-completed='true'] {
    p {
      text-decoration: line-through;
      color: var(--text-disabled);
    }
  }

  .remove-icon {
    display: none;
    cursor: pointer;
    width: 1.5rem;

    &:hover {
      transition: transform 0.2s ease-in-out;
      transform: scale(1.2);
    }

    @media screen and (max-width: 375px) {
      display: block;
    }
  }

  &:hover {
    .remove-icon {
      display: block;
    }
  }
}
</style>

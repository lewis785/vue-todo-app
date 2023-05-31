<script setup lang="ts">
import { Filter } from '@/types/enum/filter'
import type { PropType } from 'vue'

defineProps({
  itemsLeft: {
    type: Number,
    required: true
  },
  selectedFilter: {
    type: String as PropType<Filter>,
    required: true
  }
})

const emit = defineEmits<{
  (event: 'clearCompleted'): void
  (event: 'updateFilter', filter: Filter): void
}>()
</script>

<template>
  <menu class="footer">
    <p>{{ itemsLeft }} item left</p>
    <span class="filter">
      <button
        v-for="filter in Object.values(Filter)"
        :key="filter"
        :aria-selected="filter === selectedFilter"
        @click="() => emit('updateFilter', filter)"
        tabindex="0"
      >
        {{ filter }}
      </button>
    </span>
    <button @click="emit('clearCompleted')" tabindex="0">Clear Completed</button>
  </menu>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.375rem;
  color: var(--text-disabled);
  font-size: var(--font-small);

  .filter {
    display: flex;
    gap: 1rem;

    button {
      text-transform: capitalize;
      font-weight: 700;
    }

    @media only screen and (max-width: 375px) {
      display: none;
    }
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
}
</style>

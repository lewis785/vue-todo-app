<script setup lang="ts">
import TickIcon from '@/icons/TickIcon.vue'
import { uuid } from 'vue-uuid'
const checkboxId = `checkbox-${uuid.v4()}`

const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <input
    @change="$emit('clicked')"
    value="props.isChecked"
    type="checkbox"
    :id="checkboxId"
    class="checkbox-input"
  />
  <label class="checkbox-label" :for="checkboxId">
    <div class="background" :data-checked="props.isChecked">
      <TickIcon v-if="props.isChecked" />
      <div class="cover" v-if="!props.isChecked" />
    </div>
  </label>
</template>

<style scoped lang="scss">
.checkbox-input {
  display: none;
}

.checkbox-label {
  .background {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--border);
    cursor: pointer;

    &:hover,
    &[data-checked='true'] {
      background: linear-gradient(135deg, hsl(192, 100%, 67%) 0%, hsl(280, 87%, 65%) 100%);
    }
    .cover {
      width: 1.375rem;
      height: 1.375rem;
      border-radius: 50%;
      background: var(--container);
      position: absolute;
      top: 0.0625rem;
      left: 0.0625rem;
    }

    svg {
      position: absolute;
      top: 0.4688rem;
      left: 0.4063rem;
    }
  }
}
</style>

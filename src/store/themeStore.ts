// store.js
import { Theme } from '@/types/enum/theme'
import { reactive } from 'vue'

export const store = reactive({
  theme: Theme.LIGHT
})

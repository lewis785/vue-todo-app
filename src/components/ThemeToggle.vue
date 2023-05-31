<script setup lang="ts">
import MoonIcon from '@/icons/MoonIcon.vue'
import SunIcon from '@/icons/SunIcon.vue'
import { Theme } from '@/types/enum/theme'
import { onMounted } from 'vue'
import { store } from '@/store/themeStore'

onMounted(() => {
  const localTheme = localStorage.getItem('user-theme')

  if (localTheme) {
    store.theme = localTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT
  } else {
    store.theme = getThemePreference()
  }

  setTheme(store.theme)
})

const getThemePreference = () => {
  const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  return hasDarkPreference ? Theme.DARK : Theme.LIGHT
}

const setTheme = (theme: Theme) => {
  const html = document.querySelector('html')
  if (!html) {
    return
  }

  localStorage.setItem('user-theme', theme)
  store.theme = theme

  if (theme === Theme.DARK) {
    return html.classList.add(Theme.DARK)
  }

  html.classList.remove(Theme.DARK)
}

const toggleTheme = () => {
  setTheme(store.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
}
</script>

<template>
  <label
    for="checkbox"
    class="switch-label"
    tabindex="0"
    role="button"
    @keydown.space.prevent="toggleTheme"
  >
    <input
      id="checkbox"
      name="checkbox"
      type="checkbox"
      class="switch-checkbox"
      aria-hidden
      @change="toggleTheme"
    />
    <MoonIcon v-if="store.theme === Theme.LIGHT" />
    <SunIcon v-else />
  </label>
</template>

<style scoped lang="scss">
.switch-checkbox {
  display: none;
}

.switch-label {
  height: 1.625rem;
  border-radius: 50%;
}
</style>

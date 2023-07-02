import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      theme: 'light'
    }
  },
  actions: {
    changeTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
})

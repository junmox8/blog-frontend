import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userId: ''
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserId(userId) {
      this.userId = userId;
    },
  }

})

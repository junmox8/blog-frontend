/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-07 11:10:12
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-22 17:43:54
 * @FilePath: /blog-frontend/blog-frontend/src/stores/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      token: '',
      userId: ''
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setUserId(userId) {
      this.userId = userId
    }
  }
})

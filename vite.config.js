/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-07 10:48:09
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-27 21:29:03
 * @FilePath: /blog-frontend/blog-frontend/vite.config.js
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import postcssPxToViewport from 'postcss-px-to-viewport'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@service': fileURLToPath(new URL('./src/axios/service/', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      },
      '/bgc': {
        target: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN',
        changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/bgc': '' // 替换成target中的地址
        }
      },
      '/word': {
        target: 'http://open.iciba.com/dsapi/',
        changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/word': '' // 替换成target中的地址
        }
      }
    },
    host: true
  },
  css: {
    postcss: {
      plugins: [
        // viewport 布局适配
        postcssPxToViewport({
          viewportWidth: 1440
        })
      ]
    }
  }
})

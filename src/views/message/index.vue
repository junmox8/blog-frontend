<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-29 11:39:19
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-29 15:56:15
 * @FilePath: /blog-frontend/blog-frontend/src/views/message/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="['menu-item-container', store.theme]">
    <el-card class="message-card">
      <div class="message-card-barrage"></div>
      <div class="message-card-comment"></div>
    </el-card>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import { formatDate } from '@/utils/date'
const store = useThemeStore()
</script>

<style lang="less" scoped>
.menu-item-container {
  overflow: hidden;
  .message-card {
    width: 80%;
    margin-left: 10%;
    margin-top: 59px;
    margin-bottom: 50px;
    padding: 10px 15px;
    &-barrage {
    }
    &-comment {
    }
  }
}
</style>

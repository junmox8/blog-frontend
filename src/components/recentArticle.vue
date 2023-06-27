<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-20 23:03:16
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-27 21:44:24
 * @FilePath: /blog-frontend/blog-frontend/src/components/recentArticle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="recent-article-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="timestamp">
      {{ createdAt }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/date'
const props = defineProps({
  title: {
    type: String
  },
  time: {
    type: String
  },
  id: {
    type: Number
  }
})
const createdAt = computed(() => formatDate(props.time))
</script>

<style lang="less" scoped>
.recent-article-container {
  transition: all 1s;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  height: 55px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #edeced;
  color: #595859;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 58%;
  }

  .timestamp {
    font-size: 12px;
  }
}

.recent-article-container:hover {
  transform: translateY(-10px);
}
</style>

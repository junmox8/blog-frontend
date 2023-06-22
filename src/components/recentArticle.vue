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
    max-width: 60%;
  }

  .timestamp {
    font-size: 12px;
  }
}

.recent-article-container:hover {
  transform: translateY(-10px);
}
</style>

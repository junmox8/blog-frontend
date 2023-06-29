<template>
  <div class="message-container">
    <div class="message-container-content">
      <div class="left">
        <div class="user-info">
          <div class="avatar">
            <img :src="props.User.avatar" />
          </div>
          <div class="name ml5">{{ props.User.name }}</div>
        </div>
        <div class="message">{{ props.content }}</div>
      </div>
      <div class="right">
        <div class="other-info">
          <span class="mr5"> {{ (props.currentPage - 1) * 5 + props.index + 1 }}楼</span>
          <span></span>
        </div>
        <div class="link"></div>
      </div>
    </div>
    <div class="message-container-reply"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps([
  'MessageAttaches',
  'User',
  'content',
  'createdAt',
  'id',
  'currentPage',
  'index'
])
onMounted(() => {
  console.log(props)
})
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  border-bottom: 1px solid #c4c3c4;
  padding-top: 10px;
  &-content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      .user-info {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;

        .avatar {
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .name {
          color: #e55e18;
          font-size: 14px;
          font-weight: 600;
          max-width: 60vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .message {
        margin-left: 35px;
        max-width: 40vw;
        word-break: break-all;
        word-wrap: break-word;
        font-size: 14px;
      }
    }
    .right {
      .other-info {
        display: flex;
        font-size: 14px;
      }
    }
  }
  &-reply {
  }
}
</style>

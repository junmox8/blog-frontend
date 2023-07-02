<template>
  <div class="reply-container">
    <div class="top">
      <div class="user-info">
        <div class="from-user-info">
          <div class="avatar">
            <img :src="props.fromUser?.avatar || ''" />
          </div>
          <div class="name ml5">{{ props.fromUser?.name || '' }}</div>
        </div>
        <span class="response-text">回复</span>
        <div class="to-user-info">
          <div class="avatar">
            <img :src="props.toUser?.avatar || ''" />
          </div>
          <div class="name ml5">{{ props.toUser?.name || '' }}</div>
        </div>
      </div>
      <div class="other-info">
        <span class="created-time">{{ formatDate(props.createdAt) }}</span>
      </div>
    </div>
    <div class="bottom">
      <div class="message">{{ props.content }}</div>
      <div class="link">
        <a @click="handleReply" class="mr5" href="javascript:;">回复</a>
        <a @click="handleDeleteReply(props.id)" href="javascript:;">删除</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/date'
const props = defineProps(['content', 'createdAt', 'fromUser', 'toUser', 'id', 'fromUserId'])
const emits = defineEmits(['deleteReply', 'sendMessageReply'])
onMounted(() => {})
const handleReply = async () => {
  ElMessageBox.prompt('请输入回复内容', 'Tip', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^.{1,30}$/,
    inputErrorMessage: '请输入1-30个字符'
  }).then(async ({ value: content }) => {
    const config = {
      content,
      toUserId: props.fromUserId
    }
    emits('sendMessageReply', config)
  })
}
const handleDeleteReply = (id) => {
  ElMessageBox.confirm('确定要删除此回复吗', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    emits('deleteReply', id)
  })
}
</script>

<style lang="less" scoped>
.reply-container {
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
  .top {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    .user-info {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .from-user-info,
      .to-user-info {
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
      .response-text {
        font-size: 13px;
        margin: 0 10px;
      }
    }
    .other-info {
      font-size: 14px;
      float: right;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .message {
      margin-left: 35px;
      max-width: 40vw;
      word-break: break-all;
      word-wrap: break-word;
      font-size: 14px;
    }
    .link {
      display: flex;
      align-items: center;
      align-self: flex-end;
      a {
        text-decoration: none;
        font-size: 13px;
        color: #8fc4f7;
      }
    }
  }
}
</style>

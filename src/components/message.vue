<template>
  <div class="message-container">
    <div class="message-container-content">
      <div class="top">
        <div class="user-info">
          <div class="avatar">
            <img :src="props.User.avatar" />
          </div>
          <div class="name ml5">{{ props.User.name }}</div>
        </div>
        <div class="other-info">
          <span class="floor-number"> {{ (props.currentPage - 1) * 5 + props.index + 1 }}楼</span>
          <span class="created-time">{{ formatDate(props.createdAt) }}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="message">{{ props.content }}</div>
        <div class="link">
          <a @click="handleReplyMessage(props.id)" class="mr5" href="javascript:;">回复</a>
          <a @click="handleDeleteMessage(props.id)" href="javascript:;">删除</a>
        </div>
      </div>
    </div>
    <div class="message-container-reply">
      <el-skeleton v-show="isLoading" :rows="3" />
      <MessageReply
        @sendMessageReply="sendMessageReply"
        @deleteReply="_deleteReply"
        v-for="reply in replyList"
        :key="reply.id"
        v-bind="reply"
      ></MessageReply>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatDate } from '@/utils/date'
import { handUpMessageReply, deleteReply, fetchTheMessageReplies } from '@/axios/service/message'
import MessageReply from '@/components/messageReply.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps([
  'MessageAttaches',
  'User',
  'content',
  'createdAt',
  'id',
  'currentPage',
  'index'
])
const emits = defineEmits(['deleteMessage', 'update:MessageAttaches'])
const isLoading = ref(false) //等待replyList加载
const replyList = ref([])
onMounted(() => {
  initReplyList(props.MessageAttaches)
})
const initReplyList = (_replyList) => {
  replyList.value = _replyList
}
const handleDeleteMessage = async (id) => {
  ElMessageBox.confirm('确定要删除此留言吗', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    emits('deleteMessage', id)
  })
}
const handleReplyMessage = (id) => {
  ElMessageBox.prompt('请输入回复内容', 'Tip', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^.{1,30}$/,
    inputErrorMessage: '请输入1-30个字符'
  }).then(async ({ value: content }) => {
    isLoading.value = true
    const config = {
      content,
      toUserId: props.User.id,
      messageId: id
    }
    await handUpMessageReply(config)
    await fetchReplyList(props.id)
    isLoading.value = false
    ElMessage({
      type: 'success',
      message: `回复成功`
    })
  })
}
const _deleteReply = async (replyId) => {
  try {
    isLoading.value = true
    await deleteReply(replyId)
    await fetchReplyList(props.id)
    isLoading.value = false
    ElMessage({
      type: 'success',
      message: '删除留言成功'
    })
  } catch (e) {
    ElMessage({
      type: 'error',
      message: '删除留言失败'
    })
  }
}
const sendMessageReply = async (config) => {
  try {
    isLoading.value = true
    config = {
      ...config,
      messageId: props.id
    }
    await handUpMessageReply(config)
    await fetchReplyList(props.id)
    isLoading.value = false
    ElMessage({
      type: 'success',
      message: '添加留言成功'
    })
  } catch (e) {
    ElMessage({
      type: 'error',
      message: '添加留言失败'
    })
  }
}
const fetchReplyList = async (id) => {
  const {
    data: { data: replyList }
  } = await fetchTheMessageReplies(id)
  initReplyList(replyList)
}
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  border-bottom: 1px solid #c4c3c4;
  padding-top: 10px;
  &-content {
    margin-bottom: 5px;
    .top {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
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
      .other-info {
        display: flex;
        font-size: 14px;
        align-items: center;
        width: 200px;
        justify-content: space-between;
        .floor-number {
          max-width: 30px;
          text-align: left;
        }
        .created-time {
          max-width: 170px;
          text-align: right;
        }
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
  &-reply {
    /deep/.el-skeleton {
      margin-left: 50px;
      width: calc(100% - 50px);
    }
  }
}
</style>

<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-29 11:39:19
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-07-02 15:20:00
 * @FilePath: /blog-frontend/blog-frontend/src/views/message/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="['menu-item-container', store.theme]">
    <el-card class="message-card">
      <div class="message-card-barrage">
        <div class="text">可以给开发者提点建议,也欢迎各位从事开发的同学在此交流学习</div>
      </div>
      <div class="message-card-comment mb10">
        <div class="header">
          <el-input
            v-model="comment"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            maxlength="60"
            placeholder="请输入"
            resize="none"
            show-word-limit
          />
          <el-button @click="handleSendComment" v-preReClick class="ml10" type="primary"
            >提交</el-button
          >
        </div>
        <div class="body">
          <div class="skeleton" v-show="isLoading">
            <el-skeleton :rows="8" />
          </div>
          <div class="message-list" v-show="!isLoading">
            <Message
              v-for="(message, index) in messageList"
              :key="message.id"
              v-bind="message"
              :currentPage="pageBean.currentPage"
              :index="index"
              @deleteMessage="handleDeleteMessage"
            ></Message>
          </div>
        </div>
        <div class="footer">
          <el-pagination
            background
            :page-size="5"
            layout="prev, pager, next"
            :total="pageBean.total"
            @current-change="handleTurnPage"
            :current-page="pageBean.currentPage"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { ElMessage } from 'element-plus'
import Message from '@/components/message.vue'
import { handUpMessage, fetchMessage, deleteMessage } from '@/axios/service/message'
const store = useThemeStore()
const isLoading = ref(false)
const comment = ref('')
const pageBean = reactive({
  currentPage: 1,
  total: 0
})
const messageList = ref([])
onMounted(async () => {
  await handleFetchMessages(1)
})
const handleFetchMessages = async (page) => {
  isLoading.value = true
  const {
    data: { data: messages }
  } = await fetchMessage(page)
  pageBean.total = messages.count
  messageList.value = messages.rows
  isLoading.value = false
}
const handleSendComment = async () => {
  if (comment.value) {
    try {
      await handUpMessage(comment.value)
      handleFetchMessages(pageBean.currentPage)
      comment.value = ''
      ElMessage({
        message: '留言成功',
        type: 'success'
      })
    } catch (e) {
      ElMessage({
        message: '留言失败',
        type: 'error'
      })
    }
  } else {
    ElMessage({
      message: '请输入评论内容',
      type: 'warning'
    })
  }
}
const handleTurnPage = async (page) => {
  pageBean.currentPage = page
  await handleFetchMessages(page)
}
const handleDeleteMessage = async (id) => {
  await deleteMessage(id)
  await handleFetchMessages(pageBean.currentPage)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
}
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
      width: 100%;
      height: 40px;
      overflow: hidden;
      position: relative;
      margin-bottom: 80px;
      font-size: 16px;
      .text {
        height: 40px;
        left: 100%;
        line-height: 40px;
        position: absolute;
        animation: move 6s linear infinite;
        color: #ffd04b;
      }
      .text:hover {
        animation-play-state: paused;
      }
    }
    &-comment {
      width: 100%;
      box-sizing: border-box;

      padding: 0 20px;
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 40px;
        .el-textarea {
          width: 60%;
        }
      }
      .body {
        margin-bottom: 40px;
      }
      .footer {
        display: flex;
        justify-content: center;
      }
    }
  }
}
@keyframes move {
  from {
    left: 100%;
    top: 0;
  }
  to {
    left: -100%;
  }
}
</style>

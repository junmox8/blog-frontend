<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-24 17:24:09
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-29 21:46:32
 * @FilePath: /blog-frontend/blog-frontend/src/views/info/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="['menu-item-container', store.theme]">
    <div class="info-container" v-if="!isLoading">
      <div class="info-container-header">
        <transition appear name="summarize">
          <div class="summarize mb20">这里是你的个人信息～</div>
        </transition>
      </div>
      <div class="info-container-body">
        <transition appear name="avatar">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :http-request="handleStart"
            :disabled="!isEdit"
          >
            <img v-show="info.avatar" class="avatar" :src="info.avatar" />
            <el-icon v-show="!info.avatar" class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </transition>
        <transition appear name="text">
          <div class="text-info">
            <div class="name mb20">
              <div class="info-title">昵称</div>
              <el-input
                v-show="isEdit"
                v-model="editInfo.name"
                placeholder="请输入"
                clearable
                class="info-edit"
              />
              <div v-show="!isEdit" class="info-content">
                {{ info.name }}
              </div>
            </div>
            <div class="introduction">
              <div class="info-title">简介</div>
              <el-input
                v-show="isEdit"
                v-model="editInfo.introduction"
                placeholder="请输入"
                clearable
                class="info-edit"
              />
              <div v-show="!isEdit" class="info-content">
                {{ info.introduction }}
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="info-container-footer">
        <div v-show="isEdit">
          <el-button type="primary" class="mr5" @click="handleSave">保存</el-button>
          <el-button @click="cancelEdit">取消编辑</el-button>
        </div>
        <div v-show="!isEdit">
          <el-button type="primary" class="mr5" @click="handleEdit">编辑</el-button>
          <el-button @click="exit">退出登录</el-button>
        </div>
      </div>
    </div>
    <el-skeleton class="skeleton-container" v-else>
      <template #template>
        <div class="skeleton">
          <el-skeleton-item variant="text" class="skeleton-text mv5" />
          <el-skeleton-item variant="circle" class="skeleton-circle" />
          <el-skeleton-item variant="p" class="skeleton-p mb20" />
          <el-skeleton-item variant="text" class="mb20" />
          <el-skeleton-item variant="text" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useThemeStore } from '@/stores/theme.js'
import { getMyUserInfo, updateUserInfo } from '@/axios/service/info'
import { uploadFile } from '@/utils/upload'
const router = useRouter()
const store = useThemeStore()
const isEdit = ref(false)
const isLoading = ref(false)
let info = reactive({
  avatar: '',
  name: '',
  introduce: ''
})
const editInfo = reactive({
  avatar: '',
  name: '',
  introduction: ''
})
onMounted(async () => {
  await handleFetchUserInfo()
})
const handleFetchUserInfo = async () => {
  isLoading.value = true
  const {
    data: { data: userInfo }
  } = await getMyUserInfo()
  info = userInfo
  isLoading.value = false
}
const handleStart = async (file) => {
  if (!file.file.type.includes('image')) {
    return ElMessage({
      message: '请选择图片上传',
      type: 'error'
    })
  }
  const result = await uploadFile(file.file, file.file.uid)
  editInfo.avatar = result
}
const handleSave = async () => {
  if (validateForm(editInfo)) {
    const result = await updateUserInfo(editInfo)
    if (result) {
      ElMessage({ type: 'success', message: '更改信息成功' })
      handleFetchUserInfo()
    } else ElMessage({ type: 'error', message: '更改信息失败' })
    isEdit.value = false
  }
}
const handleEdit = async () => {
  isEdit.value = true
  Object.assign(editInfo, JSON.parse(JSON.stringify(info)))
}
const cancelEdit = () => {
  isEdit.value = false
  resetForm()
}
const exit = () => {
  localStorage.removeItem('token')
  router.replace('/login')
}
const resetForm = () => {
  const form = {
    name: '',
    introduction: ''
  }
  Object.assign(editInfo, form)
}
const validateForm = (form) => {
  let valid = true
  Object.keys(form).forEach((key) => {
    if (!form[key]) {
      valid = false
      ElMessage({
        type: 'error',
        message: '请填写完整信息'
      })
    }
  })
  if (form.name.length > 10) {
    valid = false
    ElMessage({
      type: 'error',
      message: '昵称长度不能超过10个字符'
    })
  }
  return valid
}
</script>
<style lang="less" scoped>
.menu-item-container {
  padding: 50px 0 0 190px;
  .info-container {
    overflow: hidden;
    &-header {
      .summarize {
        color: #fcac2b;
        font-weight: 600;
        font-size: 16px;
      }
    }

    &-body {
      margin-bottom: 20px;
      .avatar-uploader {
        margin-bottom: 50px;
        .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }
        .el-upload:hover {
          border-color: var(--el-color-primary);
        }
        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          text-align: center;
        }

        .avatar {
          width: 178px;
          height: 178px;
          border-radius: 50%;
        }
      }
      .text-info {
        .name,
        .introduction {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          .info-title {
            font-size: 16px;
            color: rgb(129, 138, 212);
            font-weight: 600;
          }
          .info-content {
            font-size: 16px;
            font-weight: 600;
            margin-left: 20px;
          }
          .info-edit {
            margin-left: 20px;
            max-width: 20%;
          }
        }
      }
    }

    &-footer {
    }
  }
  .skeleton-container {
    width: 500px;
    height: 480px;
    .skeleton {
      display: flex;
      flex-direction: column;
      &-text {
        width: 200px;
      }
      &-circle {
        width: 250px;
        height: 250px;
      }
      &-p {
        width: 200px;
      }
    }
  }
}
.summarize-enter-active,
.summarize-leave-active {
  transition: all 2s ease;
}
.avatar-enter-active,
.avatar-leave-active {
  transition: all 3s ease;
}
.text-enter-active,
.text-leave-active {
  transition: all 4s ease;
}
.summarize-enter-from,
.summarize-leave-to,
.avatar-enter-from,
.avatar-leave-to,
.text-enter-from,
.text-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>

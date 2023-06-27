<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-24 17:24:09
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-27 18:49:23
 * @FilePath: /blog-frontend/blog-frontend/src/views/info/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="['menu-item-container', store.theme]">
    <div class="info-container" v-if="!isLoading">
      <div class="info-container-header">
        <div class="summarize">这里是你的个人信息～</div>
      </div>
      <div class="info-container-body">
        <el-upload
          class="avatar-uploader animate2"
          :show-file-list="false"
          :http-request="handleStart"
          :disabled="!isEdit"
        >
          <img v-show="!isEdit" class="avatar" :src="info.avatar" />
          <el-icon v-show="isEdit" class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <div class="text-info">
          <div class="name mb20">
            <div class="info-title">昵称</div>
            <el-input
              v-show="isEdit"
              v-model="inputValue.name"
              placeholder="请输入"
              clearable
              class="info-edit"
            />
            <div v-show="!isEdit" class="info-content">
              {{ info.name }}
            </div>
          </div>
          <div class="introduction"></div>
        </div>
      </div>
      <div class="info-container-footer"></div>
    </div>
    <el-skeleton class="skeleton-container" v-else>
      <template #template>
        <div class="skeleton">
          <el-skeleton-item variant="text" class="skeleton-text mv5" />
          <el-skeleton-item variant="circle" class="skeleton-circle" />
          <el-skeleton-item variant="p" class="skeleton-p mb5" />
          <el-skeleton-item variant="text" class="mb5" />
          <el-skeleton-item variant="text" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useThemeStore } from '@/stores/theme.js'
const store = useThemeStore()
const isEdit = ref(true)
const isLoading = ref(false)
const info = reactive({
  avatar: '',
  name: '',
  introduce: ''
})
const inputValue = reactive({
  name: '',
  introduction: ''
})
</script>
<style lang="less" scoped>
.menu-item-container {
  padding: 50px 0 0 190px;
  .info-container {
    &-header {
      .summarize {
        color: #fcac2b;
        font-weight: 600;
      }
    }

    &-body {
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
</style>

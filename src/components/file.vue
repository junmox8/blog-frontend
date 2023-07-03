<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-07-03 22:50:38
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-07-04 01:23:48
 * @FilePath: /blog-frontend/blog-frontend/src/components/file.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="file-info-container">
    <div class="file-info">
      <div class="file-info-name">
        <el-popover
          placement="top-start"
          title="下载提示"
          :disabled="!isDone"
          :width="200"
          trigger="hover"
          :content="`如果单击文件名不能下载,将下面这串链接复制打开即可下载,该文件地址是${props.url}`"
        >
          <template #reference>
            <span :style="{ cursor: props.isDone ? 'pointer' : '' }" @click="downloadFile">{{
              props.fileName
            }}</span>
          </template>
        </el-popover>
      </div>
      <div class="file-info-size">
        {{ props.isDone ? props.totalSize : props.currentSize }}MB/{{ props.totalSize }}MB
      </div>
    </div>
    <div class="progress-info">
      <el-progress :percentage="props.isDone ? 100 : props.percent" />
      <div>{{ props.isDone ? '0KB/s' : currentSpeed }}</div>
    </div>
    <div class="control-area" v-show="!props.isDone">
      <el-icon :size="24" style="cursor: pointer" @click="changeUploadState(!isUploading)"
        ><VideoPause v-show="isUploading" /><VideoPlay v-show="!isUploading" />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import context from '@/class/emit'
import { ElMessage } from 'element-plus'
const props = defineProps([
  'fileName',
  'taskId',
  'totalSize',
  'currentSize',
  'speed',
  'uid',
  'percent',
  'url',
  'isDone'
])
const isUploading = ref(true)
const currentSpeed = computed(() => {
  if (props.speed > 1) {
    return props.speed + 'MB/s'
  } else {
    return props.speed * 1000 + 'KB/s'
  }
})
const changeUploadState = async (state) => {
  if (props.percent === 100) {
    return ElMessage({ type: 'error', message: '此文件已上传完成' })
  }
  isUploading.value = state
  context.emit(props.taskId, state ? 1 : 0)
}
const downloadFile = async () => {
  if (props.hasDone) {
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = props.url
    tempLink.setAttribute('download', props.fileName)
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
  }
}
</script>

<style lang="less" scoped>
.file-info-container {
  height: 60px;
  padding: 10px 5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  .file-info {
    width: 50%;
    &-name {
      font-weight: 600;
      font-size: 14px;
      max-width: 100%;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-size {
      font-size: 13px;
      width: auto;
      color: #727272;
    }
  }
  .progress-info {
    width: 20%;
  }
  .control-area {
    width: 10%;
  }
}
</style>

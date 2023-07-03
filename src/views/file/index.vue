<template>
  <div :class="['menu-item-container', store.theme]">
    <el-card class="file-container">
      <el-collapse v-model="activeName" @change="change">
        <el-collapse-item name="uploading" :disabled="!uploadingFiles.length">
          <template #title> 上传中的文件 </template>
          <File v-for="file in uploadingFiles" :key="file.id" v-bind="file"></File>
          <div class="skeleton" v-show="!uploadedFiles.length">没有正在上传的任务</div>
          <div class="files"></div>
        </el-collapse-item>
        <el-collapse-item name="uploaded" :disabled="!uploadedFiles.length">
          <template #title> 上传完成的文件 </template>
          <File v-for="file in uploadedFiles" :key="file.id" v-bind="file" :isDone="true"></File>
          <div class="skeleton" v-show="!uploadedFiles.length">没有上传完成的任务</div>
        </el-collapse-item>
      </el-collapse>
      <el-button
        @click="isModalVisible = true"
        class="upload"
        type="primary"
        :icon="Upload"
        circle
      />
    </el-card>
    <el-dialog v-model="isModalVisible" title="请选择文件" width="80%">
      <el-upload
        class="upload-demo"
        drag
        multiple
        :http-request="handleUpload"
        :show-file-list="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">把文件拖拽到这里或者 <em>点击上传文件</em></div>
        <template #tip>
          <div class="el-upload__tip">文件尽量不要太大</div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isModalVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import File from '@/components/file.vue'
import context from '@/class/emit'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/utils/upload'
import { uploadFile as _uploadFile, fetchFiles, validateFile } from '@/axios/service/file'
import { useThemeStore } from '@/stores/theme'
const store = useThemeStore()
const activeName = ref(['uploading', 'uploaded']) //面板激活情况
const uploadingFiles = ref([])
const uploadedFiles = ref([])
const isModalVisible = ref(false)
onMounted(() => {
  initData()
  handleSubscribe()
})
const initData = async () => {
  const {
    data: { data: result }
  } = await fetchFiles()
  console.log(result)
  uploadedFiles.value = result
}
const handleSubscribe = () => {
  context.on('createTask', (v) => {
    uploadingFiles.value.push({
      taskId: v.taskId,
      fileName: v.fileName,
      uid: v.uid,
      totalSize: 0,
      currentSize: 0,
      speed: 0,
      percent: 0,
      url: '',
      isDone: false
    })
  })
  context.on('updateState', (v) => {
    uploadingFiles.value.forEach((file) => {
      if (file.uid === v.uid) {
        file.totalSize = Math.floor((v.total / 1024 / 1024) * 100) / 100
        file.currentSize = Math.floor((v.loaded / 1024 / 1024) * 100) / 100
        file.speed = Math.floor((v.speed / 1000000) * 100) / 100
        file.percent = v.percent * 100
      }
    })
  })
}
const handleUpload = async (file) => {
  const result2 = await validateFile(file.file.name)
  if (result2.data.success === false)
    return ElMessage({ type: 'error', message: result2.data.errorMsg })
  if (uploadingFiles.value.some((item) => item.fileName === file.file.name))
    return ElMessage({ type: 'error', message: '已有同名文件正在上传' })
  if (!file.file.name.includes('.'))
    return ElMessage({
      type: 'error',
      message: '不支持该文件格式'
    })
  isModalVisible.value = false
  const result = await uploadFile(file.file, file.file.name, file.file.uid)
  if (result && result.statusCode && result.statusCode === 200) {
    uploadingFiles.value.forEach(async (item, index) => {
      if (item.uid === file.file.uid) {
        item.url = result.Location
        item.isDone = true
        item.speed = 0
        //以防小文件上传太快出现bug
        item.percent = 100
        item.currentSize = item.totalSize
        uploadingFiles.value.splice(index, 1)
        uploadedFiles.value.push(item)
        const payload = {
          fileName: item.fileName,
          url: item.url,
          totalSize: item.currentSize
        }
        await _uploadFile(payload)
      }
    })
  } else {
    //上传失败 直接从列表删除掉
    uploadingFiles.value.forEach((item, index) => {
      if (item.uid === file.file.uid) {
        uploadingFiles.value.splice(index, 1)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.menu-item-container {
  overflow: hidden;
  .file-container {
    width: 80%;
    margin-left: 10%;
    margin-top: 59px;
    margin-bottom: 50px;
    padding: 10px 15px;
    position: relative;
    .skeleton {
      height: 30px;
      text-align: center;
      align-items: 30px;
    }
    .upload {
      position: absolute;
      right: 10px;
      top: 180px;
      width: 40px;
      height: 40px;
      font-size: 20px;
      :deep(.el-icon) {
        color: #fff;
      }
    }
  }
}
</style>

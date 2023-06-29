<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-28 00:14:51
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-29 16:54:06
 * @FilePath: /blog-frontend/blog-frontend/src/views/edit/index.vue
 * @Description: 文章编辑页面
-->
<template>
  <div :class="['menu-item-container', store.theme]">
    <el-card class="edit-card">
      <div class="edit-card-header mb20">
        <h2>文章发布</h2>
      </div>
      <div class="edit-card-body mb20">
        <div class="article-title mb10">
          <div class="label">文章标题</div>
          <el-input v-model="editForm.title" placeholder="请输入文章标题" />
        </div>
        <div class="article-cover-img mb10">
          <div class="label">文章封面图片</div>
          <el-upload class="avatar-uploader" :show-file-list="false" :http-request="handleUpload">
            <img v-if="editForm.coverImg" :src="editForm.coverImg" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="article-introduction mb10">
          <div class="label">文章简介</div>
          <el-input
            v-model="editForm.introduction"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入"
          />
        </div>
        <div class="article-introduction mb10">
          <div class="label">文章主题内容</div>
          <MarkDown v-model:content="editForm.content"></MarkDown>
        </div>
        <div class="article-categories mb10">
          <div class="label">文章分类</div>
          <el-tree-select
            v-model="editForm.categories"
            :data="selectData"
            multiple
            :render-after-expand="false"
          />
        </div>
      </div>
      <div class="edit-card-footer">
        <el-button v-preReClick="2000" @click="handleCreateArticle" type="primary">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { uploadFile } from '@/utils/upload'
import { ElMessage } from 'element-plus'
import MarkDown from '@/components/markDown.vue'
import { handUpArticle } from '@/axios/service/article'
import articleCategories from '@/config/articleCategories'
const store = useThemeStore()
const editForm = reactive({
  title: '',
  coverImg: '',
  introduction: '',
  content: '',
  categories: ''
})
const selectData = computed(() => articleCategories)
const handleUpload = async (file) => {
  const result = await uploadFile(file.file, file.file.uid)
  editForm.coverImg = result
}
const handleCreateArticle = async () => {
  if (validateForm(editForm)) {
    try {
      await handUpArticle({
        ...editForm,
        categories: editForm.categories.join(',')
      })
      ElMessage({
        message: '文章发布成功',
        type: 'success'
      })
      resetForm()
    } catch (e) {
      ElMessage({
        message: '文章发布失败',
        type: 'error'
      })
    }
  } else {
    ElMessage({
      message: '请填写完整的文章信息',
      type: 'error'
    })
  }
}
const validateForm = (form) => {
  let valid = true
  Object.keys(form).forEach((key) => {
    if (!form[key]) {
      valid = false
    }
  })
  return valid
}
const resetForm = () => {
  const form = {
    title: '',
    coverImg: '',
    introduction: '',
    content: '',
    categories: ''
  }
  Object.assign(editForm, form)
}
</script>

<style lang="less" scoped>
.menu-item-container {
  overflow: hidden;
  .edit-card {
    width: 70%;
    margin-left: 15%;
    margin-top: 59px;
    margin-bottom: 50px;
    padding-left: 15px;

    .label {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .article-cover-img {
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
      }
    }
  }
}
</style>

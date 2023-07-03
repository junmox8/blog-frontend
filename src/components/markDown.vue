<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-29 00:04:07
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-07-04 00:21:05
 * @FilePath: /blog-frontend/blog-frontend/src/components/markDown.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-29 00:04:07
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-29 00:37:24
 * @FilePath: /blog-frontend/blog-frontend/src/components/markDown.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <v-md-editor
      :disabled-menus="[]"
      v-model="value"
      left-toolbar="undo redo clear | h bold italic strikethrough quote tip| ul ol table hr | link image code emoji todo-list| save "
      height="400px"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>

<script setup>
import { uploadImg } from '@/utils/upload'
import { computed } from 'vue'
const props = defineProps(['content'])
const emit = defineEmits(['update:content'])
const value = computed({
  get() {
    return props.content
  },
  set(value) {
    emit('update:content', value)
  }
})
const handleUploadImage = async (event, insertImage, files) => {
  const result = await uploadImg(files[0], files[0].lastModified)
  insertImage({
    url: result,
    desc: files[0].lastModified
  })
}
</script>

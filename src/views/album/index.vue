<!--
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-17 15:50:56
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-24 00:34:22
 * @FilePath: /blog-frontend/blog-frontend/src/views/album/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div :class="['menu-item-container', 'album-container', store.theme]">
        <el-card>
            <div class="header">
                <el-tabs @tab-change="changeTab" v-model="editableTabsValue" type="card" addable stretch
                    @edit="handleTabsEdit">
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.name" :name="item.name">
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="body">
                <el-empty v-show="editableTabs.length === 0" description="暂无图片分类" />
                <el-empty v-show="editableTabs.length > 0 && imgList.length === 0" description="暂无图片" />
                <div v-show="imgList.length > 0" class="img-container">
                    <div v-for="(column, index) in imgColumns" class="img-column" :key="index" ref="imgColumnsRef">
                        <el-card shadow="hover" v-for="(img, index) in column" :key="index">
                            <img :src="img" :dataUrl="img" ref="imgsRef" />
                        </el-card>
                    </div>
                </div>
                <el-button v-show="editableTabs.length > 0" @click="uploadDialogVisible = true" class="upload-icon"
                    type="primary" :icon="Upload" circle />
            </div>
        </el-card>
    </div>
    <el-dialog v-model="uploadDialogVisible" title="添加图片">
        <el-upload v-model:file-list="fileList" multiple list-type="picture-card" :http-request="handleUploadImg">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="uploadDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditAlbum">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { handUpImgKind, getAllImgKinds, handUpImg, getImgs } from '@/axios/service/album'
import { Upload } from '@element-plus/icons-vue'
import { uploadFile } from '@/utils/upload'
import { useThemeStore } from '@/stores/theme'
import WaterFall from '@/class/waterFall'
const store = useThemeStore()
const editableTabsValue = ref('')
const editableTabs = ref([])
const imgList = ref([])
const fileList = ref([])
const imgColumns = ref([[], [], [], []])
const imgColumnsRef = ref([])
const uploadDialogVisible = ref(false)
onMounted(async () => {
    const { data: { data } } = await getAllImgKinds()
    editableTabs.value = data
    if (data.length > 0) {
        editableTabsValue.value = data[0].name
    }
})
const changeTab = async (name) => {
    handleFetchImgs(name)
}
const handleFetchImgs = async (name) => {
    resetVisibleImgs()
    const {
        data: { data: _imgList }
    } = await getImgs(name)
    if (!_imgList.url) return
    const urls = _imgList.url.split(',')
    imgList.value = urls
    fileList.value = urls.map(url => (
        {
            name: url,
            url
        }
    ))
    await handleRenderImg()
}
const handleTabsEdit = async (target, action) => {
    if (action === 'add') {
        ElMessageBox.prompt('', '添加分类', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputErrorMessage: '请输入标签名称',
            inputPattern: /\S/,
        }).then(async ({ value }) => {
            if (value) {
                try {
                    const result = await handUpImgKind(value)
                    if (result.data.success) {
                        const tabName = value
                        const tabTitle = value
                        editableTabs.value.push({
                            title: tabTitle,
                            name: tabName,
                        })
                        editableTabsValue.value = tabName
                        ElMessage({
                            type: 'success',
                            message: '添加分类成功'
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: result.data.errorMsg
                        })
                    }
                }
                catch (error) {
                    ElMessage({
                        type: 'error',
                        message: error
                    })
                }
            }
        })
    }
}
const handleUploadImg = async (file) => {
    if (!file.file.type.includes('image')) {
        ElMessage({
            message: '请选择图片上传',
            type: 'error'
        })
        return fileList.value.pop()
    }
    const result = await uploadFile(file.file, file.file.uid)
    fileList.value.push({
        name: file.file.uid,
        url: result
    })
    fileList.value = fileList.value.filter(file => !file.url.includes('blob'))
}
const handleEditAlbum = async () => {
    let urlStr = ''
    fileList.value.forEach((file, index) => {
        if (index === fileList.value.length - 1) {
            urlStr += file.url
        }
        else {
            urlStr += file.url + ','
        }
    })
    try {
        const result = await handUpImg(urlStr, editableTabsValue.value)
        if (result.data.success) {
            ElMessage({
                type: 'success',
                message: '该分类更新图片成功'
            })
            imgList.value = fileList.value.map(file => file.url)
            resetVisibleImgs()
            await handleRenderImg()
        }
    } catch (e) {
        ElMessage({
            type: 'error',
            message: '上传图片失败'
        })
    } finally {
        uploadDialogVisible.value = false
    }
}
const resetVisibleImgs = () => {
    imgColumns.value = [[], [], [], []]
}
const handleRenderImg = async () => {
    const config = {
        imgList: imgList.value,
        columns: imgColumns.value,
        columnsRef: imgColumnsRef.value,
    }
    const waterFall = new WaterFall(config)
    await waterFall.render()
}
</script>

<style lang="less" scoped>
.album-container {
    padding: 59px 0;
    display: flex;
    justify-content: center;

    .el-card {
        width: 1000px;
    }

    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: relative;


        .img-container {
            width: 800px;
            display: flex;
            flex-wrap: nowrap;

            .img-column {
                width: 200px;
                height: min-content;

                /deep/.el-card {
                    width: 200px;
                    box-sizing: border-box;

                    .el-card__body {
                        padding: 0;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;

                        img {
                            width: 180px;
                        }
                    }

                }
            }

        }

        .upload-icon {
            position: absolute;
            top: 100px;
            right: 10px;

            :deep(.el-icon) {
                color: #fff;
            }
        }
    }

}
</style>

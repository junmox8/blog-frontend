import COS from 'cos-js-sdk-v5'
import { getTempSecret } from '@/axios/service/album'
import { ElMessage } from 'element-plus'
import context from '@/class/emit'
export const uploadImg = async (file, fileName) => {
  const result = await getTempSecret()
  if (result.data.data) {
    const data = result.data.data.data
    const { expiredTime, credentials } = data
    const { sessionToken, tmpSecretKey, tmpSecretId } = credentials
    const cos = new COS({
      getAuthorization: (options, callback) => {
        const obj = {
          TmpSecretId: tmpSecretId,
          TmpSecretKey: tmpSecretKey,
          XCosSecurityToken: sessionToken,
          ExpiredTime: expiredTime
        }
        callback(obj)
      }
    })
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket: 'huangjunyi-1310688513',
          Region: 'ap-shanghai',
          Key: 'articleCover/' + fileName,
          StorageClass: 'STANDARD',
          Body: file,
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData))
          }
        },
        (err) => {
          if (err) {
            ElMessage({
              message: '上传图片失败',
              type: 'error'
            })
            reject(err)
          } else {
            ElMessage({
              message: '上传图片成功',
              type: 'success'
            })
            const url = cos.getObjectUrl({
              Bucket: 'huangjunyi-1310688513',
              Region: 'ap-shanghai',
              Key: 'articleCover/' + fileName
            })
            resolve(url)
          }
        }
      )
    })
  } else {
    ElMessage({
      message: '请重新登录',
      type: 'error'
    })
  }
}
export const uploadFile = async (file, fileName, uid) => {
  const result = await getTempSecret()
  if (result.data.data) {
    const data = result.data.data.data
    const { expiredTime, credentials } = data
    const { sessionToken, tmpSecretKey, tmpSecretId } = credentials
    const cos = new COS({
      getAuthorization: (options, callback) => {
        const obj = {
          TmpSecretId: tmpSecretId,
          TmpSecretKey: tmpSecretKey,
          XCosSecurityToken: sessionToken,
          ExpiredTime: expiredTime
        }
        callback(obj)
      }
    })
    return new Promise((resolve, reject) => {
      cos.uploadFile(
        {
          Bucket: 'huangjunyi-1310688513',
          Region: 'ap-shanghai',
          Key: 'file/' + fileName,
          StorageClass: 'STANDARD',
          Body: file,
          SliceSize: 1024 * 1024 * 5,
          onTaskReady: function (taskId) {
            /* 非必须 */
            context.emit('createTask', {
              taskId,
              fileName,
              uid
            })
            context.on(taskId, (v) => {
              if (v == 0) cos.pauseTask(taskId)
              if (v == 1) cos.restartTask(taskId)
              if (v == 2) cos.cancelTask(taskId)
            })
          },
          onProgress: function (progressData) {
            /* 非必须 */
            context.emit('updateState', {
              ...progressData,
              uid
            })
          }
        },
        async (err, data) => {
          if (err) {
            ElMessage({
              message: '上传文件失败',
              type: 'error'
            })
            reject('error')
          } else {
            ElMessage({
              message: '上传文件成功',
              type: 'success'
            })
            resolve(data)
          }
        }
      )
    })
  } else {
    ElMessage({
      message: '请重新登录',
      type: 'error'
    })
  }
}

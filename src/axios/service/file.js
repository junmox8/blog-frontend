import createAxios from '../index'
export const uploadFile = async (data) => {
  return createAxios({
    url: '/api/file/uploadFile',
    method: 'post',
    data
  })
}
export const fetchFiles = async () => {
  return createAxios({
    url: '/api/file/fetchFiles',
    method: 'get'
  })
}
export const validateFile = async (fileName) => {
  return createAxios({
    url: `/api/file/validateFile?fileName=${fileName}`,
    method: 'get'
  })
}

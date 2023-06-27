import createAxios from '../index'
export const getMyUserInfo = async () => {
  return createAxios({
    url: '/api/user/getMyUserInfo',
    method: 'get',
    isLoading: false
  })
}
export const updateUserInfo = async (userInfo) => {
  return createAxios({
    url: '/api/user/updateUserInfo',
    method: 'post',
    data: userInfo,
    isLoading: false
  })
}

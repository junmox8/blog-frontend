/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-23 16:10:03
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-23 18:30:17
 * @FilePath: /blog-frontend/blog-frontend/src/axios/service/album.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import createAxios from '../index'
export const handUpImgKind = async (name) => {
  return createAxios({
    url: '/api/album/handUpImgKind',
    method: 'post',
    data: {
      name
    }
  })
}
export const getAllImgKinds = async () => {
  return createAxios({
    url: '/api/album/getAllImgKinds',
    method: 'get'
  })
}
export const handUpImg = async (urls, kindName) => {
  return createAxios({
    url: '/api/album/handUpImg',
    method: 'post',
    data: {
      urls,
      kindName
    }
  })
}
export const getImgs = async (kindName) => {
  return createAxios({
    url: '/api/album/getImgs?kindName=' + kindName,
    method: 'get'
  })
}
export const getTempSecret = async () => {
  return createAxios({
    url: '/api/upload/getTempSecret',
    method: 'get'
  })
}

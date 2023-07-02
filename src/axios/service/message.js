/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-29 17:53:09
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-07-02 19:21:12
 * @FilePath: /blog-frontend/blog-frontend/src/axios/service/message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import createAxios from '../index'
export const fetchMessage = async (page) => {
  return createAxios({
    url: `/api/message/fetchMessage?page=${page}`,
    method: 'get',
    isLoading: false
  })
}
export const handUpMessage = async (content) => {
  return createAxios({
    url: '/api/message/handUpMessage',
    method: 'post',
    data: {
      content
    },
    isLoading: false
  })
}
export const deleteMessage = async (id) => {
  return createAxios({
    url: '/api/message/deleteMessage',
    method: 'post',
    data: {
      id
    },
    isLoading: false
  })
}
export const handUpMessageReply = async (data) => {
  return createAxios({
    url: '/api/message/handUpMessageReply',
    method: 'post',
    data,
    isLoading: false
  })
}
export const deleteReply = async (id) => {
  return createAxios({
    url: '/api/message/deleteReply',
    method: 'post',
    data: {
      id
    },
    isLoading: false
  })
}
export const fetchTheMessageReplies = async (id) => {
  return createAxios({
    url: `/api/message/fetchTheMessageReplies?id=${id}`,
    method: 'get',
    isLoading: false
  })
}

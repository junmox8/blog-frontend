/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-22 18:17:20
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-23 01:25:49
 * @FilePath: /blog-frontend/blog-frontend/src/utils/trackPageStayTime.js
 * @Description: vue-router只能监听页面前进后退等,不能监听页面刷新或者关闭
 */
import { trackEvent } from '@/axios/service/track'
import convertToSeconds from '@/utils/convertToSeconds'
import enterTimeClosure from '@/utils/enterTimeClosure'
window.addEventListener('beforeunload', () => {
  if (location.pathname !== '/login') {
    const stayTime = Date.now() - enterTimeClosure.getEnterTime()
    trackEvent('停留页面', `在${location.pathname}页面停留了${convertToSeconds(stayTime)}秒`)
  }
})

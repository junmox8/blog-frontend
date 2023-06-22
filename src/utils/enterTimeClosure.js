/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-22 20:36:51
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-22 20:37:05
 * @FilePath: /blog-frontend/blog-frontend/src/utils/enterTimeClosure.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const enterTimeClosure = (() => {
  let enterTime = null
  return {
    getEnterTime: () => enterTime,
    setEnterTime: (time) => {
      enterTime = time
    }
  }
})()
export default enterTimeClosure

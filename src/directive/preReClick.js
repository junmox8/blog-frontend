/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-15 21:20:40
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-29 16:32:04
 * @FilePath: /blog-frontend/blog-frontend/src/directive/preReClick.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default (app) => {
  app.directive('preReClick', {
    mounted(el, binding) {
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, binding.value || 2000)
        }
      })
    }
  })
}

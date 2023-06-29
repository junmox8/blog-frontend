/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-28 23:37:20
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-28 23:39:12
 * @FilePath: /blog-frontend/blog-frontend/src/utils/markdown.js
 * @Description: 引入markdown编辑器
 */
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'
import Prism from 'prismjs'
VMdPreview.use(githubTheme, {
  Hljs: hljs
})
VMdEditor.use(githubTheme, {
  Hljs: hljs,
  Prism
})
  .use(createTipPlugin())
  .use(createEmojiPlugin())
  .use(createTodoListPlugin())
  .use(createLineNumbertPlugin())
  .use(createCopyCodePlugin())
export default {
  VMdPreview,
  VMdEditor
}

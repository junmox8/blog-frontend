/*
 * @Author: 黄 俊轶 huangjunyi1@dxy.cn
 * @Date: 2023-06-23 21:10:55
 * @LastEditors: 黄 俊轶 huangjunyi1@dxy.cn
 * @LastEditTime: 2023-06-24 16:03:32
 * @Description: 图片瀑布流类
 */
import { nextTick } from 'vue'
export default class WaterFall {
  constructor(config) {
    this.columnCount = 4
    this.imgList = config.imgList //存储url的数组
    this.columns = config.columns //每一列存储图片的数组
    this.columnsRef = config.columnsRef //每一列的ref实例
    this.columnsHeight = [0, 0, 0, 0] //每一列的高度
  }
  async render() {
    for (let item of this.imgList) {
      const index = this.getMinHeightIndex()
      this.columns[index].push(item)
      await this.getColumnHeight(index)
    }
  }
  getMinHeightIndex() {
    const minHeight = Math.min(...this.columnsHeight)
    return this.columnsHeight.findIndex((item) => item === minHeight)
  }
  async getColumnHeight(index) {
    return new Promise((resolve) => {
      nextTick(() => {
        setTimeout(() => {
          const length = this.columnsRef[index].children.length
          const imgUrl =
            this.columnsRef[index].children[length - 1].children[0].children[0].attributes.dataUrl
              .nodeValue
          const image = new Image()
          image.src = imgUrl
          image.onload = () => {
            const height = image.height
            this.columnsRef[index].children[length - 1].style.height = height + 'px'
            this.columnsHeight[index] = this.columnsRef[index].offsetHeight
            resolve()
          }
        })
      }, 0)
    })
  }
}

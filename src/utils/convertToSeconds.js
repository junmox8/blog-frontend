//用于将Date.now()获取的时间戳转化为秒
export default function convertToSeconds(timestamp) {
  return Math.floor(timestamp / 1000);
}
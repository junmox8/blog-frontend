class countDown {
  constructor(time) {
    this.time = time
  }
  start() {
    let interval = setInterval(() => {
      this.time--
      if (this.time === 0) {
        interval = null
        clearInterval(interval)
      }
    }, 1000)
  }
}
export default countDown
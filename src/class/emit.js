class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(eventName, callback) {
    if (this._events[eventName]) {
      if (this.eventName !== 'newListener') {
        this.emit('newListener', eventName)
      }
    }
    const callbacks = this._events[eventName] || []
    callbacks.push(callback)
    this._events[eventName] = callbacks
  }

  emit(eventName, ...args) {
    const callbacks = this._events[eventName] || []
    callbacks.forEach((cb) => cb(...args))
  }
}
export default new EventEmitter()

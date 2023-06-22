import { useUserStore } from '@/stores/user'
export const trackEvent = async (eventType, eventData) => {
  const store = useUserStore()
  const payload = {
    eventData,
    eventType,
    userId: store.userId
  }
  var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })

  navigator.sendBeacon('http://127.0.0.1:3000/api/track/trackEvent', blob)
}

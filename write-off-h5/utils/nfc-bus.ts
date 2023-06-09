import EventBus from '@/frame/utils/event-bus'

const eventBus = new EventBus()

export const NFC_READ_CARD = 'read-card'

const debounce = (fn: Function, interval = 100) => {

  let timer:number = 0

  return function(this: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, interval)
  }
}

uni.$on('updateNFC', debounce((result: { nfc_id: string }) => {
  eventBus.fire(NFC_READ_CARD, result.nfc_id)
}, 300))

export default eventBus

export default class EventBus {

  events: Map<string, Function[]> = new Map();

  add(name: string, fn: Function) {
    let fnList = this.events.get(name)
    if (!fnList) {
      fnList = []
    }
    fnList.push(fn)
    this.events.set(name, fnList)
  }

  remove(name: string, fn: Function) {
    let fnList = this.events.get(name)
    if (!fnList) {
      return
    }
    for (let i = 0;i < fnList.length;i++) {
      if (fnList[i] === fn) {
        fnList.splice(i, 1)
        break
      }
    }
  }

  fire(name: string, data: any) {
    let fnList = this.events.get(name)
    if (fnList) {
      fnList.forEach(fn => {
        fn(data)
      })
    }
  }

}
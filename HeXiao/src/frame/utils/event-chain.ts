type EventChainItem = {
  (...rest: any[]): any
}

export default class EventChain {
  chains: EventChainItem[] = []

  setChain(chainItem: EventChainItem) {
    this.chains.push(chainItem)
    return this
  }

  passRequest(...rest: any[]) {
    const chains = this.chains
    const len = chains.length
    
    let result: any = false

    for (let index = 0; index < len; index++) {
      const chain = chains[index]
      result = chain.apply(this, rest)
      if (result !== false) {
        break
      }
    }
    
    return result
  }
}

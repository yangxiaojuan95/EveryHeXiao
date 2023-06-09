/**
 * 数据group
 */
import { Utils } from '@juzhenfe/modules'

export function groupBy<T = any>(datas: T[], groupKey: keyof T) {
  let result: {
    [key: string]: T[]
  } = {}
  
  for (let index = 0; index < datas.length; index++) {
    const item = datas[index]
    const groupValue = item[groupKey] as unknown as string
    if (!result[groupValue]) {
      result[groupValue] = []
    }
    result[groupValue].push(item)
  }

  return result
}

export const jsonClone = <T = any>(data: T): T => {
  // console.log('jsonClone',data)
  return JSON.parse(JSON.stringify(data))
}

export const tree = function <T = any>(
  data: T[],
  id: keyof T,
  parentId: keyof T,
  childrenKey = 'children'
) {
  data = jsonClone(data)
  
  // 1、将数据根据关联节点数据是否存在分成 分支和叶子
  let branches: any[] = []
  let leaves: T[] = []

  data.forEach((item) => {
    item[parentId] ? leaves.push(item) : branches.push(item)
  })

  // 2、对分支循环查找子元素进行挂载，直到所有分支都查找过
  function inner(branches: any[]) {
    branches.forEach((branchItem) => {
      let leftLeaves: T[] = []
      let children: T[] = []
      leaves.forEach((leaveItem) => {
        if (branchItem[id] === leaveItem[parentId]) {
          // 匹配中，说明是该分支的子节点
          children.push(leaveItem)
        } else {
          leftLeaves.push(leaveItem)
        }
      })
      // 每次寻找完，重新设置剩余叶子
      leaves = leftLeaves
      if (children.length) {
        branchItem[childrenKey] = children
        inner(branchItem[childrenKey])
      }
    })
  }

  inner(branches)

  if (leaves.length) {
    console.log('tree:::还剩余节点', leaves)
  } else {
    console.log('tree:::所有子节点挂载完毕')
  }

  return branches
}

export const findDataFromTree = Utils.findDataFromTree

export const flatList = <T = any>(data: T[], childrenKey: keyof T) => {
  data = jsonClone<T[]>(data)
  // console.log('flatList',data)
  return data.reduce((memory: T[], item: T) => {
    if (item[childrenKey] && Array.isArray(item[childrenKey])) {
      // 存在需要拍平的子元素列表
      memory = memory.concat(
        flatList(item[childrenKey] as unknown as T[], childrenKey)
      )
      delete item[childrenKey]
    }
    memory = memory.concat(item)
    return memory
  }, [] as T[])
  
}

export const toCamelCase = (target: string) => {
  let convertFlag = false

  return target.split('').reduce((memo, str) => {
    if (str === '-') {
      convertFlag = true
    } else {
      if (convertFlag) {
        convertFlag = false
        memo += str.toUpperCase()
      } else {
        memo += str
      }
    }
    return memo
  }, '')
}
export class EventEmitter<K = string> {
  events: Map<K, Function[]> = new Map()

  on(name: K, fn: Function) {
    let eventList = this.events.get(name)
    if (!eventList) {
      eventList = []
    }
    eventList.push(fn)
    this.events.set(name, eventList)
  }

  emit(name: K, ...rest: any[]) {
    let eventList = this.events.get(name)
    if (eventList) {
      eventList.forEach((event) => {
        event.apply(this, rest)
      })
    }
  }

  remove(name: K, fn: Function) {
    let eventList = this.events.get(name)
    if (eventList) {
      for (let index = 0; index < eventList.length; index++) {
        const element = eventList[index]
        if (element === fn) {
          eventList.splice(index, 1)
          this.events.set(name, eventList)
          break
        }
      }
    }
  }
}


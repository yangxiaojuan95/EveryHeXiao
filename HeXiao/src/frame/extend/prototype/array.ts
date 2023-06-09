/**
 * number
 */

 export default function install() {

  const defaultDistinctFn = function(list: any[], item: any) {
    return list.find(a => a === item) != null
  }

  Array.prototype.distinctArray = function(fn = defaultDistinctFn) {
    return this.reduce((result: any[], item: any) => {
      const isRepeat: boolean = fn(result, item)
      if (!isRepeat) {
        result.push(item)
      }
      return result
    }, [])
  }

  const defaultSumFn = (item: any) => {
    return Number(item)
  }

  Array.prototype.sum = function(fn = defaultSumFn) {
    return this.reduce((result: number, item: any) => {
      const val: number = fn(item)
      return result += val
    }, 0)
  }
}

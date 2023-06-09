
/**
 * @param summaryLabels 需要合计的列
 * @returns ElTable的汇总方法
 */
export function createSummaryMethod(summaryLabels: string[]) {
  return function({ columns, data }: AnyObject) {
    if (columns && data) {
      return columns.map((col: any) => {
        if (col.type === 'selection') {
          return '合计'
        }
        if (summaryLabels.includes(col.label)) {
          return data.sum((item: any) => {
            if (col.property) {
              const keys: string[] = col.property.split('.')
              return Number(keys.reduce((result, key) => {
                return result[key]
              }, item))
            } else {
              return 0
            }
          })
        } else {
          return null
        }
      })
    } else {
      return []
    }
  }
}

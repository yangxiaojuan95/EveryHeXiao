export const getDateCompositions = (dateValue: Date = new Date()) => {
  return [
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDate(),
    dateValue.getHours(),
    dateValue.getMinutes(),
    dateValue.getSeconds()
  ]
}

type FormatTemplate = 'yyyy-MM-dd hh:mm:ss' | 'yyyy-MM-dd' | 'yyyy/MM/dd'  | 'yyyy/MM/dd hh:mm:ss'

export const dateFormat = (dateValue: string | number | Date, formatTemplate: FormatTemplate = 'yyyy-MM-dd hh:mm:ss') => {
  if (!dateValue) {
    return '----/--/--'
  }
  if (!(dateValue instanceof Date)) {
    if (typeof dateValue === 'string') {
      dateValue = dateValue.replace(/-/g, '/').replace(/T/g, ' ')
    }
    dateValue = new Date(dateValue)
  }

  const [year, month, day, hour, min, sec] = getDateCompositions(dateValue)

  const paddingZero = (n: number | string) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  const replaceMaps: any = {
    y: paddingZero(year),
    M: paddingZero(month + 1),
    d: paddingZero(day),
    h: paddingZero(hour),
    m: paddingZero(min),
    s: paddingZero(sec)
  }
  
  return formatTemplate.replace(/./g, (val, index: number) => {
    let mapValue: string
    if (mapValue = replaceMaps[val]) {
      // 第一个match的索引
      const firstMatchIndex = formatTemplate.indexOf(val)
      return mapValue[index - firstMatchIndex]
    } else {
      return val
    }
  })

}

export const getTimestamp = () => {
  return new Date().getTime()
}

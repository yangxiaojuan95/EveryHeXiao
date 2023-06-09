type FormatTemplate = 'yyyy-MM-dd hh:mm:ss' | 'yyyy-MM-dd' | 'yyyy年MM月dd日 hh:mm:ss' | 'yyyy年MM月dd日'

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

function formatNumber(n: number) {
	let m = n + ''
	return m[1] != null ? m : '0' + m
}

function dateTextValid(text: string) {
  return text ? text.replace('T', ' ').replace(/-/g, '/') : ''
}

export const dateTextToDate = function(text: string) {
  return new Date(dateTextValid(text))
}

export const dateTextToStamp = function(text: string) {
  return new Date(dateTextValid(text)).getTime()
}

export const validIsDateOn = function(start: string, end: string) {
  if (!start || !end) {
    return false
  }
  const now = Date.now()
  return dateTextToStamp(start) < now && dateTextToStamp(end) > now
}

export const date2Text = function(date: Date, date2: Date) {
  const stamp2 = date.getTime()
  const stamp1 = date2 ? date2.getTime() : Date.now()
  const _second = Number(((stamp1 - stamp2) / 1000).toFixed(0))
  const second = 60 - 1
  const minute = 60 * 60 - 1
  const hour = 60 * 60 * 24 - 1
  const day = 60 * 60 * 24 * 30 - 1
  const month = 60 * 60 * 24 * 30 * 12 - 1
  let text = ''
  if (_second > month) {
    text = Math.floor(_second / month) + '年'
  } else if (_second > day) {
    text = Math.floor(_second / day) + '月'
  } else if (_second > hour) {
    text = Math.floor(_second / hour) + '天'
  } else if (_second > minute) {
    text = Math.floor(_second / minute) + '小时'
  } else if (_second > second) {
    text = Math.floor(_second / second) + '分钟'
  } else {
    text = _second + '秒前'
  }
  return text
}

// 获取剩余时间数组
export const getLeftTime = (date: any) => {
  let now = Date.now()
  let endStamp = dateTextToStamp(date)
  var StatusSecond = (endStamp - now) / 1000
	var day = formatNumber(parseInt(Math.floor(StatusSecond / 86400).toString()));
  var hour = formatNumber(parseInt((StatusSecond / 3600 % 24).toString()));
  var min = formatNumber(parseInt((StatusSecond / 60 % 60).toString()));
  var sec = formatNumber(parseInt((StatusSecond % 60).toString()));
  return [day, hour, min, sec]
}

// 获取剩余时间数组
export const getPastTime = (date: any) => {
  let now = Date.now()
  let endStamp = dateTextToStamp(date)
  var StatusSecond = (now - endStamp) / 1000
  var hour = formatNumber(parseInt((StatusSecond / 3600).toString()));
  var min = formatNumber(parseInt((StatusSecond / 60 % 60).toString()));
  var sec = formatNumber(parseInt((StatusSecond % 60).toString()));
  return [hour, min, sec]
}

export default {
  dateTextToStamp: dateTextToStamp,
  validIsDateOn: validIsDateOn,
  dateFormat: dateFormat,
  dateTextToDate: dateTextToDate,
  date2Text: date2Text,
  getLeftTime: getLeftTime
}
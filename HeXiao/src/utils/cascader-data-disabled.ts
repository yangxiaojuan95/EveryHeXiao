import { findDataFromTree, jsonClone } from "@/frame/utils"

function setDisabled(list: any[], childrenKey = 'children') {
  list.forEach(item => {
    item.disabled = true
    if (Array.isArray(item[childrenKey])) {
      setDisabled(item[childrenKey], childrenKey)
    }
  })
}

export function setCascaderDataDisabled(options: any[], value: string, key: string, childrenKey = 'children') {
  options = jsonClone(options)
  const findData = findDataFromTree(options, key, value, childrenKey)
  if (findData) {
    const targetData = findData.slice(-1)
    setDisabled(targetData, childrenKey)
  }
  return options
}

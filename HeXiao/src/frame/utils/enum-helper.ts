export const convertEnumToList = (enumData: AnyObject) => {
  return Object.keys(enumData).reduce((memo, key) => {
    if (isNaN(Number(key))) {
      memo.push({
        label: key,
        value: enumData[key]
      }) 
    }
    return memo
  }, [] as any[])
}

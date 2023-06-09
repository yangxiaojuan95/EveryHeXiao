/**
 * 业务枚举方法
 */

type LabelList = 'label-list'

type SelectList = 'select-list'

type ConvertEnumMode = LabelList | SelectList

type LabelListResult = string[]

type SelectListResult = { label: string, value: string | number }[]

function convertEnumToList (enumData: any, mode: SelectList): SelectListResult

function convertEnumToList (enumData: any, mode: LabelList): LabelListResult

function convertEnumToList (enumData: any, mode: ConvertEnumMode) {
  const isLabelOnly = mode === 'label-list'

  return Object.keys(enumData).reduce((memo, key) => {
    if (isNaN(Number(key))) {
      if (isLabelOnly) {
        memo.push(key)
      } else {
        memo.push({
          label: key,
          value: enumData[key]
        })
      }
    }
    return memo
  }, [] as (LabelListResult & SelectListResult))
}

function createEnum(obj: AnyObject) {
	return Object.keys(obj).reduce((memo, key) => {
		const val = obj[key]
		memo[key] = val
		memo[val] = key
		return memo
	}, {} as AnyObject)
}

export {
  convertEnumToList,
	createEnum
}

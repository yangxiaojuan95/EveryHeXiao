/**
 * 工具
 */

export function jsonClone(data: any) {
  return JSON.parse(JSON.stringify(data))
}

export function merge(...rest: any[]) {
  let result: PlainObject = {}

	for (let i = 0, l = rest.length; i < l; i++) {
		let obj = rest[i]

    if (typeof obj !== 'object') {
      continue
    }

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        if (typeof result[key] === 'object' && typeof value === 'object') {
          result[key] = merge(result[key], value)
        } else {
          result[key] = value
        }
			}
		}
	}

	return result
}

export function readObjInfo(obj: PlainObject, routes: string[]) {
  return routes.reduce((memo, key) => {
    return memo[key]
  }, jsonClone(obj))
}

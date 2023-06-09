
class ApiRequestCache<T = any> {

  cache = new Map<string, AnyObject>()

  cachedMethods: string[] = []
  cacheMethod(method: string | string[]) {
    this.cachedMethods = this.cachedMethods.concat(method)
    return this
  }

  cachedUrls: string[] = []
  cacheUrl(url: string | string[]) {
    this.cachedUrls = this.cachedUrls.concat(url)
    return this
  }

  get cacheAllUrl() {
    return this.cachedUrls.includes('*')
  }

  target!: T

  constructor(request: T) {
    this.proxy(request)
  }

  proxy(request: T) {
    const _this = this
    const target = this.target = {} as T

    Object.keys(request).forEach((method) => {
      if (typeof request[method] === 'function') {
        target[method] = new Proxy(request[method], {
          apply(target: any, thisArg: any, argArray: any[]) {
            
            // 调用方法是否包含在缓存方法中
            if (_this.cachedMethods.includes(method)) {
              const [ requestUrl, requestData ] = argArray
              // 调用url是否包含在缓存url中
              if (_this.cacheAllUrl || _this.cachedUrls.includes(_this.pureUrl(requestUrl))) {
                const cachedKey = _this.genCacheKey(requestUrl, requestData)

                if (_this.cache.has(cachedKey)) {
                  return _this.cache.get(cachedKey)
                } else {
                  const result = Reflect.apply(target, thisArg, argArray)
                  _this.cache.set(cachedKey, result)
                  return result
                }
              }
            }

            return Reflect.apply(target, thisArg, argArray)
          }
        })
      }
    })
  }

  pureUrl(url: string) {
    return url.split('?')[0]
  }

  genCacheKey(requestUrl: string, requestData?: AnyObject) {
    return `url:${requestUrl}/data:${requestData ? JSON.stringify(requestData) : null}`
  }

}

export default ApiRequestCache

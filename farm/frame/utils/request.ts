import { authFailRedirectUrl } from '@/config';
import { jsonClone, merge, readObjInfo } from './index'
import Storage from './storage'

type CheckSuccessFn = (res: any) => boolean;

interface CreateRequestConfig {
  name: string;
  baseUrl: string;
  freeUrls?: string[];
  cacheUrls?: string[];
  checkFn?: CheckSuccessFn;
  dataRoutes?: string[];
  errorRoutes?: string[];
  authFailRedirectUrl?: string;
}

type AppendMethods =  'get' | 'post' | 'put' | 'delete'

const appendMethods: AppendMethods[] = ['get', 'post', 'put', 'delete']

/* 默认配置 */
const _defaultConfigData: RequestConfigData = {
	header: {
		'content-type': 'application/json'
	},
	method: 'post', // 请求方法
	data: undefined, 
	routeData: undefined, // 路由拼接数据
	dataType: 'json',
	responseType: 'text',
	noError: false,
	timeout: undefined // ms
}

export interface RequestConfigData {
  header?: PlainObject,
  method?: AppendMethods;
  noError?: boolean;
  data?: RequestData;
  routeData?: PlainObject;
  timeout?: number;
  dataType?: string;
  responseType?: string;
}

type RequestData = PlainObject;

type RequestId = number;

interface RequestFn {
  (url: string, requestData: RequestData, configData: RequestConfigData): Promise<any>;
}

interface RequestTimer {
  timer: number;
  requestId: RequestId;
}

/* 请求类 */
export default class Request {

  // 请求id
  requestId: RequestId;
  // 请求实例名称
  name: string;
  baseUrl: string;
  freeUrls: string[] = [];
  cacheUrls: string[] = [];
  cache: PlainObject = {};
  hasCache: boolean = false;
  checkFn: CheckSuccessFn;
  promiseUrl: PlainObject = {};
  dataRoutes: string[] = [];
  errorRoutes: string[] = [];
  timers: RequestTimer[];
  token!: Storage;
  authFailRedirectUrl!: string;

  get!: RequestFn;
  post!: RequestFn;
  put!: RequestFn;
  delete!: RequestFn;

	constructor(configData: CreateRequestConfig) {
    this.requestId = 0
		this.name = configData.name
		this.baseUrl = configData.baseUrl || ''
		this.freeUrls = configData.freeUrls || []
		this.cacheUrls = configData.cacheUrls || []
		this.cache = {}
		this.hasCache = this.cacheUrls.length !== 0
		this.promiseUrl = {}
		this.timers = []
		this.checkFn = configData.checkFn || function(res) {
			return res.statusCode === 200
		}
		this.dataRoutes = configData.dataRoutes || ['data']
		this.errorRoutes = configData.errorRoutes || ['data', 'Result']
		this.token = new Storage(this.name)
		this.authFailRedirectUrl = configData.authFailRedirectUrl || authFailRedirectUrl

		this.addSupportMethod()
	}
	
	/* 添加辅助方法 */
	private addSupportMethod(this: any) {
		appendMethods.forEach(method => {
			this[method] = function(url: string, requestData: RequestData = {}, configData: RequestConfigData = {}) {
        if (method) {
          configData.method = method.toLowerCase() as AppendMethods
        }
				return this.request(url, requestData, configData)
			}
		})
	}
	
	/* 设置接口数据缓存 */
	private setCache(cahceKey: string, data: PlainObject) {
		if (!this.cache[cahceKey]) {
			this.cache[cahceKey] = jsonClone(data)
		}
	}
	
	/* 拼接路由 */
 	private appendRoute(url: string, routeData: PlainObject) {
		const appendKeys = []
		for (const k in routeData) {
			if (routeData.hasOwnProperty(k) && new RegExp(`/:${k}(/|$)`).test(url)) {
				appendKeys.push(k)
				url = url.replace(`:${k}`, routeData[k])
			}
		}
		return {
			url,
			appendKeys
		}
	}
	
	private appendQuery(url: string, requestData: PlainObject) {
		url = url.indexOf('?') > -1 ? url : url + '?'
		for (const k in requestData) {
			if (requestData.hasOwnProperty(k)) {
				url += k + '=' + requestData[k] +'&'
			}
		}
		return url.slice(0, -1)
	}
	
	processRequestData(data: PlainObject) {
    let result: PlainObject = {}
    return Object.keys(data).reduce((memo, key) => {
      if (data[key] != null && data.hasOwnProperty(key)) {
        memo[key] = data[key]
      }
      return memo
    }, result)
	}
	
	/* 请求函数 */
	request(url: string, requestData: RequestData = {}, configData: RequestConfigData = {}) {
		return new Promise((resolve, reject) => {
			
			// 查看是否需要token
			let token = requestData.token
				// ? 'Bearer ' + this.token.getValue()
				?  this.token.getValue()
				: null
			
			const isArrayData = Array.isArray(requestData)
			
			if (!isArrayData) {
				requestData = this.processRequestData(jsonClone(requestData))
			} else {
				requestData = jsonClone(requestData)
			}
			
			configData = jsonClone(configData)
			
			let requestId = ++this.requestId
			// 合并配置项
			configData = merge(_defaultConfigData, configData)
			configData.method = (configData.method ? configData.method.toLowerCase() : '') as AppendMethods 
			
			if (!isArrayData) {
				// 合并参数
				requestData = merge(requestData, configData.data)
			}
			// 查看是否连续同时调用接口
			if (!~this.freeUrls.indexOf(url)) {
				this.promiseUrl[url] && this.promiseUrl[url].abort()
			}
			
			// 拼接路由
			const routeData = merge({}, requestData, configData.routeData || {})
			if (Object.keys(routeData).length) {
				const routerAppendResult = this.appendRoute(url, routeData)
				url = routerAppendResult.url
				// 清除路由添加数据
				routerAppendResult.appendKeys.forEach(key => {
					if (requestData.hasOwnProperty(key)) {
						delete requestData[key]
					}
				})
			}
			
			delete requestData.token

			// 是否需要缓存该接口结果
			let isCache = ~this.cacheUrls.indexOf(url)
			
			let cahceKey = ''
			if (isCache) {
				cahceKey = url
				for (let k in requestData) {
					cahceKey += k + '_' + JSON.stringify(requestData[k]) + '_'
				}
				if (this.cache[cahceKey]) {
					return resolve(jsonClone(this.cache[cahceKey]))
				}
			}
			
			//delete
			// if (configData.method === 'delete') {
			// 	url = this.appendQuery(url, requestData)
			// }
			
			// 需要设置定时器
			if (configData.timeout) {
        // 如果到时还未获得结果就取消请求
				const timer = setTimeout(() => {
					let index = this.timers.findIndex(item => item.requestId === requestId)
					if (~index) {
						this.promiseUrl[url] && this.promiseUrl[url].abort()
						this.timers.splice(index, 1)
						uni.showToast({
							title: '超时'
						})
						reject({
							text: 'timeout',
							isTimeout: true
						})
					}
				}, configData.timeout)

				this.timers.push({
					timer,
					requestId
				})
			}
			
			// 发请求
			this.promiseUrl[url] = uni.request({
				url: url.indexOf('http') !== -1 ? url : this.baseUrl + url,
				method: configData.method.toUpperCase() as any,
				data: requestData,
				header: {
					...configData.header,
					Authorization : token
				},
				dataType: configData.dataType,
				responseType: configData.responseType,
				success: res => {
					let statue: any = res.data
					if(statue.Status === 40001){
						// 授权失败
						uni.hideLoading()
						uni.showModal({
							title: '您未授权或授权已过期，请重新登录',
							success: res => {
								if (res.confirm) {
									this.token.remove()
									const currentPageRoute = getCurrentPages().slice(-1)[0].route as string
									if (this.authFailRedirectUrl.indexOf(currentPageRoute) === -1) {
										// 不同页面
										uni.navigateTo({
											url: this.authFailRedirectUrl
										})
									}
								}
							},
							showCancel: false
						})
					}
					if (configData.noError) {
						// 无需检查接口返回数据
						isCache && this.setCache(cahceKey, res)
						resolve(res)
					} else {
						// 检查接口错误
						if (this.checkFn(res)) {
							let resolveData = readObjInfo(res, this.dataRoutes)
							isCache && this.setCache(cahceKey, resolveData)
							resolve(resolveData)
						} else {
							let message = readObjInfo(res, this.errorRoutes) || '出错了!'
							if (res.statusCode === 204) {
								// 无返回内容
								return resolve(undefined)
							} else if (res.statusCode === 401) {
								// 授权失败
								uni.hideLoading()
								uni.showModal({
									title: '您未授权或授权已过期，请重新登录',
									success: res => {
										if (res.confirm) {
											this.token.remove()
											const currentPageRoute = getCurrentPages().slice(-1)[0].route as string
											if (this.authFailRedirectUrl.indexOf(currentPageRoute) === -1) {
												// 不同页面
												uni.navigateTo({
													url: this.authFailRedirectUrl
												})
											}
										}
									},
									showCancel: false
								})
							} else if (res.statusCode === 403) {
								uni.showToast({
									title: '您没有访问权限',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: message,
									icon: 'none'
								})
							}
							this.hidePageLoading()
							reject({
								isError: true,
								text: message
							})
						}
					}
				},
				fail: res => {
					console.log('fail', res)
					// 请求失败
					this.hidePageLoading()
					reject(res)
				},
				complete: () => {
					var index = this.timers.findIndex(item => item.requestId === requestId)
					if (~index) {
						clearTimeout(this.timers[index].timer)
						this.timers.splice(index, 1)
					}
					this.promiseUrl[url] = null
				}
			})
		})
	}
	
	bindApi(api: string) {
		const _request: PlainObject = {}
		const self = this
		appendMethods.forEach(item => {
			_request[item] = function(requestData: RequestData = {}, configData: RequestConfigData = {}) {
				configData.method = item.toLowerCase() as AppendMethods 
				return self.request(api, requestData, configData)
			}
		})
		return _request
	}
	
	/* 隐藏loading */
	hidePageLoading() {
		try {
			let pages = getCurrentPages()
			pages && 
			(pages[pages.length - 1] as any) && 
			(pages[pages.length - 1] as any).$vm && 
			(pages[pages.length - 1] as any).$vm.hidePageLoading &&
			(pages[pages.length - 1] as any).$vm.hidePageLoading()
		} catch (error) {
			console.log('error', error)
		}
	}
	
}
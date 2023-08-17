import { token } from "@/apis/api";
import { authFailRedirectUrl } from "@/config";
import { jsonClone } from "."
import { RequestConfigData } from "./request"

interface ListPageConfig {
	api: (...rest: any[]) => Promise<any>;
	data?: PlainObject;
	config?: RequestConfigData;
	callback?: (...rest: any[]) => any[];
	filedMaps: any;
}

interface ListPageMixinData {
	table: any;
}

const defaultFiledMaps = {
	list: 'data',
	total: 'total',
}
export default class ListPage {

	data!: () => ListPageMixinData;
	onLoad!: (...rest: any[]) => void;
	onUnload!: () => void;
	onPullDownRefresh!: () => void;
	onReachBottom!: () => void;
	resetList!: () => void;
	scrollToBottom!: () => void;
	setDeafaultParams!: () => void;

	methods!: {
		[key: string]: any;
	}

	constructor(config: ListPageConfig) {
		let _promiseApi = config.api
		let requestData = config.data || {}
		let callback = config.callback
		let configData = config.config || {}
		let filedMaps = config.filedMaps || defaultFiledMaps

		let _default = {
			pageIndex: 1,
			pageSize: 8,
			takeCount: 0,
			queryAll: 0
		}
		requestData = Object.assign({}, _default, requestData)

		let _config = {
			isLoading: false
		}

		configData = Object.assign({}, _config, configData)
		let _originConfig = jsonClone(configData)
		configData.noError = true

		this.data = function() {
			return {
				table: {
					requestData: jsonClone(requestData),
					configData: configData,
					_originConfig: _originConfig,
					_originParams: jsonClone(requestData),
					_gid: 0,
					list: null,
					total: 0,
					status: {
						isAll: false,
						isNone: false,
						isLoading: false,
						isError: false,
						isTimeout: false
					}
				}
			}
		}

		this.onLoad = function(this: any) {
			this.$watch('table.list', {
				handler() {
					this.checkTableIsNone()
				},
				deep: true
			})
		}

		this.methods = {
			getPageList: function(isRemoveList: boolean) {
				this.table.status.isLoading = true
				let table = this.table
				let requestData = table.requestData
				let configData = table.configData
				this.isLoading && this.showPageLoading && this.showPageLoading()
				return _promiseApi(requestData, configData)
					.then(res => {
						if (res.statusCode === 200) {
							console.log('table', res)
							let list = isRemoveList ? [] : (table.list || [])
							// let resData = this._processFn(res.data.data || []).map((item: any) => {
							// let resData = this._processFn(res.data[filedMaps.list] || []).map((item: any) => {
							let resData = this._processFn(res.data.Result[filedMaps.list] || []).map((item: any) => {
								item._gid = this.table._gid
								return item
							})
							this.table._gid += 1
							list = list.concat(resData)
							let isAll = false
							let pageIndex = requestData.pageIndex
							if (resData.length === 0 && list.length || requestData.queryAll) {
								isAll = true
							} else {
								if (resData.length > 0) {
									pageIndex++
								}
							}
							this.table.list = list
							this.table.status.isAll = isAll
							this.table.requestData.pageIndex = pageIndex
							this.table.status.isNone = list.length === 0
							this.table.status.isError = false
							// this.table.total = res.data.total || 0
							// this.table.total = res.data[filedMaps.total] || 0
							this.table.total = res.data.Result[filedMaps.total] || 0
						} else if (res.statusCode === 401) {
							// 授权失败
							uni.showModal({
								title: '您未授权或授权已过期，请重新登录',
								success: res => {
									if (res.confirm) {
										token.remove()
										uni.navigateTo({
											url: authFailRedirectUrl
										})
									}
								},
								showCancel: false
							})
							this.table.status.isError = true
						} else if (res.statusCode === 403) {
							uni.showToast({
								title: '您暂无访问权限',
								icon: 'none'
							})
							this.table.status.isError = true
						} else {
							if (!_originConfig.noError) {
								uni.showToast({
									title: res.data.ret_msg,
									icon: 'none'
								})
							}
							this.table.status.isError = true
						}
						this.table.status.isLoading = false
						this.table.status.isTimeout = false
						uni.stopPullDownRefresh()
						if (configData.isLoading) {
							this.hidePageLoading && this.hidePageLoading()
						}
						return this.table.list
					})
					.catch((e) => {
						this.table.status.isLoading = false
						if (e.isTimeout) {
							uni.showToast({
								title: '连接超时！',
								icon: 'none'
							})
							this.table.status.isTimeout = true
						}
					})
			},
			_processFn: function(data: any) {
				return typeof callback === 'function' ? callback.call(this, data) : data
			},
			resetList: function() {
				this.resetParams()
				return this.getPageList(true)
			},
			checkTableIsNone: function() {
				this.table.status.isNone = this.table.list.length === 0
			},
			resetParams: function() {
				this.table.requestData.pageIndex = 1
				this.table.status = {
					isAll: false,
					isLoading: false,
					isNone: false,
					isError: false,
					isTimeout: false
				}
			},
			setDeafaultParams() {
				const _originParams = this.table._originParams
				const requestData = this.table.requestData
				// 删除多余参数
				for (const k in requestData) {
					if (!_originParams.hasOwnProperty(k)) {
						delete requestData[k]
					}
				}
				// 重置参数
				for (const k in _originParams) {
					requestData[k] = _originParams[k]
				}
				this.resetParams()
			},
			addParams: function(obj: PlainObject) {
				for (let k in obj) {
					this.table.requestData[k] = obj[k]
				}
			},
			changeUrl: function(api: ListPageConfig['api']) {
				_promiseApi = api
			},
			updateList: function(filterKeyParams: any, valueParams: any) {
				let index = this.table.list.findIndex((item: any) => {
					return item[filterKeyParams.key] === filterKeyParams.value
				})
				if (~index) {
					// 存在
					for (let k in valueParams) {
						this.table.list[index][k] = valueParams[k]
					}
				}
			},
			scrollToBottom: function() {
				if (this.table.status.isAll || this.table.status.isNone) {
					return false
				}

				this.getPageList()
			}
		}

		// 下拉
		this.onPullDownRefresh = function() {
			this.resetList()
		}
		// 触底
		this.onReachBottom = function() {
			this.scrollToBottom()
		}
		this.onUnload = function() {
			this.setDeafaultParams()
		}
	}
}

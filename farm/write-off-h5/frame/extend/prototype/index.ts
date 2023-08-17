/* Vue原型扩展 */
import { VueConstructor } from 'vue'

import { REG, verify } from '@/frame/utils/verify'
import { jsonClone } from '@/frame/utils'

interface VerifyRule {
  key: string;
  text: string;
  verify?: keyof typeof REG;
  expression?: (data: any) => boolean;
}

// 询问
export const showModal = function(title = '', content = '', showCancel = true): Promise<boolean> {
	return new Promise((resolve) => {
		uni.showModal({
			title,
			content,
			showCancel,
			success: res => {
				if (!res.confirm) {
					resolve(false)
				} else {
					resolve(true)
				}
			}
		})
	})
}

export const showPageLoading = function(this: any, ref = 'loading') {
	// uni.showNavigationBarLoading()
	this.$refs[ref] && this.$refs[ref].showLoading()
}

export const hidePageLoading = function(this: any, ref = 'loading') {
	// uni.hideNavigationBarLoading()
	this.$refs[ref] && this.$refs[ref].hideLoading()
}

export const yCheckLogin = function(this: any, failPath: string = '/pages/auth/index') {
	if (!this.$store.state.user.userData) {
		uni.navigateTo({
			url: failPath
		})
		return false
	}
	return true
}

export const validForm = function(this: any, data: PlainObject, rules: VerifyRule[] = []) {
	let message  = ''
	for (let i=0,l=rules.length;i<l;i++) {
		let rule = rules[i]
		let value = data[rule.key]
		if (rule.expression && typeof rule.expression === 'function') {
			// 存在表达式
			if (rule.expression.call(this, data)) {
				message = rule.text
				break
			}
		} else if (rule.verify) {
			// 需要调用校验
			if (!verify(rule.verify, value)) {
				message = rule.text
				break
			}
		} else {
			// 校验是否存在
			if (value === '' || value == null) {
				message = rule.text
				break
			}
		}
	}
	if (message) {
		uni.showToast({
			title: message,
			icon: 'none'
		})
		return false
	} else {
		return true
	}
}

export const getSafeParseData = function(jsonData: string, errorReturnData = {}) {
	try{
		return JSON.parse(jsonData) || errorReturnData
	}catch(e){
		return errorReturnData
	}
}

export const cloneObj = jsonClone

// export const isWechat = /MicroMessenger/i.test(window.navigator.userAgent);

export const isIos = uni.getSystemInfoSync().system.toLowerCase().indexOf('ios') > -1

const extend = {
	install(Vue: VueConstructor) {
		
		/** loading 方法 */
		Vue.prototype.showPageLoading = showPageLoading
		
		Vue.prototype.hidePageLoading = hidePageLoading
		
		/* 检查登录 */
		Vue.prototype.yCheckLogin = yCheckLogin
		
		/* 询问 */
		Vue.prototype.showModal = showModal

		/* 检查表单数据 */
		Vue.prototype.validForm = validForm
		
		Vue.prototype.getSafeParseData = getSafeParseData
		
		// 是否微信浏览器环境
		// Vue.prototype.isWechat = isWechat
		
		/* JSON 复制对象 */
		Vue.prototype.cloneObj = cloneObj
		
		Vue.prototype.ISIOS = isIos
		
	}
}

export default extend
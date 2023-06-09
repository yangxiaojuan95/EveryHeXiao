const isIos = uni.getSystemInfoSync().system.toLowerCase().indexOf('ios') !== -1

// 微信工具
const wxUtils = {
	// 拨电话
	makePhoneCall(phone: string) {
		if (isIos) {
			uni.makePhoneCall({
				phoneNumber: phone
			})
		} else {
			uni.showActionSheet({
				itemList: [phone, '呼叫'],
				success: () => {
					uni.makePhoneCall({
						phoneNumber: phone
					})
				}
			})
		}
	},
	async isUseFlow() {
    const type = await this.getNetworkType()
    return !!~['2g', '3g', '4g', '5g'].indexOf(type)
	},
	// 网络
	getNetworkType(): Promise<string> {
		return new Promise(resolve => {
			uni.getNetworkType({
				success: res => {
					resolve(res.networkType)
				}
			})
		})
	},
	// 获取注册参数
	getRegisterData(detail: any): any {
		return new Promise((resolve) => {
			uni.login({
				success: res => {
					resolve({
						jsCode: res.code,
						nickName: detail.userInfo.nickName,
						headImg: detail.userInfo.avatarUrl,
						sex: detail.userInfo.gender,
						encryptedData: detail.encryptedData,
						iv: detail.iv,
						signature: detail.signature
					})
				}
			})
		})
	},
	getJsCode(): Promise<string> {
		return new Promise(resolve => {
			uni.login({
				success: res => {
					resolve(res.code)
				}
			})
		})
	},
	getDefaultInfo() {
		return {
			nickName: '微信用户',
			headImg: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
		}
	},
	getUserInfo() {
		return new Promise(resolve => {
			uni.getUserInfo({
				success: res => {
					resolve(res.userInfo)
				}
			})
		})
	},
	// 拉起支付
	doPayMemt: function(data: any) {
		return new Promise((resolve, reject) => {
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: '支付服务',
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				paySign: data.paySign,
				timeStamp: data.timeStamp,
				success: res => {
					resolve({
						isPay: true
					})
				},
				fail: res => {
					resolve({
						isPay: false,
						message: res
					})
				}
			})
		})
	},
	getLocation(): Promise<UniApp.GetLocationSuccess> {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				success: res => {
					resolve(res)
				},
				fail: () => {
					reject('获取定位失败')
				}
			})
		})
	}
}

export default wxUtils

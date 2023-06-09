import { qiniu } from "@/config"
import Request from "@/frame/utils/request"
import { token } from '@/apis/api'

export let uploadApi = new Request({
	name: 'upload',
	baseUrl: '',
	freeUrls: [
		qiniu.tokenUrl
	]
})

let accessToken = {
  value: '',
  expireIn: 0
}

export const GetQiniuUploadTokenAjax = () => {
	return new Promise(async (resolve, reject) => {
		if (accessToken.value && new Date().getTime() < accessToken.expireIn) {
			resolve(accessToken.value)
		} else {
			// 重新获取
			try {
				const { data: tokenResult } = await uploadApi.post(qiniu.tokenUrl, {
					scope: qiniu.region
				}, {
					noError: true,
					header: {
						Authorization: 'Bearer ' + token.getValue()
					}
				})
	
				accessToken.value = tokenResult.accessToken
				accessToken.expireIn = new Date().getTime() + tokenResult.expireIn * 1000
				resolve(accessToken.value)
			} catch (error) {
				uni.hideLoading()
				resolve(null as any)
			}
		}
	})
}

export const UploadQiniuImgAjax = (path: string) => {
	return new Promise(async (resolve, reject) => {
		const accessToken = await GetQiniuUploadTokenAjax()
		if (!accessToken) {
			uni.showToast({
				title: '上传凭证获取失败',
				icon: 'none'
			})
			reject('get accessToken error')
			return false
		}

		const date = new Date()
		const _y = date.getFullYear()
		const _m = date.getMonth() + 1
		const _d = date.getDate()
		const name = `${qiniu.region}/${_y}${_m}${_d}/${Math.random().toString().slice(2)}` // 生成文件名
		const data = {
			token: accessToken,
			key: name,
			file: path
		}
		const uploadTask = uni.uploadFile({ // 上传文件到七牛
			url: qiniu.uploadUrl,
			name: 'file',
			filePath: path,
			formData: data,
			success: function(res) {
				console.log('res')
				// 上传成功 处理数据
				const data = JSON.parse(res.data)
				data.data = data.key
				resolve(JSON.stringify(data))
			},
			fail: function(res) {
				console.log('fail')
				reject(res)
				uni.hideLoading()
			}
		})

		uploadTask.onProgressUpdate = (e) => {
			console.log('onProgressUpdate', e)
		}
	})
}

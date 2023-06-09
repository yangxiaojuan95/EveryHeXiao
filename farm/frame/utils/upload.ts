import { qiniu } from "@/config"

/* 图片上传 */
export function uploadMultImg(api: Function, head: string, imgsText: string) {
	if (!imgsText) {
		return Promise.resolve('')
	}

	const promiseList = imgsText.split(',').map(src => {
		return new Promise(async (resolve) => {
			// 是否需要上传的文件
			if (!src.startsWith(qiniu.fileUrl)) {
				const result = await api(src)
				resolve({
					src: result
				})
			} else {
				// 无需上传
				resolve({
					src,
					noHead: true
				})
			}
		})
	})

	return Promise.all(promiseList)
		.then((result: any[]) => {
			return result.filter(item => item).map(item => {
				let src = item.src
				if (!item.noHead) {
					try {
						if (!JSON.parse(src).key) {
							throw new Error('图片上传失败')
						} else {
							src = head + JSON.parse(src).key
						}
					} catch(e) {
						// 解析失败
						throw new Error('图片上传失败')
					}
				}
				return src
			}).join(',')
		}).catch(e => {
			uni.showToast({
				title: '图片上传失败',
				icon: 'none',
				mask: true
			})
			return Promise.reject('图片上传失败')
		})
}
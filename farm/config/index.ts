/**
 * 配置
 */

// 是否生产环境
export const isProduction = process.env.NODE_ENV === 'production'

// 请求域名
const domain = 'https://approvalsale.nbxuanma.com'

// 域名 + 代理地址
// const productionUrl = domain + 'api/app/'
const productionUrl = domain

const newdevIndetifyUrl = '/api/identity/'

const devUrl = 'https://approvalsale.nbxuanma.com'

const indentifyDevUrl = 'http://localhost:8080/'

export const baseUrl = isProduction ? productionUrl : devUrl

export const devIndetifyUrl = isProduction ? newdevIndetifyUrl : indentifyDevUrl

export const authFailRedirectUrl = '/pages/login/index'

// H5需要的授权api
export const jsApiList = [
	'getLocation', //获取位置  
	'chooseImage' //拍照或从手机相册中选图接口  
]

export const jsDebug = false

export const qiniu = {
	region: 'juzhenshop',
	tokenUrl: baseUrl + 'Upload/CreateUploadToken',
	uploadUrl: 'https://upload.qiniup.com/',
	fileUrl: 'http://juzhenshopimg.juzhentech.com/'
}

/**
 * 配置
 */

// 是否生产环境
export const isProduction = process.env.NODE_ENV === 'production'

// export const isProduction = true

// 请求域名
// const domain = 'http://111.3.157.218:21002/'
const domain = ''
// const domain = 'https://approvalsale.nbxuanma.com'
// const domain = location.origin + '/'//获取根目录路径

// 域名 + 代理地址
// const productionUrl = domain + 'api/app/'
const productionUrl = domain

const newdevIndetifyUrl = '/api/identity/'

// const devUrl = 'http://localhost:5004/'
// const devUrl = '/'
const devUrl = 'http://localhost:8080'

const indentifyDevUrl = 'http://localhost:8080'

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

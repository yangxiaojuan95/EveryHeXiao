import { api, token } from ".."

/**
 * 获取全局会话令牌
 */
export const GetWxTokenAndTicketAjax = (data: any, config?: any) => {
	return api.get('/api/User/GetWxTokenAndTicket', data, config)
}

/**
 * 小程序获取openid
 */
export const GetOpenIDByCodeAjax = (data: any, config?: any) => {
	return api.get('/api/User/GetOpenIDByCode', data, config)
}

/**
 * 微信小程序授权注册登录
 */
export const PostAuthLoginAjax = (data: any, config?: any) => {
	return api.post('/api/User/AuthLogin', data, config)
}

/**
 * 微信小程序获取解密手机号码
 */
export const GetDecryptPhoneAjax = (data: any, config?: any) => {
	return api.get('/api/User/DecryptPhone', data, config)
}

/**
 * 获取个人信息
 */
export const GetUserInfoAjax = (data: any, config?: any) => {
	return api.get('/api/User/Info', data, config)
}

/**
 * 修改头像
 */
export const PostUpdateForImageAjax = (data: any, config?: any) => {
	return api.post('/api/User/UpdateForImage', data, config)
}

/**
 * 修改昵称
 */
export const GetUpdateForNameAjax = (data: any, config?: any) => {
	return api.get('/api/User/UpdateForName', data, config)
}

/**
 * 上传头像
 */
export const PostUpdateImageToServiceAjax = (data:any, config?: any) => {
	return api.post('/api/User/UpdateImageToService', data,config)
}

/**
 * 查询上传头像地址
 */
export const GetImageUrlAjax = (data:any, config?: any) => {
	return api.get('/api/User/GetImageUrl', data,config)
}
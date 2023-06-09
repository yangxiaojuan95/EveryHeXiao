import { api, token } from ".."

export const LoginAjax = (data: any, config?: any) => {
	return api.post('connect/token', data, config)
}

// 获取用户数据接口
export const UserInfoAjax = (data: any, config?: any) => {
	return api.get('/api/User/Info', data, config)
}

// // 获取用户数据接口
// export const UpdateUserClientIdAjax = (data: any, config?: any) => {
// 	return api.post('api/Users/Client', data, config)
// }

// 获取用户数据
export const getUserInfo = async (): Promise<any | null> => {
	if (token.value) {
		return await UserInfoAjax({
			token: true
		})
	} else {
		return null
	}
}


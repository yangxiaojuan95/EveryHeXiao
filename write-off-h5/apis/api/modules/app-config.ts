import { api } from ".."

// 获取app配置
export const GetAppConfigureAjax = (data: any, config?: any) => {
	return api.get('AppConfigure', data, config)
}

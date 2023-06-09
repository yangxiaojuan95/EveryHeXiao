import { api, token } from ".."

export const LoginAjax = (data: any, config?: any) => {
	return api.post('/api/Shop/Login', data, config)
}


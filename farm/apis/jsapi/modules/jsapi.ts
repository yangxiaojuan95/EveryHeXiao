import { api } from ".."

// jsapi
export const JsApiTicketAjax = (data: any, config?: any) => {
	return api.post('wechatapi/BasicInformation/JsApiTicket', data, config)
}

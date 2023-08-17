import { VueConstructor } from "vue";

import jweixin from 'jweixin-module'
import { jsApiList, jsDebug } from "@/config";
import { JsApiTicketAjax } from "@/apis/jsapi/modules/jsapi";

export default {
	install: async function(Vue: VueConstructor) {
		var uri = window.location.href.split('#')[0]; //获取当前url然后传递给后台获取授权和签名信息  
		const result = await JsApiTicketAjax({
			url: uri
		})
		//返回需要的参数appId,timestamp,noncestr,signature等
		//注入config权限配置
		jweixin.config({
			debug: jsDebug,
			appId: result.appId,
			timestamp: result.timestamp,
			nonceStr: result.nonceStr,
			signature: result.signature,
			jsApiList: jsApiList
		})
		
		Vue.prototype.$jweixin = jweixin
	}
}

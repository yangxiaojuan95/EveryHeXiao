import Vue from 'vue'
import App from './App.vue'
import extendVue from '@/frame/extend'
import store from '@/store'

import PageLoading from '@/frame/components/page-loading/index.vue'
import SafeBottom from '@/frame/components/safe-bottom/index.vue'
import SwiperTab from '@/frame/components/swiper-tab/index.vue'
import NavBar from '@/frame/components/nav-bar/index.vue'
import ListStatus from '@/frame/components/list-status/index.vue'
import { token } from '@/apis/api/index.ts'

Vue.component('PageLoading', PageLoading)
Vue.component('SafeBottom', SafeBottom)
Vue.component('SwiperTab', SwiperTab)
Vue.component('NavBar', NavBar)
Vue.component('ListStatus', ListStatus)

Vue.prototype.$store = store

Vue.config.productionTip = false

Vue.use(extendVue)

// ---------------------------------------------------------------------------------
Vue.prototype.apiUrl = 'https://mesapi.nbyash.com/';

Vue.prototype.request = function(obj) {
	var header = obj.header || {}
	// if (uni.getStorageSync('token')) {
	    // 根据业务需求自行添加这行代码
		// header['token'] = uni.getStorageSync("token");
		
	// }
	uni.request({
	        // 设置请求地址 变成了 /h5api+后台路由接口 以/h5api的请求都会被代理 
		url: this.apiUrl + obj.url, 
		data: obj.data || {},
		method: obj.method || 'GET',
		header: header,
		success: res => {
		    typeof obj.success == "function" && obj.success(res)
		},
		fail: res => {
		    typeof obj.fail == "function" && obj.fail(res)
		}
	});
}
// -----------------------------------------------------------------------------------------
const app = new Vue({
  store,
  render(h) {
    return h(App)
  }
})

app.$mount()

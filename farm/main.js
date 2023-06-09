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

const app = new Vue({
  store,
  render(h) {
    return h(App)
  }
})

app.$mount()

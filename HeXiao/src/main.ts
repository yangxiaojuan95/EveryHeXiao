import { useResourceStore } from './store/resource/index';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import extend from '@/frame/extend'
import globalComp from './utils/global-components'
import { createPinia } from 'pinia'
import './styles/iconfont/iconfont.css'
import 'intro.js/introjs.css'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router).use(extend).use(globalComp)

const resourceStore = useResourceStore()
resourceStore.loadConfig().then(() => {
  app.mount('#app')
})

export {
  app
}

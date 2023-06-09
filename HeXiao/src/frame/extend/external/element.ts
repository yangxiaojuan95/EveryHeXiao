import { App } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn'
import 'element-plus/dist/index.css'

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn,
      zIndex: 999
    })
  }
}

import { App } from 'vue'

// 原型方法扩展
import prototype from './prototype'

// 指令
import directives from './directives'

// error-handler
import errorHandler from './error-handler'

import external from './external'

import globalComponents from './global-components'

// 需要import的样式文件
import './styles'

export default {
  install(app: App) {
    app.use(prototype)
    app.use(errorHandler)
    app.use(directives)
    app.use(external)
    app.use(globalComponents)
  }
}

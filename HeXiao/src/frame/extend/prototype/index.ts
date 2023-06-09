import { App } from 'vue'

import string from './string'
import number from './number'
import array from './array'

export default {
  install(app: App) {
    app.use(string)
    app.use(number)
    app.use(array)
  }
}

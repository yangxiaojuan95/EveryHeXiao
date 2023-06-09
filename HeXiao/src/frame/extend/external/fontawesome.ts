import { App } from 'vue'

import { Utils } from '@juzhenfe/modules'

export default function install(app: App) {
  // 加载font-awesome
  setTimeout(() => {
    Utils.loadResource('all.min.css', [
      'http://cdn-static.juzhentech.com/fontawesome@6.1.1/css/',
      '/styles/fontawesome@6.0.0/css/'
    ], 'css')
  }, 20)
}

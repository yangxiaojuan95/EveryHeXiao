import { App } from 'vue'

import '@juzhenfe/modules/dist/index.min.css'

import modules from '@juzhenfe/modules'
import { createRequest } from '@juzhenfe/request'
import { normalUploadConfig, qiniuUploadConfig } from '@/config/upload'

const request = createRequest({}, {
  process: true
})

export default {
  install(app: App) {
    app.use(modules, {
      upload: {
        request,
        qiniu: qiniuUploadConfig,
        normal: normalUploadConfig
      },
      aMap: {
        key: 'b9256a35ce66c2f7b6eff1d530f5c405'
      }
    })
  }
}

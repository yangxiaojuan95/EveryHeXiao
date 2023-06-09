import importMetaGlobEagerDefaultContentTransferer from '@/frame/utils/import-glob-transfer'
import { App } from 'vue'

const modules = importMetaGlobEagerDefaultContentTransferer(import.meta.globEager('./*.ts'))

export default {
  install(app: App) {
    Object.values(modules).forEach(module => {
      app.use(module)
    })
  }
}

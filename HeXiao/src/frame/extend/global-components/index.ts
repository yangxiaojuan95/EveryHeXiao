import importMetaGlobEagerDefaultContentTransferer from '@/frame/utils/import-glob-transfer'
import { App, Component } from 'vue'

const components: Component[] = Object.values(importMetaGlobEagerDefaultContentTransferer(import.meta.globEager('/src/frame/components/global/*/index.vue')))

export default {
  install(app: App) {
    components.forEach(component => {
      app.component(component.name as string, component)
    })
  }
}

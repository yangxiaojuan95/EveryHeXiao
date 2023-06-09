import importMetaGlobEagerDefaultContentTransferer from '@/frame/utils/import-glob-transfer'
import { App, Component } from 'vue'
import CodeCell from '@/components/code-cell/index.vue'
import StatementCell from '@/components/statement-cell/index.vue'
import DeliveryMethodCell from '@/components/delivery-method-cell/index.vue'
import FeeAuditCell from '@/components/fee-audit-cell/index.vue'
import NoexsitCell from '@/components/noexsit-cell/index.vue'

const dialogComponents: Component[] = Object.values(importMetaGlobEagerDefaultContentTransferer(import.meta.globEager('/src/components/dialogs/*/index.vue')))

const inputSupportsComponents: Component[] = Object.values(importMetaGlobEagerDefaultContentTransferer(import.meta.globEager('/src/components/input-supports/*/index.vue')))


export default {
  install(app: App) {
    dialogComponents.forEach(component => {
      app.component(component.name as string, component)
    })

    inputSupportsComponents.forEach(component => {
      app.component(component.name as string, component)
    })

    app.component(CodeCell.name, CodeCell)
    app.component(StatementCell.name, StatementCell)
    app.component(DeliveryMethodCell.name, DeliveryMethodCell)
    app.component(FeeAuditCell.name, FeeAuditCell)
    app.component(NoexsitCell.name, NoexsitCell)
  }
}

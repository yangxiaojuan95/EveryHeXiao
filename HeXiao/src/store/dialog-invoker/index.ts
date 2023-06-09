import { defineStore } from "pinia"

type InvokedDialog = {
  name?: string; // 组件名称
  component?: any; // 组件
  data?: AnyObject; // 组件参数
  callback?: Function; // 弹窗处理后的回调
}

export type DialogState = {
  dialogs: InvokedDialog[]
}

const STORE_NAME = 'DIALOG'

export const useDialogStore = defineStore(STORE_NAME, {
  state: (): DialogState => {
    return {
      dialogs: []
    }
  },
  actions: {
    invoke(dialog: InvokedDialog) {
      this.dialogs.push(dialog)
    },
    close() {
      return this.dialogs.pop()
    },
    closeDialog(index: number) {
      this.dialogs.splice(index, 1)
    }
  }
})

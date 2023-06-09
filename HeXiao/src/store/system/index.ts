import { defineStore } from "pinia"


export type SystemState = {
  systemSetting: SystemSettingModel;
}

const STORE_NAME = 'SYSTEM'

export const useSystemStore = defineStore(STORE_NAME, {
  state: (): SystemState => {
    return {
      systemSetting: {
        title: 'TABOX | 塔盒科技',
        iCon: '',
        logo: '/imgs/logo.svg'
      }
    }
  },
  actions: {
    updateSystemSetting(systemSetting: SystemSettingModel) {
      this.systemSetting = systemSetting
      this.configSystemSetting()
    },
    configSystemSetting() {
      const systemSetting = this.systemSetting

      // 修改标题
      document.title = systemSetting.title

      // 修改ico
      let link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]')

      if (!link) {
        link = document.createElement('link')
        link.rel = 'ico'
        link.href = systemSetting.iCon
        document.head.appendChild(link)
      } else {
        link.href = systemSetting.iCon
      }
    }
  }
})

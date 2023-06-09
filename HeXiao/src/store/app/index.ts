import { defineStore } from "pinia"

export const STATUS_200 = 200
export const STATUS_401 = 401
export const STATUS_403 = 403
export const STATUS_500 = 500


export type PageStatus = typeof STATUS_200 | typeof STATUS_401 | typeof STATUS_403 | typeof STATUS_500

export type AppState = {
  pagesStatus: WrapObject<{
    status: PageStatus;
    msg?: string;
  }>;

  collapseSystem: boolean;
  collapseBusiness: boolean;
}

const STORE_NAME = 'APP'

export const useAppStore = defineStore(STORE_NAME, {
  state: (): AppState => {
    return {
      pagesStatus: {},
      // 系统菜单是否伸缩
      collapseSystem: false,
      // 业务菜单是否伸缩
      collapseBusiness: false
    }
  },
  actions: {
    updateStatus(payload: { name: string; status: PageStatus; msg?: string }) {
      const { name, status, msg } = payload
      this.pagesStatus[name] = {
        status,
        msg
      }
    },
    toggleSystemCollapse() {
      this.collapseSystem = !this.collapseSystem
    },
    toggleBusinessCollapse() {
      this.collapseBusiness = !this.collapseBusiness
    }
  }
})

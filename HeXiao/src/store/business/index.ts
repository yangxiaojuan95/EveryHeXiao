import { defineStore } from "pinia"

export type BusinessState = {
  // 生产销售订单时使用的报价单源数据
  bjSalesOrder: ConsultOrderResultModel | null

}

const STORE_NAME = 'BUSINESS'

export const useBusinessStore = defineStore(STORE_NAME, {
  state: (): BusinessState => {
    return {
      bjSalesOrder: null
    }
  },
  actions: {
    updateBjSalesOrder(bjSalesOrder: ConsultOrderResultModel | null) {
      this.bjSalesOrder = bjSalesOrder
    }
  }
})

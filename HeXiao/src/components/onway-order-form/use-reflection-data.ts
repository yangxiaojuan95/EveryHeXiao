import { getDictionaryList } from "@/utils/dictionary-getter";
import { reactive } from "vue";

export const useReflectionData = () => {

  const reflections = reactive<{
    deliveryMethodList: SelectItemsResultModel[]
  }>({
    deliveryMethodList: [],
  })

  async function getDeliveryMethodList() {
    const result = await getDictionaryList({
      key: '出库发货方式'
    })
    reflections.deliveryMethodList = result
  }
  getDeliveryMethodList()

  return {
    reflections
  }
}

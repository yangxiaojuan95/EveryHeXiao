import { dateFormat } from "@/frame/utils/date-format";
import { VueConstructor } from "vue";

export default function install(Vue: VueConstructor) {

  Vue.filter('toDate', (dateText: string) => {
    return dateFormat(dateText, 'yyyy-MM-dd')
  })
  
}
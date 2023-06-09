import { VueConstructor } from "vue";

import filters from './filters'
import prototype from './prototype'
import h5Jsapi from "./h5-jsapi";

export default function install(Vue: VueConstructor) {
  Vue.use(filters)
  Vue.use(prototype)

  //#ifdef H5
    // Vue.use(h5Jsapi)
  //#endif

}

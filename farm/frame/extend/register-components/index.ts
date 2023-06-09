import { VueConstructor } from "vue";

import PageLoading from '@/frame/components/page-loading/index.vue'
import SafeBottom from '@/frame/components/safe-bottom/index.vue'
import SwiperTab from '@/frame/components/swiper-tab/index.vue'
import NavBar from '@/frame/components/nav-bar/index.vue'
import ListStatus from '@/frame/components/list-status/index.vue'

const registerComponents = [
  PageLoading,
  SafeBottom,
  SwiperTab,
  NavBar,
  ListStatus
]

export default function install(Vue: VueConstructor) {
  registerComponents.forEach((component: any) => {
    Vue.component(component.name, component)
  })
}
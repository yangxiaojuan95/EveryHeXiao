import { RouteRecordRaw } from "vue-router"
import LayoutBusiness from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'MiniProgramSettings',
    component: LayoutBusiness,
    path: '/mini-program-settings',
    children: [
      {
        name: 'ParameterSettings',
        path: 'parameter-settings',
        component: () => import('@/pages/mini-program-settings/parameter-settings/index.vue'),
        meta: {
          title: '参数管理',
        }
      }
    ]
  }
]

export default routes

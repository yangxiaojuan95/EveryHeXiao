import { RouteRecordRaw } from "vue-router"
import LayoutBusiness from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'LayoutBusiness',
    component: LayoutBusiness,
    path: '/',
    children: [
      // {
      //   path: '/test2',
      //   component: () => import('@/pages/car-management/car-captain/test.vue')
      // },
      {
        path: '/test',
        component: () => import('@/pages/test/index.vue')
      }
    ]
  },
]

export default routes

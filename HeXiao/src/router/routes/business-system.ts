import { RouteRecordRaw } from "vue-router"
import LayoutBusiness from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'BusinessSystem2',
    component: LayoutBusiness,
    path: '/business-system',
    children: [
      {
        name: 'systemRoles',
        path: '/system/roles',
        component: () => import('@/frame/pages/roles/index.vue'),
        meta: {
          title: '角色管理',
          noView: true
        }
      },
      {
        name: 'Accounts',
        path: 'accounts',
        component: () => import('@/pages/business-system/accounts/index.vue'),
        meta: {
          title: '账号管理',
        }
      }
    ]
  }
]

export default routes

import { RouteRecordRaw } from "vue-router"
import LayoutBusiness from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'DataMaintenance',
    component: LayoutBusiness,
    path: '/data-maintenance',
    children: [
      {
        name: 'UserManage',
        path: 'user-manage',
        component: () => import('@/pages/data-maintenance/user-manage/index.vue'),
        meta: {
          title: '用户管理',
        }
      },
      {
        name: 'PistributionRecords',
        path: 'distribution-records',
        component: () => import('@/pages/data-maintenance/distribution-records/index.vue'),
        meta: {
          title: '发放记录',
        }
      }
    ]
  }
]

export default routes

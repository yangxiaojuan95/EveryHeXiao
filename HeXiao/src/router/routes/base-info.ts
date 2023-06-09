import { RouteRecordRaw } from "vue-router"
import LayoutBusiness from '@/frame/layout/layout-business/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'BaseInfo',
    component: LayoutBusiness,
    path: '/basic-info',
    children: [
      {
        name: 'GoodsManagement',
        path: 'goods-management',
        component: () => import('@/pages/basic-info/goods-management/index.vue'),
        meta: {
          title: '商品管理',
        }
      },
      {
        name: 'DeviceManagement',
        path: 'coupon-management',
        component: () => import('@/pages/basic-info/coupon-management/index.vue'),
        meta: {
          title: '券种管理',
        }
      },
      {
        name: 'StoreManagement',
        path: 'store-management',
        component: () => import('@/pages/basic-info/store-management/index.vue'),
        meta: {
          title: '券种管理',
        }
      }
    ]
  }
]

export default routes

import { flatRoutes } from './utils/index';
import { STATUS_500, STATUS_200, useAppStore, PageStatus } from '../store/app';
import { createRouter, createWebHashHistory, NavigationGuardNext, RouteRecordRaw } from 'vue-router'
import middlewares from './middlewares'
import NProgress from 'nprogress'

import routes from './routes'

import Error404 from '@/frame/pages/404/index.vue'
import LoginPage from '@/frame/pages/login/index.vue'
import RedirectPage from '@/frame/pages/redirect/index.vue'

const routerRoutes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: {
      template: '<div></div>'
    },
    meta: {
      title: 'home',
      noView: true
    }
  },
  ...routes,
  {
    path: '/login',
    component: LoginPage,
    meta: {
      noView: true
    }
  },
  {
    path: '/redirect/:path',
    component: RedirectPage,
    meta: {
      title: 'redirectPage',
      noView: true
    }
  },
  {
    path: '/:path(.*)',
    component: Error404,
    meta: {
      title: 'PageNotFound',
      noView: true
    }
  }
]

export const flatedRoutes = flatRoutes(routerRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: routerRoutes
})

export interface Next extends NavigationGuardNext {
  _statusUpdated?: boolean;
}

router.beforeEach(async (to, from, next) => {

  NProgress.start()

  let pageStatus: PageStatus = STATUS_200

  // 内部维护状态，是否已经next，已经next
  let isNexted = false

  const _next: Next = (params?: any) => {
    if (!isNexted) {
      isNexted = true
      next(params)
    }
  }

  for (let i = 0; i < middlewares.length; i++) {
    const isValid = await middlewares[i](to, from, _next)
    if (!isValid) {
      pageStatus = STATUS_500
      break
    }
  }
  
  const appStore = useAppStore()

  if (!_next._statusUpdated) {
    appStore.updateStatus({
      name: to.name as string,
      status: pageStatus
    })
  }

  // 防止最后没有中间件next，主动next一次
  !isNexted && _next()
  
  NProgress.done()
})

export default router

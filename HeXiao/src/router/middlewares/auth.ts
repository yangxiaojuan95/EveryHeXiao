import { isRoutePathMatch, getAbledMenu } from '@/router/utils';
import { STATUS_403 } from './../../store/app/index';

/**
 * 鉴权相关
 */

import { RouteLocationNormalized } from "vue-router";

import { Next } from "@/router";
import tokenStorage from "@/frame/utils/token";
import { getUserInfoAsync } from "@/apis/system/login";
import { useUserStore } from "@/store/user";
import { getMenuAsync, getUserMenuAsync } from "@/apis/system/menu";
import { useAppStore } from "@/store/app";
import { MenuType } from '@/models/system/menu';

// 白名单菜单列表，无需校验即可访问
export const whiteMenuPathList = [
  '/404',
  '/login',
  '/test',
]

const isInWhitePath = (path: string) => {
  return whiteMenuPathList.some(menu => isRoutePathMatch(menu, path))
}

export default async function auth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next) {

  // 在白名单
  if (isInWhitePath(to.path)) {
    return next()
  }

  // 是否存在token
  const token = tokenStorage.get()

  // 开始获取用户权限数据
  const userStore = useUserStore()

  if (token) {
    // 获取用户数据
    if (!userStore.userData) {
      const userInfo = await getUserInfoAsync()
      userStore.updateUserData(userInfo)
    }
  
    // 开始获取菜单数据
    if (!userStore.totalMenus?.length) {
      const [totalMenus, menus] = await Promise.all([getMenuAsync(), getUserMenuAsync(userStore.userData.RoleID)]) 
      userStore.updateTotalMenus(totalMenus, menus)
    }
  }

  // 在白名单
  if (isInWhitePath(to.path)) {
    return next()
  }

  // 不存在token，需要进行登录
  if (!token) {
    return next('/login')
  }

  // 识别是否存在授权菜单中
  const menus = userStore.totalMenus
  
  // 是否在合法菜单中
  const isValidEntry = menus.find(m => isRoutePathMatch(m.url, to.path))

  if (!isValidEntry) {
    const appStore = useAppStore()
    appStore.updateStatus({
      status: STATUS_403,
      name: to.name as string
    })
    next._statusUpdated = true
  }

  if (to.fullPath === '/') {
    // 选中一个可进入的页面进入
    const userStore = useUserStore()
    const menu = getAbledMenu(userStore.groupTreeMenus[MenuType.业务菜单])
    if (menu) {
      next(menu.url)
    } else {
      next('/')
    }
  }

  next()
}

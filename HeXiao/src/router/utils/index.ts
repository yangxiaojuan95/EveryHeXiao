import { jsonClone } from "@/frame/utils";
import { RouteRecordRaw } from "vue-router";
import { pathToRegexp } from 'path-to-regexp'
import { flatedRoutes } from "..";

export const flatRoutes = (routes: RouteRecordRaw[], concatPath?: string) => {
  return jsonClone(routes).reduce((memo, route) => {

    if (concatPath && concatPath !== '/' && !route.path.startsWith('/')) {
      const link = concatPath.endsWith('/') ? '' : '/'
      route.path = concatPath + link + route.path
    }
    
    memo.push(route)

    if (route.children && route.children.length) {
      memo = memo.concat(flatRoutes(route.children, route.path))
    }

    return memo
  }, [] as RouteRecordRaw[])
}

/**
 * 是否目标路由匹配路由规则
 * @param routePath 路由注册的规则
 * @param testPath 测试路径
 * @returns 
 */
export const isRoutePathMatch = (routePath: string, testPath: string ) => {
  const noQueryPath = testPath ? testPath?.split('?')[0] || '' : ''
  return pathToRegexp(routePath || '').test(noQueryPath)
}

// 判断两个路径是否使用同一个路由组件页面
export const isSameRoute = (formPath: string, toPath: string) => {
  const fromRoute = flatedRoutes.find(a => isRoutePathMatch(a.path, formPath))
  const toRoute = flatedRoutes.find(a => isRoutePathMatch(a.path, toPath))
  return fromRoute && toRoute && fromRoute === toRoute
}

// 获取路径对应的组件路径
export const getMatchRoute = (path: string) => {
  const registerRoute = flatedRoutes.find(menu => isRoutePathMatch(menu.path, path))

  if (registerRoute) {
    return registerRoute?.meta?.activeMenu ?? registerRoute.path
  } else {
    return path
  }
}

// 获取可用的菜单
export const getAbledMenu = (menus: MenuModel[]): MenuModel | null => {
  let menu: MenuModel | null = null

  for (let index = 0; index < menus.length; index++) {
    const menuItem = menus[index]
    if (menuItem.url) {
      menu = menuItem
    } else {
      menu = getAbledMenu(menuItem.childs)
    }
    if (menu) {
      break
    }
  }

  return menu
}

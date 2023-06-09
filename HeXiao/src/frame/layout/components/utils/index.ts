import { flatedRoutes } from "@/router"
import { isRoutePathMatch } from "@/router/utils"

export const getMenuActiveIndexs = (menus: TreeObject<MenuModel>[], routePath: string) => {

  let result: number[] = []

  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (isRoutePathMatch(routePath, menu.url)) {
      result.push(i)
      break
    } else {
      if (menu.childs) {
        const cresult = getMenuActiveIndexs(menu.childs, routePath)
        if (cresult.length) {
          result.push(i)
          result.push(...cresult)
          break
        }
      }
    }
  }

  return result
}


export const getRemovedHiddenMenus = (menus: TreeObject<MenuModel>[]) => {
  return menus.filter(menu => {
    if (!menu.url) {
      // 可能父级菜单
      return true
    }

    const registerRoute = flatedRoutes.find(a => isRoutePathMatch(a.path, menu.url))
    if (registerRoute) {
      if (registerRoute.meta?.hidden) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  })
}
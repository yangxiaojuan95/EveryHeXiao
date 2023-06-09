import { groupBy, tree, flatList } from '@/frame/utils'
import router, { flatedRoutes } from '@/router'
import { MenuType } from '@/models/system/menu'
import { defineStore } from 'pinia'
import { useTagViewsStore } from '../tag-views'
import { isRoutePathMatch } from '@/router/utils'

export type UserState = {
  userData: UserModel | null;
  
  userRole: RoleModel | null;
  
  totalMenus: MenuModel[];
  
  groupTreeMenus: {
    [key: string]: TreeObject<MenuModel>[];
  };
  
  currentMenuType: MenuType;

  currentUseMenus: TreeObject<MenuModel>[];
}

const STORE_NAME = 'USER'


export const useUserStore = defineStore(STORE_NAME, {
  state: (): UserState => {
    return {
      // 用户数据
      userData: null,
      // 用户角色
      userRole: null,
      // 获取到的一维菜单
      totalMenus: [],
      // 树形菜单
      groupTreeMenus: {},
      // 当前显示的菜单类型
      currentMenuType: MenuType['业务菜单'],
      // 当前显示的菜单
      currentUseMenus: []
    }
  },
  actions: {
    // 更新用户数据
    updateUserData(userData: UserModel) {
      // console.log(userData)
      this.userData = userData
    },

    clear() {
      this.userData = null
      this.userRole = null
      this.totalMenus = []
      this.groupTreeMenus = {}
      this.currentUseMenus = []
    },

    // 更新用户角色
    updateUserRole(userRole: RoleModel) {
      this.userRole = userRole
    },

    // 更新全部菜单
    updateTotalMenus(totalMenus: MenuModel[], menus: MenuModel[]) {
      // console.log(menus)
      totalMenus = flatList(totalMenus, 'childs')
      // 拿到出可用的菜单权限
      const menuClaimValuess = menus.filter(i => i.claimType === 'Menu').map(a => a.claimValue)

      // 过滤可用菜单
      menus = totalMenus.filter(menu => {
        return menuClaimValuess.includes(menu.id)
      })
      
      this.totalMenus = menus.sort((a, b) => {
        return Number(b.order) - Number(a.order)
      })
      
      const tagViewsStore = useTagViewsStore()
      const tagViewsTitleMap = tagViewsStore.tagViewsTitleMap

      menus.forEach(menu => {
        if (menu.url) {
          tagViewsTitleMap.set(menu.url, menu.name)
        }
      })

      // 菜单进行分组
      const groupMenus = groupBy(menus, 'type')
      
      // 更新分组后的树形菜单数据
      this.groupTreeMenus = Object.keys(groupMenus).reduce((memo, key) => {
        memo[key] = tree(groupMenus[key], 'id', 'pId', 'childs')
        return memo
      }, {} as UserState['groupTreeMenus'])
      
      this.updateCurrentMenu()
    },
    // 根据当前页面切换显示菜单
    updateCurrentMenu() {
      const menus = this.totalMenus

      if (!menus) {
        return false
      }

      const currentRoutePath = router.currentRoute.value.path
      const registerRoute = flatedRoutes.find(menu => isRoutePathMatch(menu.path, currentRoutePath))

      if (!registerRoute) {
        return false
      }

      
      let useTestPath = registerRoute?.meta?.activeMenu || registerRoute?.path

      const matchMenu = menus.find(menu => isRoutePathMatch(useTestPath, menu.url))

      if (!matchMenu) {
        this.currentMenuType = MenuType.业务菜单
      } else {
        this.currentMenuType = matchMenu.type
      }

      this.currentUseMenus = this.groupTreeMenus[this.currentMenuType]
    }
  }
})

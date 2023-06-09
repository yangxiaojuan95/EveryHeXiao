import router, { flatedRoutes } from '@/router'
import { isRoutePathMatch } from '@/router/utils'
import { defineStore } from 'pinia'

export type TagViewItem = {
  title: string; // 标题
  path: string; // 链接
  name?: string | symbol;
  affix: boolean; // 是否固定 不被删除
  cache: boolean; // 是否缓存 keep-alive
}

export type TagViewsState = {
  tagViews: TagViewItem[];
  tagViewsTitleMap: Map<string, string>;
}

const STORE_NAME = 'TAG_VIEWS'

export const useTagViewsStore = defineStore(STORE_NAME, {
  state: (): TagViewsState => {
    return {
      tagViews: [],
      // 路径和标题的组合
      tagViewsTitleMap: new Map()
    }
  },
  actions: {
    addTagView() {
      const route = router.currentRoute.value
      const registerRoute = flatedRoutes.find(r => isRoutePathMatch(r.path, route.path))
      if (!registerRoute) {
        console.warn('addTagView:: 注册路由中未查询到')
        return false
      }

      const meta = registerRoute.meta
      if (meta?.noView) {
        return false
      }

      if (this.tagViews.find(t => t.path === route.fullPath)) {
        // 已经存在
        return false
      }
      
      let settedTitle = this.tagViewsTitleMap.get(route.path)

      this.tagViews.push({
        name: registerRoute.name,
        path: route.fullPath,
        title: settedTitle ?? meta?.title ?? '标签',
        affix: meta?.affix ?? false,
        cache: meta?.noCache ? false : true
      })
    },
    // 检查是否当前页也被关闭，如果被关闭需要去首页
    checkIsCurrentClose(nextPath?: string) {
      const route = router.currentRoute.value
      const currentRouteTagView = this.tagViews.find(a => a.path === route.path)
      if (!currentRouteTagView) {
        if (nextPath) {
          router.push(nextPath)
        }
      }
    },
    // 全部关闭的时候去首页
    checkIsTagsEmpty() {
      const isEmpty = this.tagViews.length === 0
      if (isEmpty) {
        const path = encodeURIComponent('/')
        router.push(`/redirect/${path}`)
      }
      return isEmpty
    },
    closeAll() {
      this.tagViews = this.tagViews.filter(t => t.affix)
      this.checkIsCurrentClose()
      this.checkIsTagsEmpty()
    },
    closeOthers(payload: TagViewItem) {
      this.tagViews = this.tagViews.filter(t => t.affix || t.path === payload.path)
      this.checkIsCurrentClose(this.tagViews[0].path)
      this.checkIsTagsEmpty()
    },
    closeTag(payload: TagViewItem) {
      const tagViews = this.tagViews
      const closeIndex = tagViews.findIndex(a => a.path === payload.path)
      const nextTag = closeIndex === (tagViews.length - 1) 
        ? tagViews[closeIndex - 1] 
        : tagViews[closeIndex + 1]

      this.tagViews = this.tagViews.filter(t => t.affix || t.path !== payload.path)
      this.checkIsCurrentClose(nextTag?.path)
      this.checkIsTagsEmpty()
    }
  }
})

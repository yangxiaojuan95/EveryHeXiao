import { processdRequest } from '@/utils/request';
import router from '@/router'
import { getCurrentInstance, h, resolveComponent } from 'vue'
import { useAppStore } from '@/store/app';
import { useSystemStore } from '@/store/system';
import { useTagViewsStore } from '@/store/tag-views';
import { useUserStore } from '@/store/user';
import { app } from '@/main'

const useStoreMaps = {
  user: useUserStore,
  app: useAppStore,
  tagViews: useTagViewsStore,
  system: useSystemStore
}

const myH = (type: any, ...rest: any[]) => {
  if (typeof type === 'string') {
    type = resolveComponent(type)
  }
  return h(type, ...rest)
}

const useStore = (name: string) => {
  const func = useStoreMaps[name as keyof typeof useStoreMaps]
  if (func) {
    return func()
  } else {
    return null
  }
}

const useRouter = () => {
  return router
}

const getApp = () => {
  return app
}

const getInstance = () => {
  return app._instance
}

const getProxy = () => {
  return app._instance?.proxy
}

export const getCommonParseContext = () => {
  return {
    processdRequest,
    h: myH,
    createElement: myH,
    getApp,
    getInstance,
    getProxy,
    useStore,
    useRouter,
    invokeDialog: (name: string) => {}
  }
}

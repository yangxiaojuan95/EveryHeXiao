import { RouteRecordRaw } from 'vue-router';
import importMetaGlobEagerDefaultContentTransferer from "@/frame/utils/import-glob-transfer"

const importRoutes = import.meta.globEager('./*.ts')

const routes = Object.values(importMetaGlobEagerDefaultContentTransferer(importRoutes)).reduce((memo, item) => {
  memo = memo.concat(item)
  return memo
}, [] as RouteRecordRaw[])

export default routes

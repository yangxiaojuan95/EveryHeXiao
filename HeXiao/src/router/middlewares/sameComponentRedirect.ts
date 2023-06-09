import { RouteLocationNormalized } from "vue-router";
import { Next } from "..";

export default async function auth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next) {

  // 同样来源的组件 使用重定向重新触发生命周期
  if (to.meta?.origin && to.meta?.origin === from.meta?.origin) {
    next(`/redirect/${encodeURIComponent(to.fullPath)}`)
  }
}

import 'vue-router'

declare module 'vue-router' {
  export interface RouteMeta {
    title: string; // 标题
    hidden?: boolean; // 是否显示出来
    activeMenu?: string; // 当hidden为true时，自身被激活时需要激活的显示菜单path
    affix?: boolean;
    noCache?: boolean; // 是否不缓存
    noView?: boolean; // 是否不插入tagView
  }
}

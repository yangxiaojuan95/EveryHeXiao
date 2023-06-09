<script lang="ts">

export default {
  name: 'MenuList'
}
</script>

<script setup lang="ts">
import { getMatchRoute, isSameRoute } from '@/router/utils';
import { computed } from '@vue/reactivity';
import { onUpdated, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMenuActiveIndexs, getRemovedHiddenMenus } from '../utils';
import MenuItem from './menu-item.vue'

const router = useRouter()
const route = useRoute()

interface Porps {
  menus: TreeObject<MenuModel>[];
  collapse?: boolean;
}
const props = withDefaults(defineProps<Porps>(), {
  collapse: false
})

// 过滤不显示的菜单
const showMenus = computed(() => {
  return getRemovedHiddenMenus(props.menus)
})

// 默认激活菜单
const defaultActiveMenuIndex = ref('')

const refreshMenuActive = () => {
  const path = getMatchRoute(route.path)
  const activeIndexs = getMenuActiveIndexs(showMenus.value, path)
  defaultActiveMenuIndex.value = activeIndexs.join('-')
}

onUpdated(() => {
  refreshMenuActive()
})

watch(() => route.path, () => {
  refreshMenuActive()
}, {
  immediate: true
})

const onSelectMenu = (index: string) => {
  const indexs = index.split('-')
  const lastIndex = indexs.pop()
  const menus = indexs.reduce((memo, key) => {
    return memo[Number(key)].childs ?? []
  }, showMenus.value)

  const menu = menus[Number(lastIndex)]

  if (route.path === menu.url) {
    return false
  }

  if (isSameRoute(route.path, menu.url)) {
    router.push(`/redirect/${encodeURIComponent(menu.url)}`)
  } else {
    router.push(menu.url)
  }
}

</script>

<template>
  <el-menu :default-active="defaultActiveMenuIndex" :collapse="props.collapse" @select="onSelectMenu">
    <template v-for="(menu, index) in showMenus" :key="menu.id">
      <el-sub-menu v-if="menu.childs && menu.childs.length" :index="`${index}`">
        <template #title>
          <menu-item :render-menu-item="false" :menu="menu" />
        </template>
        <menu-item v-for="(cmenu, iindex) in menu.childs" :index="`${index}-${iindex}`" :menu="cmenu" />
      </el-sub-menu>
      <menu-item v-if="!menu.childs" :index="`${index}`" :menu="menu" />
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>

.el-menu {
  border: none;
  
}
.el-sub-menu {
  .el-sub-menu__title {
    &:hover {
      background-color: transparent !important;
    }
  }
}

</style>
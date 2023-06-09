
<script lang="ts">

export default {
  name: 'AsideMenusSystem'
}

</script>

<script setup lang="ts">

import createBEMNameSpace from '@libUtils/bem'
import { computed } from 'vue'
import MenuList from '@/frame/layout/components/menu-list/index.vue'
import MenuCollapseToggle from '@/frame/layout/components/menu-list/menu-collapse-toggle.vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'

const { BEMSpace, createBEMName } = createBEMNameSpace('aside-menus')

const userStore = useUserStore()
const appStore = useAppStore()

const currentUseMenus = computed(() => {
  console.log(userStore.currentUseMenus)
  return userStore.currentUseMenus
})

const collapse = computed(() => {
  return appStore.collapseSystem
})

const onToggleCollapse = (collapse: boolean) => {
  appStore.toggleSystemCollapse()
}

</script>

<template>
  <div :class="BEMSpace">
    <el-scrollbar height="100%" :class="[createBEMName('scroll-wrap'), { empty: !currentUseMenus.length }, { collapse: collapse }]">
      <menu-list v-if="currentUseMenus.length" :collapse="collapse" :menus="currentUseMenus" />
      <menu-collapse-toggle :collapse="collapse" :class="createBEMName('collapse')" @toggle-collapse="onToggleCollapse" />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>

.aside-menus {
  height: 100%;
  padding-top: 10px;
  box-sizing: border-box;
}

.aside-menus__scroll-wrap {
  width: 200px;
  transition: width .3s;

  &.empty {
    width: 65px;
  }

  &.collapse {
    width: 64px;
  }
}

.aside-menus__collapse {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

</style>
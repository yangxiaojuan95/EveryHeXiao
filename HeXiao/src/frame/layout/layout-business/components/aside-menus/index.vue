<script lang="ts">
export default {
  name: 'AsideMenus'
}
</script>

<script setup lang="ts">

import { getMenuActiveIndexs } from '@/frame/layout/components/utils'
import createBEMNameSpace from '@libUtils/bem'
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import MenuList from '@/frame/layout/components/menu-list/index.vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { getMatchRoute } from '@/router/utils'

const { BEMSpace, createBEMName } = createBEMNameSpace('aside-menus')

const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()

const currentIndex = ref(0)

// 当前的菜单列表
const currentUseMenus = computed(() => {
  return userStore.currentUseMenus
})

// 当前的右侧菜单列表
const currentRootMenu = computed(() => {
  return currentUseMenus.value?.[currentIndex.value] || {}
})

// 当前的右侧菜单列表
const currentChildMenus = computed(() => {
  return currentRootMenu.value?.childs ?? []
})

watchEffect(() => {
  if (!currentUseMenus.value) {
    return false
  }
  const path = getMatchRoute(route.path)
  const activeIndexs = getMenuActiveIndexs(currentUseMenus.value, path)
  currentIndex.value = activeIndexs[0] ?? 0
})

const isMenusReady = computed(() => {
  return currentUseMenus.value && currentUseMenus.value.length
})

const collapse = computed(() => {
  return appStore.collapseBusiness
})

const onToggleRootMenu = (index: number) => {
  currentIndex.value = index
}

/**
 * 一级菜单滚动实例
 */
const menuWrapRef = ref<HTMLElement>()


</script>

<template>
  <div :class="BEMSpace">
    <!-- 一级菜单 -->
    <el-scrollbar tag="ul" height="100%" :class="[createBEMName('root-menus'), { empty: !isMenusReady }]">
      <div ref="menuWrapRef">
        <li v-for="(menu, index) in currentUseMenus" :key="menu.id" :class="[createBEMName('root-item'), { active: index === currentIndex }, `menu-${menu.id}`]" @click="onToggleRootMenu(index)">
          <jz-icon :icon="menu.icon" :font-size="20" :class="createBEMName('root-icon')" />
          <span :class="createBEMName('root-item-text')">{{ menu.name }}</span>
        </li>
      </div>
    </el-scrollbar>

    <!-- 二级菜单 -->
    <el-scrollbar height="100%" :class="[createBEMName('child-menus-wrap')]">
      <div :class="createBEMName('current-root-name')">{{ currentRootMenu.name }}</div>
      <menu-list :collapse="collapse" :class="[createBEMName('child-menus'), { empty: !isMenusReady }]" :menus="currentChildMenus" />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>

.aside-menus {
  @include flex;
  height: 100%;
  box-sizing: border-box;
}


// 一级菜单
.aside-menus__root-menus {
  width: 65px;
  text-align: center;
  color: #fff;
  position: relative;
  transition: width .3s;
  background-color: var(--theme);
  &.empty {
    width: 30px;
  }
}

.aside-menus__root-item {
  cursor: pointer;
  overflow-y: auto;
  padding: 15px 0;
  text-align: center;
  font-size: 12px;
  @include flex-direction;
  @include flex-center;
  color: rgba(255, 255, 255, .7);
  transition: all .3s;

  .aside-menus__root-item-text {
    margin-top: 8px;
  }

  &:hover {
    color: #fff
  }

  &.active {
    position: relative;
    font-weight: 700;
    color: #fff;
    background-color: var(--sideThemeActive);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: var(--subTheme);
      z-index: 1;
    }
  }
}


// 子菜单
.aside-menus__child-menus-wrap {
  position: relative;
  padding-bottom: 40px;
  box-sizing: border-box;
}

.aside-menus__child-menus {
  height: 100%;
  background: transparent;
  border: none;


  &:not(.el-menu--collapse) {
    width: 155px;
  }

  &.empty {
    width: 60px;
  }
}

.aside-menus__collapse {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.aside-menus__current-root-name {
  padding: 20px 10px 20px 20px;
  color: var(--theme);
  font-weight: 600;
  font-size: 16px;
}

</style>

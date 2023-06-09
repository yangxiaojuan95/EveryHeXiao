<script lang="ts">
export default {
  name: 'LayoutB'
}

</script>

<script setup lang="ts">

import NavBar from '../components/nav-bar/index.vue'
import MainContent from '../components/main-content/index.vue'
import AsideMenuSystem from './components/aside-menus-system/index.vue'

import createBEMNameSpace from '@/frame/utils/bem'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useUserStore } from '@/store/user'

const { BEMSpace, createBEMName } = createBEMNameSpace('layout-b')

const route = useRoute()
const userStore = useUserStore()

watch(() => route.path, () => {
  userStore.updateCurrentMenu()
}, {
  immediate: true
})

</script>

<template>
  <div :class="BEMSpace">
    <nav-bar :class="createBEMName('nav-bar')" />
    <div :class="createBEMName('content-wrap')">
      <aside-menu-system :class="createBEMName('aside-menu')" />
      <div :class="createBEMName('main-wrap')">
        <main-content :class="createBEMName('main')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.layout-b {
  height: 100%;
  @include flex-direction;
  background-color: #fff;
}

.layout-b__nav-bar {
  flex-shrink: 0;
}

.layout-b__content-wrap {
  @include fg1;
  height: 0;

  @include flex;
}

.layout-b__aside-menu {
  @include fs0;
}

.layout-b__main-wrap {
  @include fg1;
  width: 0;

  border: 10px solid var(--pageBg);
  @include flex-direction;
}

.layout-b__main {
  flex-grow: 1;
  height: 0;
}

</style>
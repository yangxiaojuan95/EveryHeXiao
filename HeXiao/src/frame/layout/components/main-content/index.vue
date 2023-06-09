<template>
  <div :class="BEMSpace">
    <div :class="createBEMName('content-view')">
      <JzPageStatus>
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cacheList">
              <component :is="Component" :class="createBEMName('page-output')" />
            </keep-alive>
          </transition>
        </router-view>
      </JzPageStatus>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainContent',
}
</script>

<script setup lang="ts">

import { useTagViewsStore } from '@/store/tag-views';
import createBEMNameSpace from '@libUtils/bem'
import { computed } from 'vue';

const { BEMSpace, createBEMName } = createBEMNameSpace('main-content')

const tagViewStore = useTagViewsStore()

const cacheList = computed(() => {
  return []
  
  return tagViewStore.tagViews
    .filter(a => a.cache !== false && a.name)
    .map(a => a.name) as string[]
})

</script>

<style lang="scss" scoped>

.main-content__content-view {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.main-content__page-output {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #f0f2f5;
}
</style>
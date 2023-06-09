<template>
  <div :class="BEMSpace">
    <user-company-info :class="createBEMName('user-company-info')" />

    <el-button v-if="isSystemRoute" round type="primary" :icon="HomeFilled" :class="createBEMName('back')" @click="backToHome">返回工作台</el-button>

    <div :class="createBEMName('empty')"></div>

    <div :class="createBEMName('tools')">
      <tool-screenfull />
    </div>

    <notification v-if="useNotification" />

    <user-base-info :class="createBEMName('user-base-info')" @guide="emit('guide')" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'NavBar'
}
</script>

<script setup lang="ts">

import createBEMNameSpace from '@libUtils/bem'
import UserBaseInfo from './components/user-base-info/index.vue'
import UserCompanyInfo from './components/user-company-info/index.vue'
import ToolScreenfull from './components/tool-screenfull/index.vue'
import Notification from './components/notification/index.vue'

import { HomeFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { MenuType } from '@/models/system/menu'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useNotification } from '@/config/setting'

const emit = defineEmits<{
  (e: 'guide'): void;
}>()

const { BEMSpace, createBEMName } = createBEMNameSpace('nav')

const router = useRouter()
const userStore = useUserStore()

const isSystemRoute = computed(() => {
  return userStore.currentMenuType === MenuType['系统菜单']
})

const backToHome = () => {
  router.push('/')
}

</script>

<style lang="scss" scoped>

.nav {
  @include flex-c-center;
  padding-right: 20px;
  height: 54px;
  box-shadow: 0 1px 0 0 #eee;
  background-color: #fff;
  z-index: 1;
  color: #000;
}

.nav__user-company-info {
  @include fs0;
}

.nav__back {
  margin-left: 20px;
  background-color: #fff !important;
  color: var(--theme) !important;
}

.nav__empty {
  flex-grow: 1;
  width: 0;
}

.nav__tools {
  @include fs0;
  margin-right: 30px;
}

.nav__user-base-info {
  @include fs0;
}

</style>
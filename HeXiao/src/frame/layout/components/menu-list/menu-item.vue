<script lang="ts">
export default {
  name: 'MenuItem'
}
</script>

<script setup lang="ts">

import createBEMNameSpace from '@/frame/utils/bem';

const { createBEMName, BEMSpace } = createBEMNameSpace('menu-item')

interface Porps {
  menu: TreeObject<MenuModel>;
  renderMenuItem?: boolean;
}

const props = withDefaults(defineProps<Porps>(), {
  renderMenuItem: true
})

</script>

<template>

  <template v-if="renderMenuItem">
    <el-menu-item :class="BEMSpace">
      <!-- <jz-icon v-if="props.menu.icon" :icon="props.menu.icon" :class="createBEMName('icon')" /> -->
      <template #title>
        <span :class="createBEMName('text')">{{ props.menu.name }}</span>
      </template>
    </el-menu-item>
  </template>

  <template v-else>
    <jz-icon v-if="props.menu.icon" :icon="props.menu.icon" :class="createBEMName('icon')" />
    <span :class="createBEMName('text')">{{ props.menu.name }}</span>
  </template>

</template>

<style lang="scss" scoped>

.menu-item {
  height: 40px;
  line-height: 40px;
  @include flex-c-center;
  color: #777;

  .menu-item__icon {
    text-align: left;
  }

  &:hover {
    background-color: var(--hoverBg);
    .menu-item__icon {
      color: var(--theme);
    }

    .menu-item__text {
      color: #000;
      font-weight: 600;
    }
  }

  &.is-active {
    position: relative;
    background-color: var(--themeLight);

    .menu-item__icon {
      color: var(--theme);
    }

    .menu-item__text {
      color: #000;
      font-weight: 600;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 4px;
      bottom: 0;
      background-color: var(--theme);
    }
  }
}

.menu-item__icon {
  margin-right: 10px;
  @include fs0;
}

.menu-item__text {
  font-size: 14px;
  @include fg1;
}

</style>
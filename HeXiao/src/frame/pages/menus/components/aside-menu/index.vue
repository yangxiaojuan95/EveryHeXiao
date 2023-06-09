<script lang="ts">

export default {
  name: 'AsideMenu'
}
</script>

<script setup lang="ts">
  
  import { EditPen, Delete, CirclePlus } from '@element-plus/icons-vue'
  
  interface Props {
    current: number;
    menus: MenuModel[]
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:current', current: number): void;
    (e: 'edit', menu: MenuModel, index: number): void;
    (e: 'del', menu: MenuModel, index: number): void;
    (e: 'add-root-menu'): void;
    (e: 'add-child-menu', menu: MenuModel, index: number): void;
  }>()

  const onSelect = (menu: MenuModel, index: number) => {
    emit('update:current', index)
  }

  const onEdit = (menu: MenuModel, index: number) => {
    emit('edit', menu, index)
  }

  const onDel = (menu: MenuModel, index: number) => {
    emit('del', menu, index)
  }

  const onAddFaMenu = () => {
    emit('add-root-menu')
  }

  const onAddChild = (menu: MenuModel, index: number) => {
    emit('add-child-menu', menu, index)
  }

</script>

<template>
  <div class="aside-menu">
    <div class="add-father">
      <jz-icon icon="fa-solid fa-bars" :fontSize="20" />
      <span class="btn-add-fa" @click="onAddFaMenu">新增菜单</span>
    </div>
    <el-scrollbar
      :vertical="true"
      class="scroll-menu-container"
    >
      <div
        v-for="(menu, index) in props.menus"
        :key="menu.id"
        class="fa-item"
        :class="{'selected': index === props.current}"
        @click="onSelect(menu, index)"
      >
        <span class="menu-text">{{ menu.name }}</span>
        <el-tooltip class="item" effect="dark" content="新增菜单" placement="top-start">
          <el-icon class="menu-icon" :size="14" @click.stop="onAddChild(menu, index)">
            <CirclePlus />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑菜单" placement="top-start">
          <el-icon class="menu-icon" :size="14" @click.stop="onEdit(menu, index)">
            <EditPen />
          </el-icon>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除菜单" placement="top-start">
          <el-icon class="menu-icon" :size="14" @click.stop="onDel(menu, index)">
            <Delete />
          </el-icon>
        </el-tooltip>
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang='scss'>

.add-father {
  color: var(--theme);
  height: 24px;
  display: flex;
  align-items: center;
  .btn-add-fa {
    margin-left: 10px;
    cursor: pointer;
  }
}

.scroll-menu-container {
  height: calc(100% - 20px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .fa-item {
    margin: 10px 10px 10px 20px;
    color: #666666;
    padding: 12px 18px;
    cursor: pointer;
    transition: background-color 1s, color .3s;
    font-size: 14px;
    position: relative;
    display: flex;
    .menu-text {
      flex-grow: 1;
    }

    .menu-icon {
      flex-shrink: 0;
      color: #999;
      margin-left: 10px;
    }

    &::after {
      content: '';
      position: absolute;
      width: 5px;
      top: 50%;
      right: 0;
      bottom: 50%;
      background-color: var(--theme);
      transition: top .2s, bottom .2s;
    }

    &.selected {
      background-color: var(--themeLight);
      color: var(--theme);
      &::after {
        top: 0;
        bottom: 0;
      }
    }
    &:hover {
      background-color: var(--themeLight);
    }
  }
}
</style>

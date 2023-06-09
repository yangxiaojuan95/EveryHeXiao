<template>
  <el-scrollbar
    :vertical="true"
    class="scroll-menu-container"
  >
    <div
      v-for="(role, index) in roles"
      :key="role.id"
      class="fa-item"
      :class="{'selected': index === current}"
      @click="onSelect(role, index)"
    >
      <span class="role-text">{{ role.name }}</span>
      <el-tooltip class="item" effect="dark" content="页面权限" placement="top-start">
        <el-icon>
          <View @click.stop="editPower(role)" />
        </el-icon>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑角色" placement="top-start">
        <el-icon>
          <EditPen @click.stop="onEdit(role, index)" />
        </el-icon>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除角色" placement="top-start">
        <el-icon>
          <Delete @click.stop="onDel(role, index)" />
        </el-icon>
      </el-tooltip>
    </div>

    <power-form ref="powerFormRef" />

  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import PowerForm from './components/power-form.vue'

import { View, EditPen, Delete } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'roles',
  components: {
    PowerForm,
    View, EditPen, Delete
  },
  props: {
    roles: {
      type: Array as PropType<RoleModel[]>,
      default: () => ([])
    },
    current: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {

    const powerFormRef = ref<any>(null)

    const editPower = (role: RoleModel) => {
      powerFormRef.value.setValue(role)
    }

    const onSelect = (role: RoleModel, index: number) => {
      emit('update:current', index)
    }

    const onEdit = (role: RoleModel, index: number) => {
      emit('edit', role, index)
    }

    const onDel = (role: RoleModel, index: number) => {
      emit('del', role, index)
    }

    return {
      powerFormRef,

      editPower,
      onSelect,
      onEdit,
      onDel
    }
  }
})
</script>

<style lang='scss'>
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
    .role-text {
      flex-grow: 1;
    }
    i {
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
      background-color: #EDFFF7;
      color: var(--theme);
      &::after {
        top: 0;
        bottom: 0;
      }
    }
    &:hover {
      background-color: #EDFFF7;
    }
  }
}
</style>

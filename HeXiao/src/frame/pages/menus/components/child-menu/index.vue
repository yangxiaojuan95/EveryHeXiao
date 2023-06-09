<template>
  <div class="table-wrap">
    <el-table :data="props.menus">
      <el-table-column prop="name" label="名称" />
      <el-table-column label="图标">
        <template v-slot="{row}">
          <jz-icon :icon="row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="order" label="排序" />
      <el-table-column label="操作">
        <template v-slot="{row, $index}">
          <el-button type="text" size="small" @click="showFunc(row, $index)">操作权限</el-button>
          <el-button type="text" size="small" @click="editMenu(row, $index)">编辑</el-button>
          <el-button type="text" size="small" @click="delMenu(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">

interface Props {
  menus: MenuModel[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'del', menu: MenuModel, index: number): void;
  (e: 'edit', menu: MenuModel, index: number): void;
  (e: 'showFunc', menu: MenuModel, index: number): void;
}>()

const delMenu = (menu: MenuModel, index: number) => {
  emit('del', menu, index)
}

const showFunc = (menu: MenuModel, index: number) => {
  emit('showFunc', menu, index)
}

const editMenu = (menu: MenuModel, index: number) => {
  emit('edit', menu, index)
}

</script>

<style lang="scss" scoped>
.table-wrap {
  padding: 20px 40px;
  .btn {
    color: #606266;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    &+.btn {
      margin-left: 10px;
    }
  }
}
</style>

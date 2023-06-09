<template>
  <el-dialog v-model="isShow" title="操作">
    <el-button type="success" @click="addFunc">新增操作</el-button>
    <el-table :data="funcs">
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作">
        <template v-slot="{row, $index}">
          <el-button type="text" size="small" @click="delFunc(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShowForm" title="操作">
      <el-form class="menu-form" label-width="100px">
        <el-form-item label="操作名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item>
          <div class="pop-center-btn-wrap">
            <el-button :loading="isLoading" type="success" @click="submit">
              添加操作
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { MenuType } from '@/models/system/menu';
import { addFuncAsync, delFuncAsync } from '@/apis/system/menu';

const emit = defineEmits<{
  (e: 'refresh'): void;
}>()

const menuId = ref()

const funcs = ref<FuncModel[]>([])

const isLoading = ref(false)

const isShow = ref(false)

const isShowForm = ref(false)

let formData = ref<any>({})

const pIdList = ref<number[]>([])

const show = (menu: MenuModel) => {
  menuId.value = menu.id
  isShow.value = true
  funcs.value = menu.functions
}

defineExpose({
  show
})

const submit = async() => {
  isLoading.value = true
  try {
    await addFuncAsync(formData.value)
    ElMessage.success('新增操作成功!')
    isShow.value = false
    emit('refresh')
  } catch(e) {
  } finally {
    isLoading.value = false
  }
}

const addFunc = () => {
  formData.value.menuId = menuId.value
  isShowForm.value = true
}

const delFunc = async(row: FuncModel) => {
  isLoading.value = true
  await delFuncAsync(row)
  ElMessage.success('删除菜单成功!')
  isShowForm.value = false
  isLoading.value = false
  emit('refresh')
}

</script>

<style lang="scss">
.menu-icon {
  padding-top: 6px;
  .svg-box {
    display: inline-block;
    padding: 4px;
    cursor: pointer;
    line-height: 1;
    margin-bottom: 10px;
    &.selected {
      background-color: #eee;
    }
  }
}
</style>

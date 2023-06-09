<script setup lang="tsx">

import { convertEnumToList } from '@/frame/utils/enum-helper';
import { RoleTypeEnum } from '@/models/business/common/enum';
import { processdRequest } from '@/utils/request';
import { CirclePlus, Edit, DeleteFilled, Close, Check, Files } from '@element-plus/icons-vue'
import { defineConfig } from '@juzhenfe/page-model';
import { ElMessage, ElMessageBox } from 'element-plus';
import { markRaw, nextTick, onMounted, ref } from 'vue';
import PowerForm from './components/power-form.vue'

const powerFormRef = ref<any>(null)
const config = defineConfig<any>({
  getMethod: 'get',
  getUrl: '/api/Role/GetRoles',
  addMethod: 'get',
  addUrl: '/api/Role/Add',
  updMethod: 'get',
  updUrl: '/api/Role/Edit',
  delKey: 'id',
  isAutoAddButton: false,
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'ID'
    },
    events: {
      selectionChange(selections) {
        currentSelections = selections
      }
    },
    selectable: true,
    selectableButtons: [
      {
        text: '新增',
        event: 'add',
        props: {
          type: 'primary',
          icon: markRaw(CirclePlus)
        }
      },
      {
        text: '编辑',
        event: 'update',
        props: {
          type: 'primary',
          icon: markRaw(Edit)
        }
      },
      // {
      //   text: '删除',
      //   event: 'delete',
      //   props: {
      //     type: 'danger',
      //     icon: markRaw(DeleteFilled)
      //   }
      // }
    ],
    operate: {
      width: 85,
      els: [
        {
          text: '权限',
          event: 'power',
          props: {
            type: 'primary',
            // link: true
          }
        }
      ]
    },
    els: [
      {
        prop: 'Name',
        label: '角色名称'
      },
      {
        prop: 'CreateTime',
        label: '创建时间'
      },
      // {
      //   label: '角色类型',
      //   renderFn(row) {
      //     return (
      //       <div>{ RoleTypeEnum[row.roleType] }</div>
      //     )
      //   }
      // },
    ]
  },
  form: {
    mode: 'dialog',
    dialogProps: {
      title: '角色',
      width: '500px'
    },
    props: {
      labelWidth: '120px'
    },
    required: ['Name'],
    initialData: {
      // isSystem: false
    },
    els: [
      {
        eType: 'el-input',
        prop: 'Name',
        label: '角色名称'
      },
      // {
      //   eType: 'el-select',
      //   prop: 'roleType',
      //   label: '角色类型',
      //   optionsData: {
      //     list: convertEnumToList(RoleTypeEnum)
      //   }
      // }
    ]
  }
})
const pageModelRef = ref<any>()
const refreshTableData = (clear: boolean = false) => {
  pageModelRef.value.refreshTableData()
  clear && pageModelRef.value.clearSelection()
}
// 当前选中的数据
let currentSelections: any[] = []

// 校验是否选中数据
const selectDataValidate = () => {
  if (!currentSelections.length) {
    ElMessage.warning('请选择一条数据')
    return false
  }
  return true
}
const handleAdd = () =>{
  pageModelRef.value.handleAddEvent()
}

const handleUpdate = () =>{
  if (!selectDataValidate()) {
    return false
  }
  let data = {
    ID: currentSelections[0].ID,
    Name: currentSelections[0].Name
  }
  pageModelRef.value.handleUpdEvent(data)
}

const editPower = (role: RoleModel) => {
  console.log('id',role)
  powerFormRef.value.setValue(role)
}

</script>

<template>
  <div style="height: 100%">
    <page-model v-if="config" ref="pageModelRef" @add="handleAdd" @update="handleUpdate" :config="config" @power="editPower"></page-model>

    <!-- 权限表单 -->
    <power-form ref="powerFormRef" />
  </div>
</template>

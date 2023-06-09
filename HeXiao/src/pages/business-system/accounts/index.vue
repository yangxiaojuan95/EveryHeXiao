<script lang="tsx">
export default {
  name: 'Accounts',
}
</script>

<script setup lang="tsx">
import { processdRequest } from '@/utils/request';
import { defineConfig , PageModelForm , FormDialog} from '@juzhenfe/page-model';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref, watch, nextTick, markRaw, render } from 'vue';
import { CirclePlus, Edit, DeleteFilled, Close, Check, Files } from '@element-plus/icons-vue'
import md5 from 'blueimp-md5';
import { genCode } from '@/utils/gen-code';
import { Console } from 'console';
import { triggerImportFile } from '@/utils';
import { baseURL , pathUrl} from '@/config';

// 当前选中的数据
let currentSelections: any[] = []
const visible = ref(false)
const currentTypeId = ref<string>('')

const getValidSelections = () => {
  if (currentSelections.length) {
    return currentSelections
  } else {
    ElMessage.warning('请选中要操作的数据')
    return false
  }
}

const reflections = reactive<{
  roleList: RoleModel[],
}>({
  roleList: [],
})
;(async () => {
  const result = await processdRequest.get('/api/Admin/GetRoleDtoList');
  reflections.roleList = result.data
})()

const config = defineConfig<any>({
  getUrl: '/api/Admin/Index',
  addUrl: '/api/Admin/Add',
  updUrl: '/api/Admin/Edit',
  delKey: 'id',
  reflect: true,
  isAutoAddButton: false,
  searchForm: {
    els: [
      {
        eType: 'el-input',
        prop: 'Keyword',
        props: {
          placeholder: '帐号/用户姓名/工号/手机号',
          clearable: true
        },
        style: {
          width: '200px'
        }
      }
    ]
  },
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'AdminID'
    },
    // 表格操作栏
    operate: {
      width: '85px',
      els: [
        {
          text: '删除',
          event: 'delete',
          props: {
            type: 'danger',
          }
        }
      ]
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
      }
    ],
    els: [
      {
        prop: 'Code',
        label: '帐号编号',
      },
      {
        prop: 'Account',
        label: '账号',
        renderFn(row) {
          return (
            <code-cell row={row} prop='Account' ctx={this} />
          )
        }
      },
      {
        prop: 'Role',
        label: '角色名',
      },
      {
        prop: 'UserName',
        label: '用户姓名',
      },
      {
        prop: 'Phone',
        label: '手机号',
      },
      {
        prop: 'IsLock',
        label: '锁定',
        renderFn(row){
          return <el-tag type={row.IsLock?'error':'success'}>{row.IsLock?'已锁定':'未锁定'}</el-tag>
          // if(row.IsLock === true){
          //   return <span>已锁定</span>
          // }else{
          //   return <span>未锁定</span>
          // }
        }
      },
      {
        prop: 'CreateTime',
        label: '创建时间',
        // width: 155,
        renderFn(row){
          // return <span>{(row.CreateTime.replace('T',' ').split('.')[0])}</span>
          return <span>{(row.CreateTime.split('T')[0])}</span>
        }
      },
    ]
  },
  form: {
    mode: 'dialog',
    // dialogProps: {
    //   title: '账号',
    //   width: '700px'
    // },
    props: {
      labelWidth: '80px',
    },
    async bindData(formData) {
      if (!formData.Code) {
        formData.Code = await genCode({
          type: '后台账号',
        });
      }
      return formData
    },
    async beforeSubmit(formData) {
      let newFormData = {
        ...formData
      }
      formData.Id = formData.AdminID
      // if (!newFormData.id) {
      //   if (!newFormData.password) {
      //     newFormData.Password = '123456'
      //   }
      //   newFormData.Password = md5(newFormData.Password)
      // }
      if(formData.Password !== undefined){
        formData.Password = md5(formData.Password)
      }
       
      // newFormData.rolesId = [newFormData.roleId]
      return formData
    },
    required: [
      'Account',
      'UserName',
      'Phone',
      'RoleID'
    ],
    initialData: {},
    els: [
      {
        eType: 'el-input',
        label: '编号',
        prop: 'Code',
        props: {
          disabled: true
        }
      },
      {
        eType: 'el-input',
        prop: 'Account',
        label: '账号',
        isDisabled(row) {
          return Boolean(row.id)
        },
        helpText: '账号不可重复'
      },
      {
        eType: 'el-input',
        prop: 'Password',
        label: '密码',
        props: {
          showPassword: true,
          type: 'password',
          placeholder: '请输入新密码'
        },
        // helpText: '不填写则使用默认密码123456',
        // isShow(self,data) {
        //   return !data.AdminID
        // }
      },
      {
        eType: 'el-input',
        label: '用户姓名',
        prop: 'UserName',
      },
      {
        eType: 'el-input',
        label: '用户号码',
        prop: 'Phone',
      },
      {
        label: '角色',
        eType: 'el-select',
        prop: 'RoleID',
        optionsData: {
          list: [],
          _reflect: 'roleList',
          label: 'RoleName',
          value: 'RoleID'
        },
        props: {
          clearable: true,
          placeholder: '角色'
        },
        style: {
          flexGrow: 1
        }
      },
      {
        eType: 'el-switch',
        label: '是否锁定',
        prop: 'IsLock',
        isShow(self,data) {
          return data.AdminID
        }
      }
    ]
  }
})

const pageModelRef = ref<any>()
const refreshTableData = (clear: boolean = false) => {
  pageModelRef.value.refreshTableData()
  clear && pageModelRef.value.clearSelection()
}

// 校验是否选中数据
const selectDataValidate = () => {
  if (!currentSelections.length) {
    ElMessage.warning('请选择一条数据')
    return false
  }
  return true
}

// 新增
const handleAdd = () => {
  pageModelRef.value.handleAddEvent()
  // refreshTableData(true)
}

// 更新
const handleUpdate = () => {
  if (!selectDataValidate()) {
    return false
  }
  pageModelRef.value.handleUpdEvent(currentSelections[0])
  // refreshTableData(true)
}

// 删除
const handleDelete = async (row: any) => {
  // if (!selectDataValidate()) {
  //   return false
  // }
  await ElMessageBox.confirm('是否确定删除选中数据?', '删除', {
    type: 'error'
  })
  await processdRequest.get('/api/Admin/AdminDel',{adminid: row.AdminID})
  ElMessage.success('删除成功!')
  refreshTableData(true)
}

</script>

<template>
  <div class="accounts">
    <page-model
      class="page-model"
      ref="pageModelRef"
      :config="config"
      :reflections="reflections"
      @add="handleAdd"
      @update="handleUpdate"
      @delete="handleDelete"
    >
    </page-model>

  </div>
</template>

<style lang="scss" scoped>
.accounts {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: rgb(244, 244, 244);
}

.page-model {
  flex-grow: 1;
  width: 0;
  background-color: #fff;
}
</style>
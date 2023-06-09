<script lang="tsx">
export default {
  name: 'Accounts',
}
</script>

<script setup lang="tsx">
import { pathUrl } from '@/config';
import { processdRequest } from '@/utils/request';
import { defineConfig , PageModelForm , FormDialog} from '@juzhenfe/page-model';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref, watch, nextTick, markRaw, render } from 'vue';

// 当前选中的数据
let currentSelections: any[] = []

const reflections = reactive<{
}>({
})

const config = defineConfig<any>({
  getUrl: '/api/BackUser/Index',
  delKey: 'id',
  reflect: true,
  isAutoAddButton: false,
  getReqResultProcessFn(result) {
    return {
      list: result.List,
      total: result.total
    }
  },
  searchForm: {
    els: [
      {
        eType: 'el-input',
        prop: 'Name',
        props: {
          placeholder: '姓名',
          clearable: true
        }
      },
      {
        eType: 'el-input',
        prop: 'Phone',
        props: {
          placeholder: '电话号',
          clearable: true
        }
      }
    ]
  },
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'UserID'
    },
    // 表格操作栏
    operate: {
      width: '85px',
      els: [
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
        text: '锁定/解锁',
        event: 'isLock',
        props: {
          type: 'primary'
        }
      }
    ],
    els: [
      {
        prop: 'Phone',
        label: '手机号',
      },
      {
        prop: 'NickName',
        label: '微信昵称',
      },
      {
        prop: 'Image',
        label: '头像',
        renderFn(row) {
          console.log(row.Image.search('http'),'row.Image.search()')
          return <el-image style={{width: '50px',height: '50px'}} src={row.Image.search('http') === -1?`${pathUrl}${row.Image}`: row.Image}/>
        }
      },
      {
        prop: 'LastLoginTime',
        label: '最近登录时间',
      },
      {
        prop: 'IsLock',
        label: '锁定',
        renderFn(row){
          return <el-tag type={row.IsLock?'error':'success'}>{row.IsLock?'已锁定':'未锁定'}</el-tag>
        }
      },
      {
        prop: 'CreateTime',
        label: '创建时间',
        renderFn(row){
          return <span>{(row.CreateTime.split('T')[0])}</span>
        }
      },
    ]
  },
  form: {
    mode: 'dialog',
    props: {
      labelWidth: '80px',
    },
    async bindData(formData) {
      return formData
    },
    async beforeSubmit(formData) {
      return formData
    },
    required: [],
    initialData: {},
    els: []
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

// 锁定/解锁
const handleIsLock =async () => {
  if (!selectDataValidate()) {
    return false
  }
  await processdRequest.get(
    '/api/BackUser/Lock',
    {
        UserID: currentSelections[0].UserID
    }
  )
  ElMessage.success('成功！');
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
      @isLock="handleIsLock"
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
<script lang="tsx">
export default {
  name: 'Accounts',
}
</script>

<script setup lang="tsx">
import { processdRequest } from '@/utils/request'
import { CirclePlus, DeleteFilled, Edit } from '@element-plus/icons-vue'
import { defineConfig, PageModelForm, FormDialog } from '@juzhenfe/page-model'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref, watch, nextTick, markRaw, render } from 'vue'
import { pathUrl } from '@/config'
import UploadImg from '../../basic-info/goods-management/components/upload/upload-img.vue'

// 当前选中的数据
let currentSelections: any[] = []

const reflections = reactive<{}>({})
let userIcon = ref()

const config = defineConfig<any>({
  getUrl: '/api/BackXcxSetting/Index',
  addUrl: '/api/BackXcxSetting/AddTheme',
  updUrl: '/api/BackXcxSetting/EditTheme',
  delKey: 'id',
  reflect: true,
  isAutoAddButton: false,
  getReqResultProcessFn(result) {
    userIcon.value = result.UserIcon
    return {
      list: result.ThemeList,
      total: result.total,
    }
  },
  searchForm: {
    els: [],
  },
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'ThemeID',
    },
    // 表格操作栏
    operate: {
      width: '85px',
      els: [],
    },
    events: {
      selectionChange(selections) {
        currentSelections = selections
      },
    },
    selectable: true,
    selectableButtons: [
      {
        text: '新增',
        event: 'add',
        props: {
          type: 'primary',
          icon: markRaw(CirclePlus),
        },
      },
      {
        text: '编辑',
        event: 'update',
        props: {
          type: 'primary',
          icon: markRaw(Edit),
        },
      },
      {
        text: '删除',
        event: 'delete',
        props: {
          type: 'danger',
          icon: markRaw(DeleteFilled),
        },
      },
    ],
    els: [
      {
        prop: 'BackgroundTheme',
        label: '图片',
        renderFn(row) {
          return (
            <el-image
              style={{ width: '100px' }}
              src={`${pathUrl}${row.BackgroundTheme}`}
            />
          )
        },
      },
      {
        prop: 'Name',
        label: '主题',
      },
      // {
      //   prop: '',
      //   label: '默认',
      // },
      // {
      //   prop: 'CreateTime',
      //   label: '创建时间',
      //   renderFn(row){
      //     return <span>{(row.CreateTime.split('T')[0])}</span>
      //   }
      // },
    ],
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
    required: ['BackgroundTheme', 'Name'],
    initialData: {
      IsDefault: true,
    },
    els: [
      {
        prop: 'Name',
        label: '主题',
        eType: 'el-input',
      },
      {
        prop: 'BackgroundTheme',
        label: '背景图片',
        // eType: 'img-upload',
        renderFn(row) {
          let onUpload = (e: any) => {
            row.BackgroundTheme = e
          }
          return (
            <UploadImg
              modelValue={row.BackgroundTheme}
              mult={false}
              onUpdate:modelValue={onUpload}
            />
          )
        },
        helpText: '像素：1000x500   大小：500k以下',
      },
      {
        prop: 'IsDefault',
        label: '是否默认',
        eType: 'el-switch',
      },
    ],
  },
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
}

// 更新
const handleUpdate = async () => {
  if (!selectDataValidate()) {
    return false
  }
  pageModelRef.value.handleUpdEvent(currentSelections[0])
}

// 删除
const handleDelete = async () => {
  if (!selectDataValidate()) {
    return false
  }
  await ElMessageBox.confirm('是否确定删除选中数据?', '删除', {
    type: 'error',
  })
  await processdRequest.post('/api/BackXcxSetting/DelTheme', {
    IdList: currentSelections.map((a) => {
      return a.ThemeID
    }),
  })
  ElMessage.success('删除成功!')
  refreshTableData(true)
}

const handleClick = async () => {
  console.log(userIcon.value, 'userIcon')
  await processdRequest.post('/api/BackXcxSetting/UpdateIcon', {
    UserIcon: userIcon.value,
  })
  ElMessage.success('更换成功！')
  refreshTableData(true)
}
const onUpload = (val: any) => {
  userIcon.value = val
}
</script>

<template>
  <div>
    <div class="img">
      <div class="box">
        <el-form-item label="默认头像">
          <!-- <img-upload v-model="userIcon"></img-upload> -->
          <UploadImg
            :type="1"
            :modelValue="userIcon"
            :mult="false"
            @Update:modelValue="
              {
                onUpload
              }
            "
          />
        </el-form-item>
        <el-button class="button" type="primary" @click="handleClick"
          >确认更换</el-button
        >
      </div>
      <div class="title">像素：200x200 大小：300k以下</div>
    </div>

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
  </div>
</template>

<style lang="scss" scoped>
.img {
  padding: 20px 0 10px 20px;
  .title {
    color: #777777;
  }
}
.box {
  display: flex;
  align-items: self-end;
  // background-color: rgb(244, 244, 244);
}
.button {
  margin-left: 20px;
  margin-bottom: 30px;
}
.accounts {
  height: 80%;
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

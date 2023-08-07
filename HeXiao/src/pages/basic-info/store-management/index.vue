<script lang="tsx">
export default {
  name: 'GoodsManagement',
}
</script>

<script setup lang="tsx">
import { processdRequest } from '@/utils/request'
import { defineConfig } from '@juzhenfe/page-model'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref, markRaw, watch, nextTick } from 'vue'
import {
  CirclePlus,
  Edit,
  DeleteFilled,
  Close,
  Check,
  Files,
} from '@element-plus/icons-vue'
import { genCode } from '@/utils/gen-code'
import StoreClass from './components/store-class/index.vue'
import APIS from '@/constants/apis'
import UploadImg from '../goods-management/components/upload/upload-img.vue'
import { pathUrl } from '@/config'
import SubAccount from './components/sub-account/index.vue'

const reflections = reactive<{
  classList: any
  categoryList: any
}>({
  classList: [],
  categoryList: [],
})

;(async () => {
  const result = await processdRequest.get('/api/BackGoods/GetClassList')
  reflections.classList = result.data
})()

// 当前选中的数据
let currentSelections: any[] = []

const config = defineConfig<any>({
  getUrl: '/api/BackShop/Index',
  addUrl: '/api/BackShop/AddShop',
  updUrl: '/api/BackShop/EditShop',
  isAutoAddButton: false,
  reflect: true,
  otherParams: {},
  searchForm: {
    els: [
      {
        eType: 'el-input',
        prop: 'Name',
        props: {
          placeholder: '商品名称',
          clearable: true,
        },
      },
    ],
  },
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'ShopID',
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
      {
        text: '子账号',
        event: 'sub',
        props: {
          type: 'primary',
        },
      },
    ],

    els: [
      {
        prop: 'ShopName',
        label: '店铺名称',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: 'Address',
        label: '所在地址',
      },
      {
        prop: 'AreaName',
        label: '区域',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: 'Image',
        label: '图片',
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return (
            <el-image
              width="100px"
              height="100px"
              src={`${pathUrl}${row.Image}`}
            ></el-image>
          )
        },
      },
      {
        prop: 'Lng',
        label: '经度',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: 'Lat',
        label: '维度',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: 'Contacts',
        label: '联系人',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: 'Telephone',
        label: '联系电话',
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: 'Telephone',
        label: '登录二维码',
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          const handleClick = () => {
            handleScanningCode(row)
          }
          return (
            <el-button type="primary" onClick={handleClick}>
              二维码
            </el-button>
          )
        },
      },
      {
        prop: 'CreateTime',
        label: '创建时间',
        minWidth: 180,
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <span>{row.CreateTime.split('T')[0]}</span>
        },
      },
    ],
  },
  form: {
    mode: 'fullpage',
    dialogProps: {
      title: '店铺',
      // width: "500px",
    },
    required: [],
    props: {
      labelWidth: '100px',
    },
    async bindData(formData) {
      if (!formData.Code) {
        formData.Code = await genCode({
          type: '店铺',
        })
      }
      if (formData.Lng) {
        formData._location = [formData.Lng, formData.Lat]
      } else {
        // 不存在经纬度的情况下，提供一个默认的地图所在地
        formData._location = [116, 30]
      }
      return formData
    },
    async beforeSubmit(formData) {
      ;[formData.Lng, formData.Lat] = formData._location
      return formData
    },
    initialData: {
      enabled: true,
    },
    els: [
      {
        eType: 'el-input',
        prop: 'Code',
        label: '店铺代码',
        props: {
          disabled: true,
          placeholder: '店铺代码',
        },
        col: {
          span: 12,
        },
      },
      {
        eType: 'el-input',
        prop: 'ShopName',
        label: '名称',
        props: {
          placeholder: '名称',
        },
        col: {
          span: 12,
        },
      },
      {
        eType: 'el-input',
        prop: 'Contacts',
        label: '联系人',
        props: {
          placeholder: '联系人',
        },
        col: {
          span: 12,
        },
      },
      {
        eType: 'el-input',
        prop: 'Telephone',
        label: '联系电话',
        props: {
          placeholder: '联系电话',
        },
        col: {
          span: 12,
        },
      },
      {
        eType: 'el-select',
        prop: 'AreaID',
        label: '区域',
        col: {
          span: 12,
        },
        style: {
          flexGrow: 1,
        },
        optionsData: {
          list: [],
          _reflect: 'categoryList',
          label: 'AreaName',
          value: 'AreaID',
        },
      },
      {
        eType: 'img-upload',
        prop: 'Image',
        label: '主图',
        props: {
          // mult: false,
          // drag: true,//拖动
        },
        col: {
          span: 12,
        },
        renderFn(row) {
          let onUpload = (e: any) => {
            row.Image = e
          }
          return (
            <UploadImg
              modelValue={row.Image}
              mult={false}
              onUpdate:modelValue={onUpload}
            />
          )
        },
        helpText: '像素：500x500   大小：500k以下',
      },
      {
        eType: 'a-map',
        label: '活动地址',
        prop: '_location',
        props: {
          useCenter: true,
        },
        // change(val, index) {
        //   console.log('val', val)
        //   const longitude = val[0]
        //   const latitude = val[1]
        // },
      },
      {
        label: '详细地址',
        eType: 'el-input',
        prop: 'Address',
        props: {
          placeholder: '详细活动地址',
          clearable: true,
        },
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
  // console.log(APIS.CUSTOMER_URL)
  await processdRequest.post('/api/BackShop/DelShop', {
    IdList: currentSelections.map((a) => {
      return a.ShopID
    }),
  })
  ElMessage.success('删除成功!')
  refreshTableData(true)
}

// const currentTypeId = ref<string>('')
// const onGetTypeData = (list: any[]) => {
//   reflections.categoryList = list
// }
// watch(
//   () => currentTypeId,
//   (newValue,oldValue) => {
//     console.log(newValue,oldValue)
//     if (typeof config.otherParams === 'object') {
//       if(currentTypeId.value == '全部'){
//         config.otherParams.ClassName = null
//         nextTick(() => {
//           refreshTableData()
//         })
//         return false
//       }
//       config.otherParams.ClassName = currentTypeId.value
//       nextTick(() => {
//         refreshTableData()
//       })
//     }
//   },
//   {
//     // deep: true,
//   }
// )
const currentTypeId = ref<string>('')
const onGetTypeData = (list: any[]) => {
  reflections.categoryList = list
}
watch(
  () => currentTypeId,
  (newValue, oldValue) => {
    if (typeof config.otherParams === 'object') {
      config.otherParams.AreaID = currentTypeId.value
      nextTick(() => {
        refreshTableData()
      })
    }
  },
  {
    deep: true,
  }
)

let image = ref()
let visible = ref(false)
const handleScanningCode = async (row: any) => {
  const result = await processdRequest.get('/api/BackShop/ShopGenerateQrCode', {
    userid: row.ShopID,
  })
  image.value = result
  visible.value = true
}

let subAccountRef = ref()
const handleSubAccount = () => {
  subAccountRef.value.show(currentSelections[0])
}
</script>

<template>
  <div class="accounts">
    <StoreClass
      v-model:typeid="currentTypeId"
      class="device-type"
      @get-data="onGetTypeData"
    ></StoreClass>
    <page-model
      class="page-model"
      ref="pageModelRef"
      :config="config"
      :reflections="reflections"
      @add="handleAdd"
      @update="handleUpdate"
      @delete="handleDelete"
      @sub="handleSubAccount"
    >
    </page-model>
    <sub-account ref="subAccountRef" @change="refreshTableData()"></sub-account>
    <el-dialog v-model="visible" width="20%" destroy-on-close center>
      <el-image width="300px" height="300px" :src="image"></el-image>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.accounts {
  height: 100%;
  display: flex;
  align-items: center;
  // background-color: rgb(244, 244, 244);
}

.page-model {
  flex-grow: 1;
  width: 0;
  background-color: #fff;
}
</style>

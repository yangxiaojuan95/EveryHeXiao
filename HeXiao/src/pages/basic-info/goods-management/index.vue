<script lang="tsx">
export default {
  name: "GoodsManagement",
};
</script>

<script setup lang="tsx">
import { processdRequest } from "@/utils/request";
import { defineConfig } from "@juzhenfe/page-model";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref,  markRaw, watch, nextTick,  } from "vue";
import { CirclePlus, Edit, DeleteFilled, Close, Check, Files, } from "@element-plus/icons-vue";
import { genCode } from "@/utils/gen-code";
import GoodsClass from './components/goods-class/index.vue'
import APIS from "@/constants/apis";
import UploadImg from './components/upload/upload-img.vue'
import { pathUrl } from '@/config';

const reflections = reactive<{
  classList: any,
  categoryList: any,

}>({
  classList: [],
  categoryList: []
})

;(async () => {
  const result = await processdRequest.get('/api/BackGoods/GetClassList')
  reflections.classList = result.data
})();

// 当前选中的数据
let currentSelections: any[] = [];

const config = defineConfig<GoodsManagementModel>({
  getUrl:'/api/BackGoods/Index',
  addUrl: '/api/BackGoods/AddGoods',
  updUrl: '/api/BackGoods/EditGoods',
  isAutoAddButton: false,
  reflect: true,
  otherParams: {
    ClassName: null
  },
  searchForm: {
    els: [
      {
        eType: "el-input",
        prop: "Name",
        props: {
          placeholder: "商品名称",
          clearable: true,
        }
      }
    ],
  },
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'GoodsID'
    },
    events: {
      selectionChange(selections) {
        currentSelections = selections;
      },
    },
    selectable: true,
    selectableButtons: [
      {
        text: "新增",
        event: "add",
        props: {
          type: "primary",
          icon: markRaw(CirclePlus),
        },
      },
      {
        text: "编辑",
        event: "update",
        props: {
          type: "primary",
          icon: markRaw(Edit),
        },
      },
      {
        text: "删除",
        event: "delete",
        props: {
          type: "danger",
          icon: markRaw(DeleteFilled),
        },
      }
    ],
    
    els: [
      {
        prop: "GoodsName",
        label: "商品名称",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "ClassName",
        label: "商品分类",
      },
      {
        prop: "GoodsCode",
        label: "商品代码",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "Unit",
        label: "单位",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "ShrinkImage",
        label: "首图",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <el-image width='100px' height='100px' src={`${pathUrl}${row.ShrinkImage}`}></el-image>
        },
      },
      {
        prop: "IsEnable",
        label: "状态(启用/禁用)",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row){
          return <el-tag type={row.IsEnable?'success':'error'}>{row.IsEnable?'启用':'禁用'}</el-tag>
          if(row.IsEnable === true){
            return <span>启用</span>
          }else{
            return <span>禁用</span>
          }
        }
      },
      {
        prop: "SalePrice",
        label: "预售价",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "DiscountPrice",
        label: "优惠价",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "CreateTime",
        label: "创建时间",
        minWidth: 180,
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <span>{row.CreateTime.split('T')[0]}</span>
        }
      }
    ],
  },
  form: {
    mode: 'fullpage',
    dialogProps: {
      title: "商品",
      // width: "500px",
    },
    required: [],
    props: {
      labelWidth: "100px",
    },
    async bindData(formData) {
      if (!formData.Code) {
        formData.Code = await genCode({
          type: '商品',
        });
      }
      if(formData.GoodsID){
        formData.ImageList = formData.ImageList.map((item:any) =>{
          return item.Image
        }).join(',')
      }
      return formData;
    },
    async beforeSubmit(formData) {
      formData.ImageList = formData.ImageList?.split(',').map((item: any) => {
        return {
          Image: item
        }
      }) || []
      return formData;
    },
    initialData: {
      enabled: true,
    },
    els: [
      {
        eType: "el-input",
        prop: "Code",
        label: "商品代码",
        props: {
          disabled: true,
          placeholder: '商品代码',
        },
        col: {
          span: 12
        }
      },
      {
        eType: "el-input",
        prop: "Unit",
        label: "单位",
        props: {
          placeholder: '单位'
        },
        col: {
          span: 12
        }
      },
      {
        eType: "el-input",
        prop: "GoodsName",
        label: "商品名称",
        props: {
          placeholder: '商品名称'
        },
        col: {
          span: 12
        }
      },
      {
        eType: "el-input",
        prop: "SalePrice",
        label: "售价",
        props: {
          placeholder: '售价'
        },
        col: {
          span: 12
        }
      },
      {
        eType: "el-select",
        prop: "ClassID",
        label: "商品分类",
        col: {
          span: 12
        },
        optionsData: {
          list: [],
          _reflect: 'classList',
          label: 'ClassName',
          value: 'ClassID'
        },
        style: {
          width: '100%'
        }
      },
      {
        eType: "el-input",
        prop: "DiscountPrice",
        label: "优惠价",
        props: {
          placeholder: '优惠价'
        },
        col: {
          span: 12
        }
      },
      {
        eType: 'img-upload',
        prop: 'ShrinkImage',
        label: '首图',
        props: {
          // mult: false,
          // drag: true,//拖动
        },
        col: {
          span: 12
        },
        renderFn(row) {
          let onUpload = (e: any) => {
            row.ShrinkImage = e
          }
          return <UploadImg modelValue={row.ShrinkImage} mult={false} onUpdate:modelValue={onUpload} />
        },
        helpText: '像素：500x500   大小：500k以下'
      },
      {
        // eType: 'img-upload',
        prop: 'ImageList',//.Image
        label: '辅图',
        props: {
          mult: true,
          // drag: true,//拖动
        },
        col: {
          span: 12
        },
        renderFn(row) {
          let onUpload = (e: any) => {
            row.ImageList = e
          }
          return <UploadImg modelValue={row.ImageList} mult={true} onUpdate:modelValue={onUpload} />
        },
        helpText: '像素：500x500   大小：500k以下'
      },
      {
        label: "是否启用",
        prop: 'IsEnable',
        eType: 'el-switch',
        col: {
          span: 12
        }
      },
      {
        label: "开启折扣",
        prop: 'IsDiscount',
        eType: 'el-switch',
        col: {
          span: 12
        }
      },
      {
        eType: 'ck-editor',
        // eType: '',
        label: '详情',
        prop: 'Details',
        props: {
          qiniu: false,
        },
      },
    ],
  },
});

const pageModelRef = ref<any>();
const refreshTableData = (clear: boolean = false) => {
  pageModelRef.value.refreshTableData();
  clear && pageModelRef.value.clearSelection();
};

// 校验是否选中数据
const selectDataValidate = () => {
  if (!currentSelections.length) {
    ElMessage.warning("请选择一条数据");
    return false;
  }
  return true;
};

// 新增
const handleAdd = () => {
  pageModelRef.value.handleAddEvent();
};

// 更新
const handleUpdate =async () => {
  if (!selectDataValidate()) {
    return false;
  }
  pageModelRef.value.handleUpdEvent(currentSelections[0]);
};

// 删除
const handleDelete = async () => {
  if (!selectDataValidate()) {
    return false;
  }
  await ElMessageBox.confirm("是否确定删除选中数据?", "删除", {
    type: "error",
  });
  // console.log(APIS.CUSTOMER_URL)
  await processdRequest.post(
    '/api/BackGoods/DelGoods',
    {IdList: currentSelections.map((a) => {
      return a.GoodsID
    })}
  );
  ElMessage.success("删除成功!");
  refreshTableData(true);
};


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
//         config.otherParams = {
//           ClassName: null
//         }
//         nextTick(() => {
//           refreshTableData()
//         })
//         return false
//       }
//       config.otherParams = {
//         ClassName: currentTypeId.value
//       }
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
  () => {
    if (typeof config.otherParams === 'object') {
      config.otherParams.ClassID = currentTypeId.value
      nextTick(() => {
        refreshTableData()
      })
    }
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div class="accounts">
    <GoodsClass
      v-model:typeid="currentTypeId"
      class="device-type"
      @get-data="onGetTypeData"
    ></GoodsClass>
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
  // background-color: rgb(244, 244, 244);
}

.page-model {
  flex-grow: 1;
  width: 0;
  background-color: #fff;
}
</style>

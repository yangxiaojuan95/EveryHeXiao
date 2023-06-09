<script lang="tsx">
export default {
  name: "DeviceManagement",
};
</script>

<script setup lang="tsx">
import { processdRequest } from "@/utils/request";
import { defineConfig } from "@juzhenfe/page-model";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref,  markRaw, watch, nextTick,  } from "vue";
import { CirclePlus, Edit, DeleteFilled, Close, Check, Files, } from "@element-plus/icons-vue";
import { genCode } from "@/utils/gen-code";
import DefectiveClass from './components/defective-class/index.vue'
import APIS from "@/constants/apis";
import ClassListPage from './components/class-list/index.vue'
import { WeekEnum } from "@/models/business/common/hexiao";
import { convertEnumToList } from "@/frame/utils/enum-helper";
import { pathUrl } from '@/config';
import UploadImg from '../goods-management/components/upload/upload-img.vue'

const reflections = reactive<{
  shopList: any[],
  goodsList: any[],
  categoryList: any[],
  classList: any[]
}>({
  shopList: [],
  goodsList: [],
  categoryList: [],
  classList: []
})

;(async () => {
  const result = await processdRequest.get('/api/BackCoupon/GetShopAndGoods')
  reflections.shopList = result.ShopData.map((item: any) => {
    return {
      value: item.AreaID,
      label: item.AreaName,
      children: item.ShopList.map((ite:any) => {
        return {
          label: ite.ShopName,
          value: ite.ShopID
        }
      })
    }
  })
  reflections.goodsList = result.GoodsData.map((item: any) => {
    return {
      value: item.ClassID,
      label: item.ClassName,
      children: item.GoodsList.map((ite:any) => {
        return {
          label: ite.GoodsName,
          value: ite.GoodsID
        }
      })
    }
  })
})();
;(async () => {
  const result = await processdRequest.get('/api/BackCoupon/GetClassList')
  reflections.classList = result.data
})();

// 当前选中的数据
let currentSelections: any[] = [];

const config = defineConfig<any>({
  getUrl:'/api/BackCoupon/Index',
  addUrl: '/api/BackCoupon/AddCoupon',
  updUrl: '/api/BackCoupon/EditCoupon',
  isAutoAddButton: false,
  reflect: true,
  otherParams: {
    ClassID: ''
  },
  searchForm: {
    els: [
      {
        eType: "el-input",
        prop: "CouponName",
        props: {
          placeholder: "券种名称",
          clearable: true,
        }
      }
    ],
  },
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'CouponID'
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
        prop: "CouponName",
        label: "券种名称",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "ClassName",
        label: "券种分类",
      },
      {
        prop: "Image",
        label: "图片",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <el-image src={`${pathUrl}${row.Image}`}></el-image>
        }
      },
      {
        prop: "Illustrate",
        label: "优惠说明",
        props: {
          showOverflowTooltip: true,
        }
      },
      {
        prop: "ApplicableWeek",
        label: "可用时间段",
        props: {
          showOverflowTooltip: true,
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
        prop: "Instructions",
        label: "使用须知",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <div v-html={row.Instructions}></div>
        }
      },
      {
        prop: "",
        label: "适用商品",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <div>{
            row.GoodsList.map((item:any) => {
              return <div>{item.GoodsName}</div>
            })
          }</div>
        }
      },
      {
        prop: "ShopList",
        label: "适用门店",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          return <div>{
            row.ShopList.map((item:any) => {
              return <div>{item.ShopName}</div>
            })
          }</div>
        }
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
      title: "",
      // width: "500px",
    },
    required: [
      'CouponName',

    ],
    props: {
      labelWidth: "100px",
    },
    async bindData(formData) {
      if (!formData.Code) {
        formData.Code = await genCode({
          type: '优惠券',
        });
      }
      if(formData.CouponID){
        formData.ApplicableWeek = formData.ApplicableWeek.split(',').filter((item:any) => item) ?? []
        formData.GoodsList = formData.GoodsList.map((item:any) => {
          return item.GoodsID
        })
        formData.ShopList = formData.ShopList.map((item:any) => {
          return item.ShopID
        })
        console.log(formData.GoodsList,'---',formData.ShopList)
      }
      return formData;
    },
    async beforeSubmit(formData) {
      formData.GoodsList = formData.GoodsList?.map((item:any) => {
        return {
          GoodsID: item
        }
      })||[]
      formData.ShopList = formData.ShopList?.map((item:any) => {
        return {
          ShopID: item
        }
      })||[]
      formData.Full = formData.Full?formData.Full:0
      formData.Cut = formData.Cut?formData.Cut:0
      formData.Discount = formData.Discount?formData.Discount:0
      formData.IsGeneral_Goods = formData.IsGeneral_Goods?formData.IsGeneral_Goods:false
      formData.IsGeneral_Shop = formData.IsGeneral_Shop?formData.IsGeneral_Shop:false
      formData.ApplicableWeek = formData.ApplicableWeek.join(',')
      // formData.ClassID = currentTypeId.value||''

      return formData;
    },
    initialData: {
    },
    els: [
      {
        eType: "el-input",
        prop: "Code",
        label: "优惠券代码",
        props: {
          disabled: true,
          placeholder: '优惠券代码',
        },
        col: {
          span: 8
        }
      },
      {
        eType: "el-input",
        prop: "CouponName",
        label: "名称",
        props: {
          placeholder: '名称'
        },
        col: {
          span: 8
        }
      },
      {
        label: "是否启用",
        prop: 'IsEnable',
        eType: 'el-switch',
        col: {
          span: 8
        }
      },
      {
        eType: "el-input",
        prop: "Illustrate",
        label: "优惠说明",
        props: {
          placeholder: '优惠说明'
        },
        col: {
          span: 8
        }
      },
      {
        eType: "el-select",
        prop: "ClassID",
        label: "券种类型",
        col: {
          span: 8
        },
        optionsData: {
          _reflect: 'classList',
          label: 'ClassName',
          value: 'ClassID'
        },
        change(data:any) {   
          console.log(this.formData.ClassType = reflections.classList.filter(item => {
            return data === item.ClassID
          })[0].ClassType)
          this.formData.CouponType = reflections.classList.filter(item => {
            return data === item.ClassID
          })[0].ClassType
        },
        style: {
          flexGrow: 1
        }
      },
      {
        eType: "el-select",
        prop: "ApplicableWeek",
        label: "可用时间段",
        col: {
          span: 8
        },
        optionsData: {
          // list:convertEnumToList(WeekEnum)
          list: [
            {label: '星期一',value: 1},
            {label: '星期二',value: 2},
            {label: '星期三',value: 3},
            {label: '星期四',value: 4},
            {label: '星期五',value: 5},
            {label: '星期六',value: 6},
            {label: '星期天',value: 7},
          ],
          label: 'label',
          value: 'label'
        },
        props: {
          multiple: true
        }
        // renderFn(row) {
        //   return <el-checkbox-group v-model="checkList" @change="handlechange">
        //     <el-checkbox v-for="(item,index) in props.list" :label="item.ProcedureName" :key="index" />
        //   </el-checkbox-group>
        // }
      },
      {
        label: '',
        renderFn(row) {
          return <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <div style={{display: 'flex',justifyContent: 'space-between'}}><span style={{paddingRight: '10px'}}>满</span><el-input v-model={row.Full}></el-input></div>
            <div style={{display: 'flex',justifyContent: 'space-between',paddingLeft: '30px'}}><span style={{paddingRight: '10px'}}>减</span><el-input v-model={row.Cut}></el-input></div>
            
          </div>
        },
        col: {
          span: 8
        },
        isShow(self,data) {
          return data.CouponType === 2
        }
      },
      {
        label: '折扣比例',
        eType: 'el-input',
        prop: 'Discount',
        col: {
          span: 8
        },
        isShow(self,data) {
          return data.CouponType === 1
        }
      },
      {
        // eType: 'img-upload',
        prop: 'Image',
        label: '主图',
        props: {
          // mult: false,
          // drag: true,//拖动
        },
        col: {
          span: 8
        },
        renderFn(row) {
          let onUpload = (e: any) => {
            row.Image = e
          }
          return <UploadImg modelValue={row.Image} mult={false} onUpdate:modelValue={onUpload} />
        },
        helpText: '像素：1000x500   大小：500k以下'
      },
      {
        prop: 'ThumbnailImage',
        label: '微缩图',
        col: {
          span: 8
        },
        renderFn(row) {
          let onUpload = (e: any) => {
            row.ThumbnailImage = e
          }
          return <UploadImg modelValue={row.ThumbnailImage} mult={false} onUpdate:modelValue={onUpload} />
        },
        helpText: '像素：500x500   大小：300k以下'
      },
      {
        eType: 'ck-editor',
        // eType: '',
        label: '使用须知',
        prop: 'Instructions',
        props: {
          qiniu: false,
        },
      },
      {
        label: '适用产品',
        eType: 'el-switch',
        prop: 'IsGeneral_Goods',
        col: {
          span: 12
        },
        renderFn(row) {
          return <el-checkbox modelValue={row.IsGeneral_Goods} label="全通用"/>
        }
      },
      {
        label: '适用门店',
        eType: 'el-switch',
        prop: 'IsGeneral_Shop',
        col: {
          span: 12
        },
        renderFn(row) {
          return <el-checkbox modelValue={row.IsGeneral_Shop } label="全通用"/>
        }
      },
      {
        prop: 'GoodsList',
        col: {
          span: 12
        },
        renderFn(row) {
          const onUpdataModelValue = (val: any) => {
            row.GoodsList = val
          }
          return <ClassListPage data={reflections.goodsList} modelValue={row.GoodsList} onUpdata:modelValue={onUpdataModelValue}/>
        }
      },
      {
        prop: 'ShopList',
        col: {
          span: 12
        },
        renderFn(row) {
          const onUpdataModelValue = (val: any) => {
            row.ShopList = val
          }
          return <ClassListPage data={reflections.shopList} modelValue={row.ShopList} onUpdata:modelValue={onUpdataModelValue}/>
        }
      }
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
    '/api/BackCoupon/DelCoupon',
    {IdList: currentSelections.map((a) => {
      return a.CouponID
    })}
  );
  ElMessage.success("删除成功!");
  refreshTableData(true);
};



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
    <DefectiveClass
      v-model:typeid="currentTypeId"
      class="device-type"
      @get-data="onGetTypeData"
    ></DefectiveClass>
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

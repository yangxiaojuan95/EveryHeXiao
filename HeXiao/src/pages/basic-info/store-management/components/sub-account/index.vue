<script lang="tsx">
export default {
    name: "SubAccount",
    components: { FormDialog }
};
</script>

<script setup lang="tsx">
import { processdRequest } from "@/utils/request";
import { FormDialog, defineConfig } from "@juzhenfe/page-model";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref,  markRaw, watch, nextTick,  } from "vue";
import { CirclePlus, DeleteFilled } from "@element-plus/icons-vue";
import { pathUrl } from '@/config';

let isShow = ref(false)
let tableId = ref()
const show = (row:any) => {
    isShow.value = true
    tableId.value = row.ShopID
    config.otherParams = row
    nextTick(() => {
        pageModelRef.value.refreshTableData()
        // pageModelRef.value.updateTableData(row.SubAccount)
    })
}

const emit = defineEmits<{
    (e:'change'):void
}>()
const hide = () => {
    isShow.value = false
    pageModelRef.value.updateTableData([])
    emit('change')
}
defineExpose({
    show,
    hide
})

// 当前选中的数据
let currentSelections: any[] = [];

const config = defineConfig<any>({
  getUrl:'/api/BackShop/Index',
  addUrl: '/api/BackShop/AddShopSubAccount',
  isAutoAddButton: false,
  getReqResultProcessFn(result: any) {
    return {
      list: result.data.filter((item:any) =>{
        return item.ShopID === tableId.value
      })[0].SubAccount,
      total: result
    }
  },
  reflect: true,
  otherParams: { },
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
      rowKey: 'SubID'
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
        prop: "SubName",
        label: "子账号名称",
        props: {
          showOverflowTooltip: true,
        },
      },
      {
        prop: "Telephone",
        label: "登录二维码",
        props: {
          showOverflowTooltip: true,
        },
        renderFn(row) {
          const handleClick = () => {
            handleScanningCode(row)
          }
          return <el-button type='primary' onClick={handleClick}>二维码</el-button>
        }
      },
    ],
  },
  form: {
    mode: 'dialog',
    dialogProps: {
      title: "子账号",
    },
    required: [],
    props: {
      labelWidth: "100px",
    },
    async bindData(formData) {
      
      return formData;
    },
    async beforeSubmit(formData) {
      formData.ShopID = tableId.value
      return formData;
    },
    initialData: {
      enabled: true,
    },
    els: [
      {
        eType: "el-input",
        prop: "SubName",
        label: "子账号名称",
        props: {
          placeholder: '子账号名称',
        },
        col: {
          span: 12
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

// 删除
const handleDelete = async () => {
  if (!selectDataValidate()) {
    return false;
  }
  await ElMessageBox.confirm("是否确定删除选中数据?", "删除", {
    type: "error",
  });
  await processdRequest.post(
    '/api/BackShop/DelShopSubAccount',
    {IdList: currentSelections.map((a) => {
      return a.SubID
    })}
  );
  ElMessage.success("删除成功!");
  refreshTableData(true);
};


let image = ref()
let visible = ref(false)
const handleScanningCode = async (row: any) =>{
  const result = await processdRequest.get('/api/BackShop/ShopSubAccountGenerateQrCode', {SubID:row.SubID})
  image.value = result
  visible.value = true
}

</script>

<template>
  <FormDialog v-model="isShow" title="子账号" width="60%" :dialog-events="{close: hide}">
    <div class="accounts">
        <page-model
        class="page-model"
        ref="pageModelRef"
        :config="config"
        @add="handleAdd"
        @delete="handleDelete"
        >
        </page-model>
        <el-dialog v-model="visible" width="20%" destroy-on-close center>
        <el-image width="300px" height="300px" :src="image"></el-image>
        </el-dialog>
    </div>
  </FormDialog>
</template>

<style lang="scss" scoped>
.accounts {
  height: 400px;
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

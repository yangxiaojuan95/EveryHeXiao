<script lang="tsx">
export default {
  name: 'Accounts',
}
</script>

<script setup lang="tsx">
import { triggerImportFile } from '@/utils';
import { processdRequest } from '@/utils/request';
import { defineConfig , PageModelForm , FormDialog} from '@juzhenfe/page-model';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref, watch, nextTick, markRaw, render } from 'vue';
import RecordsList from './components/records-list/index.vue'
import BgTheme from './components/bg-theme/index.vue'
import RecordsDetail from './components/records-detail/index.vue'
import StatisticsPanel from './components/statistics-panel/index.vue'

// 当前选中的数据
let currentSelections: any[] = []
let importName = ref()
let list = ref([])
const reflections = reactive<{
  CouponList: any[],
  ThemeDto: any[],
  ClassList: any[],
  coupList: any[],
  bgList: any[]
}>({
  CouponList: [],
  ThemeDto: [],
  ClassList: [],
  coupList: [],
  bgList: []
})

;(async () => {
  const result =await processdRequest.get('/api/BackCoupon/GetClassList')
  reflections.ClassList = result.data
})()
;(async () => {
  const result =await processdRequest.get('/api/BackRecords/GetCouponAndThemeDto')
  reflections.CouponList = result.CouponList
  reflections.ThemeDto = result.ThemeList
  reflections.coupList = [{
    CouponID: '',
    ValidDays: ''
  }]
  // reflections.coupList = reflections.CouponList.map((item:any) => {
  // return {
  //   CouponID: item.CouponID,
  //   ValidDays: ''
  // }})
  reflections.bgList = reflections.ThemeDto.map((item:any) => {
  return {
    Name: item.Name,
    BackgroundTheme: item.BackgroundTheme
  }})
})()

const config = defineConfig<any>({
  getUrl: '/api/BackRecords/Index',
  addUrl: '/api/BackRecords/CreateRecords',
  delKey: 'id',
  reflect: true,
  isAutoAddButton: false,
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
        text: '发放',
        event: 'grant',
        props: {
          type: 'primary'
        }
      },
      {
        text: '详情',
        event: 'information',
        props: {
          type: 'primary'
        }
      },
      {
        text: '统计面板',
        event: 'statistics',
        props: {
          type: 'primary'
        }
      }
    ],
    els: [
      {
        prop: 'CouponName',
        label: '券种名称',
      },
      {
        prop: 'ClassName',
        label: '券种分类',
      },
      {
        prop: 'ReceiveTime_Start',
        label: '领取起始时间',
      },
      {
        prop: 'ReceiveTime_End',
        label: '领取结束时间',
      },
      {
        prop: 'Count',
        label: '发放数量',
      },
      {
        prop: 'ReceiveCount',
        label: '领取数量',
        props: {
            showOverflowTooltip: true
        }
      },
      {
        prop: 'ApprovalCount',
        label: '核销数量',
        props: {
            showOverflowTooltip: true
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
      labelWidth: '120px',
    },
    required: ['GroupName','BudgetPrice','UseTime','date','BackgroundTheme'],
    async bindData(formData) {
      return formData
    },
    async beforeSubmit(formData) {
      formData.RecordsList = formData.RecordsList.map((item:any) => {
        return {
          CouponID: item.CouponID,
          ValidDays: Number(item.ValidDays)
        }})
      formData.UseTime_Start = formData.UseTime[0]
      formData.UseTime_End = formData.UseTime[1]
      formData.ReceiveTime_Start = formData.date[0]
      formData.ReceiveTime_End = formData.date[1]
      formData.UserList = list.value
      return formData
    },
    initialData: {},
    els: [
      {
        label: '优惠券',
        prop: 'RecordsList',
        renderFn(row) {
          const onUpdataModelValue = (val:any) => {
            row.RecordsList = val
          }
          
          return <RecordsList propd={row.RecordsList||reflections.coupList} data={reflections.CouponList}  modelValue={row.RecordsList||reflections.coupList} onUpdata:modelValue={onUpdataModelValue}></RecordsList>
        },
        col: {
          span: 24
        }
      },
      {
        label: '分组',
        prop: 'GroupName',
        eType: 'el-select',
        props: {
          clearable: true
        },
        optionsData: {
          list: [
            {label: '男装'},
            {label: '女装'},
            {label: '童装'},
            {label: '乐町'},
          ],
          label: "label",
          value: 'label'
        },
        col: {
          span: 12
        },
        style: {
          flexGrow: 1
        },
      },
      {
        label: '预算价格',
        eType: 'el-input',
        prop: 'BudgetPrice',
        props: {
          clearable: true,
          placeholder: '预算价格'
        },
        col: {
          span: 12
        }
      },
      {
        label: '使用有效时间',
        prop: 'UseTime',
        eType: 'el-date-picker',
        props: {
          type: "daterange",
          valueFormat: 'YYYY-MM-DD',
        },
        col: {
          span: 12
        }
      },
      {
        label: '领取有效时间',
        prop: 'date',
        eType: 'el-date-picker',
        props: {
          type: "daterange",
          valueFormat: 'YYYY-MM-DD',
        },
        col: {
          span: 12
        }
      },
      {
        label: '上传文件',
        renderFn(row){
          console.log('importName',importName.value)
          const handleImportFile = () => {
            triggerImportFile(async function (files) {
              const file = files[0];
              try {
                const fromData = new FormData();
                fromData.append("File", file);
                importName.value = file.name
                const result = await processdRequest.post('/api/BackRecords/UserUpByExcel', fromData, undefined, {
                  loading: "上传中",
                });
                console.log('form',fromData,result)
                list.value = result.data
                ElMessage.success("导入成功!");
              } catch (error) { }
            });
          };
          const handleDownloadTemplate = () => {
            window.open("/template/核销用户模板.xlsx", "_blank");
          };
          return (
            <div style={{display: 'flex',justifyContent: 'space-between',width:'100%'}}>
              <el-input style={{ flex: '1'}} modelValue={importName.value} disabled="true"/>
              <span style={{marginLeft: '10px' , cursor: 'pointer',width: '70px',height: '30px',textAlign: 'center', background: 'rgb(24, 71, 178)',borderRadius: '3px',color: '#fff'}} onClick={handleImportFile}>选择</span>
              <span style={{marginLeft: '10px' , cursor: 'pointer',width: '70px',height: '30px',textAlign: 'center', background: 'rgb(24, 71, 178)',borderRadius: '3px',color: '#fff'}} onClick={handleDownloadTemplate}>下载模板</span>
            </div> 
          )
        },
        col: {
          span: 12
        }
      },
      {
        label: '主题',
        prop: 'BackgroundTheme',
        renderFn(row) {
          const onUpdataModelValue = (val:any) => {
            row.BackgroundTheme = val
          }
          return <BgTheme data={reflections.ThemeDto} bgList={reflections.bgList} modelValue={row.BackgroundTheme} onUpdata:modelValue={onUpdataModelValue}></BgTheme>
        },
      },
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

//发放
const handleGrant =async () => {
  pageModelRef.value.handleAddEvent()
}

//详情
let recordsDetailRef = ref()
const handleInformation =async () => {
  if(!(selectDataValidate())){
    return false
  }
  recordsDetailRef.value.show(currentSelections[0].RecordsID)
}
//统计面板
let statisticsRef = ref()
const handleStatistics =async () => {
  statisticsRef.value.show()
}

</script>

<template>
  <div class="accounts">
    <page-model
      class="page-model"
      ref="pageModelRef"
      :config="config"
      :reflections="reflections"
      @grant="handleGrant"
      @information="handleInformation"
      @statistics="handleStatistics"
    >
    </page-model>
    <RecordsDetail ref="recordsDetailRef"></RecordsDetail>
    <statistics-panel ref="statisticsRef"></statistics-panel>
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
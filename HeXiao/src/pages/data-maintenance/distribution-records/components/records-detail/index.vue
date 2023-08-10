<script lang="tsx">
export default {
  name: 'RecordsDetail',
  components: { PageModelForm },
}
</script>

<script setup lang="tsx">
import {
  FormDialog,
  PageModelForm,
  defineConfig,
  defineForm,
} from '@juzhenfe/page-model'
import { ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import { processdRequest } from '@/utils/request'
import { table } from 'console'
import { pathUrl } from '@/config'
import { ElMessage, ElMessageBox } from 'element-plus'

let visable = ref(false)
let tableList = ref()
let recordsID = ref()
const show = async (id: any) => {
  recordsID.value = id
  visable.value = true
  config.otherParams = {
    RecordsID: id,
  }
  nextTick(() => {
    refreshTableData(true)
  })
  // getData()
}

const getData = async () => {
  const result = await processdRequest.get(`/api/BackRecords/RecordsDetail`, {
    RecordsID: recordsID.value,
  })
  tableList.value = result
  nextTick(() => {
    handlePerformanceChart()
    handleListModel()
    pageModelRef.value.updateTableData(result.DetailList)
  })
}

/**
 * 部门费用占比
 */
const handlePerformanceChart = () => {
  let OrderType = echarts.init(document.getElementById('detailModel'))
  document.getElementById('detailModel').setAttribute('_echarts_instance_', '')
  OrderType.setOption({
    title: {
      text: '部门费用占比',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      // left: 'left',
      bottom: 0,
    },
    series: [
      {
        name: '部门费用占比',
        type: 'pie',
        radius: '50%',
        data: [
          // { value: tableList.value.DetailModel.FFCount, name: '发放' },
          // { value: tableList.value.DetailModel.LQCount, name: '领取' },
          // { value: tableList.value.DetailModel.HXCount, name: '核销' },
          // { value: tableList.value.DetailModel.GQCount, name: '过期' },
          {
            value: tableList.value.DetailModel.FFCount,
            name: '发放',
            label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.FFCount}`,
              position: 'outer',
              fontSize: 15,
            },
          },
          {
            value: tableList.value.DetailModel.LQCount,
            name: '领取',
            label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.LQCount}`,
              position: 'outer',
              fontSize: 15,
            },
          },
          {
            value: tableList.value.DetailModel.HXCount,
            name: '核销',
            label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.HXCount}`,
              position: 'outer',
              fontSize: 15,
            },
          },
          {
            value: tableList.value.DetailModel.GQCount,
            name: '过期',
            label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.GQCount}`,
              position: 'outer',
              fontSize: 15,
            },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })
  window.onresize = function () {
    // 自适应大小
    OrderType.resize()
  }
}
/**
 * 核销详情
 */
const handleListModel = () => {
  let OrderType = echarts.init(document.getElementById('listModel'))
  document.getElementById('listModel').setAttribute('_echarts_instance_', '')
  OrderType.setOption({
    title: {
      text: '核销详情',
    },
    xAxis: {
      type: 'category',
      data: tableList.value.List.map((item: any) => {
        return item.ShopName
      }),
    },
    legend: {
      data: ['核销数'],
      orient: 'horizontal', // 设置为水平布局
      left: 'center', // 水平居中
      bottom: 0, // 底部对齐
    },
    yAxis: {
      type: 'value',
      // name: '核销详情'
    },
    series: [
      {
        data: tableList.value.List.map((item: any) => {
          return item.Count
        }),
        type: 'bar',
        name: '核销数',
      },
    ],
  })
  window.onresize = function () {
    // 自适应大小
    OrderType.resize()
  }
}

let pageModelRef = ref()
let currentSelections: any[] = []
const config = defineConfig<any>({
  reflect: true,
  isAutoAddButton: false,
  getUrl: `/api/BackRecords/RecordsDetail`,
  getMethod: 'get',
  addUrl: '/api/BackRecords/RecordsReissue',
  getReqResultProcessFn(result) {
    tableList.value = result
    nextTick(() => {
      handlePerformanceChart()
      handleListModel()
    })

    return {
      list: result.DetailList,
      total: result.total,
    }
  },
  otherParams: {
    RecordsID: '',
  },
  searchForm: {
    // initialData: {
    //   RecordsID: recordsID.value,
    // },
    els: [
      {
        eType: 'el-input',
        prop: 'Keyword',
        props: {
          placeholder: '姓名/手机号',
          clearable: true,
        },
      },
    ],
  },
  table: {
    selectable: true,
    selectableButtons: [
      {
        text: '补发',
        event: 'record',
        props: {
          type: 'primary',
        },
      },
    ],
    props: {
      stripe: true,
      border: true,
      rowKey: 'UserID',
    },
    // selectable: true,
    // selectableButtons: [
    //   {
    //     text: "导出",
    //     event: 'export',
    //     props: {
    //       type: 'primary'
    //     }
    //   }
    // ],
    // 表格操作栏
    operate: {
      props: {
        fixed: 'right',
      },
      width: '80px',
      els: [
        // {
        // text: '补发',
        // event: 'record',
        // props: {
        //   link: true,
        //   type: "primary",
        // }
        // },
        {
          text: '删除',
          event: 'delete',
        },
      ],
    },
    events: {
      selectionChange(selections) {
        currentSelections = selections
      },
    },
    els: [
      {
        prop: 'Phone',
        label: '手机号',
      },
      {
        prop: 'Name',
        label: '姓名',
      },
      {
        prop: 'Department',
        label: '部门',
      },
      {
        prop: 'IsReceive',
        label: '是否领取',
        renderFn(row) {
          return (
            <el-tag type={row.IsReceive ? 'success' : 'error'}>
              {row.IsReceive ? '已领取' : '未领取'}
            </el-tag>
          )
        },
      },
    ],
  },
  form: {
    mode: 'dialog',
    props: {
      labelWidth: '60px',
    },
    dialogProps: {
      width: '300px',
    },
    beforeSubmit(formData) {
      formData.RecordsID = recordsID.value
      return formData
    },
    els: [
      {
        label: '姓名',
        prop: 'Name',
        eType: 'el-input',
        props: {
          placeholder: '请输入姓名',
          clearable: true,
        },
      },
      {
        label: '手机号',
        prop: 'Phone',
        eType: 'el-input',
        props: {
          placeholder: '请输入手机号',
          clearable: true,
        },
      },
      {
        label: '部门',
        prop: 'Department',
        eType: 'el-select',
        props: {
          placeholder: '请选择部门',
          clearable: true,
        },
        optionsData: {
          list: [
            {
              label: '男装',
              value: '男装',
            },
            {
              label: '女装',
              value: '女装',
            },
            {
              label: '童装',
              value: '童装',
            },
            {
              label: '乐町',
              value: '乐町',
            },
          ],
          label: 'label',
          value: 'value',
        },
        style: {
          width: '100%',
        },
      },
    ],
  },
})

const form = defineForm<any>({
  mode: 'dialog',
  props: {
    labelWidth: '60px',
  },
  dialogProps: {
    width: '300px',
  },
  beforeSubmit(formData) {
    formData.RecordsID = recordsID.value
    return formData
  },
  els: [
    {
      label: '姓名',
      prop: 'Name',
      eType: 'el-input',
      props: {
        placeholder: '请输入姓名',
        clearable: true,
      },
    },
    {
      label: '手机号',
      prop: 'Phone',
      eType: 'el-input',
      props: {
        placeholder: '请输入手机号',
        clearable: true,
      },
    },
    {
      label: '部门',
      prop: 'Department',
      eType: 'el-select',
      props: {
        placeholder: '请选择部门',
        clearable: true,
      },
      optionsData: {
        list: [
          {
            label: '男装',
            value: '男装',
          },
          {
            label: '女装',
            value: '女装',
          },
          {
            label: '童装',
            value: '童装',
          },
          {
            label: '乐町',
            value: '乐町',
          },
        ],
        label: 'label',
        value: 'value',
      },
      style: {
        width: '100%',
      },
    },
  ],
})

const refreshTableData = (clear: boolean = false) => {
  pageModelRef.value.refreshTableData()
  clear && pageModelRef.value.clearSelection()
}

const handleExport = async () => {
  const result = await processdRequest.post(
    `/api/BackRecords/RecordsByOutput?RecordsID=${recordsID.value}`
  )
  window.location.href = `${pathUrl}${result}`
}
const hide = () => {}

let isShow = ref(false)
let pageModelFormRef = ref()
const handleRecord = async () => {
  isShow.value = true
  // await pageModelRef.value.handleAddEvent()
}
const handleIsShow = () => {
  pageModelFormRef.value.setFormData({})
  isShow.value = false
}
const submit = async () => {
  const formData = await pageModelFormRef.value.getFormData()
  await processdRequest.post('/api/BackRecords/RecordsReissue', formData)
  ElMessage.success('补发成功！')
  handleIsShow()
  // getData()
  refreshTableData(true)
}
const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('是否确认删除？', '确认', {
    type: 'error',
  })
  await processdRequest.get('/api/BackRecords/RecordsIncorrectDistribution', {
    DetailID: row.DetailID,
  })
  ElMessage.success('删除成功！')
  // getData()
  refreshTableData(true)
}

defineExpose({
  show,
})
</script>

<template>
  <el-dialog v-model="visable">
    <div class="tubiao">
      <div id="listModel" :style="{ width: '50%', height: '350px' }"></div>
      <div id="detailModel" :style="{ width: '50%', height: '350px' }"></div>
    </div>
    <div class="account">
      <div class="title">
        <div>领取详情</div>
        <div>
          <el-button type="primary" @click="handleExport">导出</el-button>
        </div>
      </div>
      <page-model
        ref="pageModelRef"
        :config="config"
        @export="handleExport"
        @record="handleRecord"
        @delete="handleDelete"
      ></page-model>
      <el-dialog v-model="isShow" width="30%">
        <PageModelForm :form="form" ref="pageModelFormRef"></PageModelForm>
        <template #footer>
          <el-button @click="handleIsShow">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.tubiao {
  display: flex;
  justify-content: space-between;
}
.account {
  height: 300px;
  margin-bottom: 30px;
  .title {
    margin: 0 20px;
    color: #444444;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

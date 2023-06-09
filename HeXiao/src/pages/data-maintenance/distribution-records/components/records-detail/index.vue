<script lang="tsx">
export default {
    name: "RecordsDetail",
}
</script>

<script setup lang="tsx">
import { FormDialog , defineConfig} from '@juzhenfe/page-model'
import { ref , nextTick} from 'vue'
import * as echarts from 'echarts'
import { processdRequest } from '@/utils/request'
import { table } from 'console'
import { pathUrl } from '@/config'

let visable = ref(false)
let tableList = ref()
let recordsID = ref()
const show =async (id: any) => {
  const result = await processdRequest.post(
    `/api/BackRecords/RecordsDetail?RecordsID=${id}`,
    // {
    //     RecordsID: id
    // }
  )
  tableList.value = result
  recordsID.value = id
  visable.value = true
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
  let OrderType = echarts.init(document.getElementById('detailModel'));
  document.getElementById('detailModel').setAttribute('_echarts_instance_', '');
  OrderType.setOption({
    title: {
      text: '部门费用占比'
    },
  tooltip: {
    trigger: 'item'
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
              fontSize: 15
          }
        },
        {
          value: tableList.value.DetailModel.LQCount,
          name: '领取',
          label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.LQCount}`,
              position: 'outer',
              fontSize: 15
          }
        },
        {
          value: tableList.value.DetailModel.HXCount,
          name: '核销',
          label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.HXCount}`,
              position: 'outer',
              fontSize: 15
          }
        },
        {
          value: tableList.value.DetailModel.GQCount,
          name: '过期',
          label: {
              // 单独显示该数据项
              show: true,
              formatter: `${tableList.value.DetailModel.GQCount}`,
              position: 'outer',
              fontSize: 15
          }
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
  window.onresize = function () { // 自适应大小
    OrderType.resize();
  };
}
/**
 * 核销详情
 */
const handleListModel = () => {
  let OrderType = echarts.init(document.getElementById('listModel'));
  document.getElementById('listModel').setAttribute('_echarts_instance_', '');
  OrderType.setOption({
    title: {
      text: '核销详情'
    },
    xAxis: {
      type: 'category',
      data: tableList.value.List.map((item: any) => {
        return item.ShopName
      })
    },
    legend: {
      data: ['核销数'],
      orient: 'horizontal', // 设置为水平布局
      left: 'center', // 水平居中
      bottom: 0 // 底部对齐
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
        name: '核销数'
      }
    ]
    })
  window.onresize = function () { // 自适应大小
    OrderType.resize();
  };
}

let pageModelRef = ref()
let currentSelections: any[] = []
const config = defineConfig<any>({
  reflect: true,
  isAutoAddButton: false,
  table: {
    props: {
      stripe: true,
      border: true,
      rowKey: 'UserID'
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
      width: '85px',
      els: [
      ]
    },
    events: {
      selectionChange(selections) {
        currentSelections = selections
      }
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
          return <el-tag type={row.IsReceive?'success':'error'}>{row.IsReceive?'已领取':'未领取'}</el-tag>
        }
      }
    ]
  },
})
const handleExport =async () => {
  const result = await processdRequest.post(
    `/api/BackRecords/RecordsByOutput?RecordsID=${recordsID.value}`,
  )
  window.location.href = `${pathUrl}${result}`
};
const hide = () => {

}
defineExpose({
    show
})
</script>

<template>
  <el-dialog v-model="visable">
    <div class="tubiao">
      <div id="listModel" :style="{width: '50%', height: '350px'}"></div>
      <div id="detailModel" :style="{width: '50%', height: '350px'}"></div>
    </div>
    <div class="account">
      <div class="title">
        <div>领取详情</div>
        <div><el-button type="primary" @click="handleExport">导出</el-button></div>
      </div>
      <page-model ref="pageModelRef" :config="config" @export="handleExport"></page-model>
    </div>
    
  </el-dialog>
</template>

<style lang="scss">
.tubiao{
  display: flex;
  justify-content: space-between;
}
.account{
  height: 300px;
  margin-bottom: 30px;
  .title{
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

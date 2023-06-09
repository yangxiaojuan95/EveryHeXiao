<script lang="tsx">
export default {
    name: "StatisticsPanel",
}
</script>

<script setup lang="tsx">
import { FormDialog , defineConfig} from '@juzhenfe/page-model'
import { ref , nextTick} from 'vue'
import * as echarts from 'echarts'
import { processdRequest } from '@/utils/request'

let visable = ref(false)
let time = ref('2023')
// let newTime = new Date()
// time.value = newTime.getFullYear()
let departmentList = ref()
let feeList = ref()
let groupList = ref()
let shopList = ref()
const show =async () => {
  visable.value = true
  getData()
} 
const getData =async () => {
  const result = await processdRequest.get(
    `/api/BackRecords/RecordsGroup`,
    {
        Time: `${time.value}-01-01`
    }
  )
  departmentList.value = result.DepartmentList
  // departmentList.value = [{Department:'部门',Rate: 80},{Department:'部门11',Rate: 20}]
  feeList.value = result.FeeList
  groupList.value = result.GroupList
  shopList.value = result.ShopList
  nextTick(() => {
    handleFeeModel()
    handleShopModel()
    handleDepartmentModel()
    handleGroupModel()
  })
}
/**
 * 费用计数柱状图
 */
const handleFeeModel = () => {
  let feeModel = echarts.init(document.getElementById('feeModel'));
  document.getElementById('feeModel').setAttribute('_echarts_instance_', '');
  feeModel.setOption({
  title: {
    text: '费用计数柱状图',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['数量', '预算'],
    orient: 'horizontal', // 设置为水平布局
    left: 'center', // 水平居中
    bottom: 0 
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: feeList.value.map((item: AnyObject) => {
        return item.Month
      })
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '数量',
      type: 'bar',
      data: feeList.value.map((item: AnyObject) => {
        return item.CouponCount
      }),
    },
    {
      name: '预算',
      type: 'bar',
      data: feeList.value.map((item: AnyObject) => {
        return item.Price
      }),
    }
  ]
});
}

/**
 * 部门费用占比
 */
const handleDepartmentModel = () => {
  let departmentModel = echarts.init(document.getElementById('departmentModel'));
  document.getElementById('departmentModel').setAttribute('_echarts_instance_', '');
  departmentModel.setOption({
    title: {
      text: '部门费用占比'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // 设置图例的位置为垂直，可选项：horizontal，水平（默认）
      orient: 'horizontal',
      bottom: 0,
      data: departmentList.value.map((item: AnyObject) => {
          return  item.Department
        }),
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        // data: departmentList.value.map((item: AnyObject) => {
        //   return {
        //     value: `${item.Rate}`,
        //     name:  item.Department
        //   }
        // }),
        data: departmentList.value.map((item: AnyObject) => {
          return {
            value: item.Rate,
            name: item.Department,
            label: {
                // 单独显示该数据项
                show: true,
                formatter: `${item.Department}占比：${item.Rate}%`,
                position: 'outer',
                fontSize: 15
            }
          }
        }),
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
    departmentModel.resize();
  };
}
/**
 * 核销详情
 */
const handleShopModel = () => {
  let shopModel = echarts.init(document.getElementById('shopModel'));
  document.getElementById('shopModel').setAttribute('_echarts_instance_', '');
  shopModel.setOption({
  title: {
    text: '核销详情',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['核销数', '预算'],
    orient: 'horizontal', // 设置为水平布局
    left: 'center', // 水平居中
    bottom: 0 
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: shopList.value.map((item: AnyObject) => {
        return item.ShopName
      })
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '核销数',
      type: 'bar',
      data: shopList.value.map((item: AnyObject) => {
        return item.Count
      }),
    },
    {
      name: '预算',
      type: 'bar',
      data: shopList.value.map((item: AnyObject) => {
        return item.Price
      }),
    }
  ]
});
}
/**
 * 分组详情
 */
const handleGroupModel = () => {
  let groupModel = echarts.init(document.getElementById('groupModel'));
  document.getElementById('groupModel').setAttribute('_echarts_instance_', '');
  groupModel.setOption({
    title: {
      text: '分组详情'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['男装', '女装', '童装', '乐町'],
      orient: 'horizontal', // 设置为水平布局
      left: 'center', // 水平居中
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: groupList.value.map((item: any) => {
        return item.Month
      })
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '男装',
        type: 'line',
        data: groupList.value.map((item: any) => {
          return item.NanZ_Price
        })
      },
      {
        name: '女装',
        type: 'line',
        data: groupList.value.map((item: any) => {
          return item.NvZ_Price
        })
      },
      {
        name: '童装',
        type: 'line',
        data: groupList.value.map((item: any) => {
          return item.TongZ_Price
        })
      },
      {
        name: '乐町',
        type: 'line',
        data: groupList.value.map((item: any) => {
          return item.LD_Price
        })
      }
    ]
  });
}
const handleTime = (val: any) => {
  console.log(val,'val')
  getData()
}
defineExpose({
    show
})
</script>

<template>
  <el-dialog v-model="visable" width="80%">
    <div class="picker">
      <el-date-picker type="year" value-format="YYYY" v-model="time" @change="handleTime"/>
    </div>
    <div class="tubiao">
      <div id="feeModel" :style="{width: '50%', height: '350px'}"></div>
      <div id="departmentModel" :style="{width: '50%', height: '350px'}"></div>
    </div>
    <div class="tubiao">
      <div id="shopModel" :style="{width: '50%', height: '350px'}"></div>
      <div id="groupModel" :style="{width: '50%', height: '350px'}"></div>
    </div>
    
  </el-dialog>
</template>

<style lang="scss">
.picker{
  margin-bottom: 30px;
}
.tubiao{
  display: flex;
  justify-content: space-between;
}
.account{
  height: 300px;
  .title{
    padding: 0 0 0 20px;
    color: #444444;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>

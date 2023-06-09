<script lang="tsx">
export default {
  name: 'FormGoodsList'
}
</script>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model';
import { ref, watch } from 'vue';
import SerialNumbers from '@/components/serial-numbers-dialog/index.vue'

type Props = {
  goodsList?: AnyObject[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  goodsList: () => ([])
})

const pageModleRef = ref<any>()

let currentTableList: AnyObject[] = []
const updateTableData = (list: AnyObject[]) => {
  pageModleRef.value.updateTableData(list)
  currentTableList = list
}

watch(
  () => props.goodsList,
  (goodsList) => {
    if (goodsList) {
      updateTableData(goodsList)
    }
  },
  {
    deep: true,
  }
)

const serialNumbersRef = ref<any>();
function showSerialNumber(id: string) {
  serialNumbersRef.value.show(id)
}

const config = defineConfig<OnWayOrderPickupItem>({
  isAutoAddButton: false,
  getImmediate: false,
  table: {
    pagination: {
      show: false
    },
    showTools: false,
    els: [
      {
        label: '出通单号',
        prop: 'deliveryOrderNum',
        minWidth: 200,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '客户单号',
        prop: 'customerItemNum',
        minWidth: 200,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '厂家单号',
        prop: 'customizationNumber',
        minWidth: 200,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '商品名称',
        prop: 'goodsName',
        minWidth: 200,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: 'SKU',
        prop: 'goodsSKU',
        minWidth: 200,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '序列号',
        width: 120,
        renderFn(row) {
          const showSerialNumbers = () => {
            showSerialNumber(row.jhOrderId)
          }
          return (
            <el-button type='primary' link onClick={ showSerialNumbers }>查看</el-button>
          )
        }
      },
      {
        label: '数量',
        prop: 'goodsQuantity',
        width: 80
      },
      {
        label: '备注1',
        prop: 'remark1',
        width: 120,
        renderFn(row) {
          const onUpdateModelValue = (val: string) => {
            row.remark1 = val
          }
          return (
            <el-input modelValue={ row.remark1 } onUpdate:modelValue={ onUpdateModelValue } disabled={ props.disabled } />
          )
        }
      },
      {
        label: '备注2',
        prop: 'remark2',
        width: 120,
        renderFn(row) {
          const onUpdateModelValue = (val: string) => {
            row.remark2 = val
          }
          return (
            <el-input modelValue={ row.remark2 } onUpdate:modelValue={ onUpdateModelValue } disabled={ props.disabled } />
          )
        }
      }
    ]
  },
  hasForm: false
})

</script>

<template>
  <div>
    <page-model
      class="page-model"
      ref="pageModleRef"
      :config="config" 
      style="min-height: 200px;"
    />

    <serial-numbers ref="serialNumbersRef" />
  </div>
</template>

<style lang="scss" scoped>

</style>
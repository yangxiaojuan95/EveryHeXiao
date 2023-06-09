<script lang="ts">
export default {
  name: 'ReceiverSelect',
}
</script>

<script setup lang="ts">
import InputSelect from '@/components/input-select/index.vue'
import APIS from '@/constants/apis';
import { SenderReceiverTypeEnum } from '@/models/business/common/enum';
import { useDialogStore } from '@/store/dialog-invoker'
import { defineConfig } from '@juzhenfe/page-model'
import { ref } from 'vue'

type Props = {
  formData: AnyObject;
  valueKey: string;
  sets: {from: string, to: string}[];
  disabled?: boolean;
  params?: AnyObject;
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', data: any): void
}>()


const inputSelectRef = ref<any>()

const dialogStore = useDialogStore()

const config = defineConfig<SenderReceiverResultModel>({
  getUrl: APIS.CUSTOMER_ORDERS_SELECT_URL,
  table: {
    els: [
      {
        label: '收件人',
        prop: 'personName',
        width: 120
      },
      {
        label: '电话',
        prop: 'personMobile',
        width: 120
      },
      {
        label: '地址',
        prop: 'totalAddress',
        props: {
          showOverflowTooltip: true
        }
      }
    ],
  },
})

// 输入值
const onUpdateModelValue = (val: string) => {
  props.formData[props.valueKey] = val
}

// 需要显示更多信息
const onShowMore = () => {
  dialogStore.invoke({
    name: 'ChooseReceiver',
    callback(data: SenderReceiverResultModel) {
      dialogStore.close()
      inputSelectRef.value.setCurrentRow(data)
    },
  })
}

// 选中数据
const onSelectData = (data: AnyObject) => {
  props.sets.forEach(item => {
    props.formData[item.to] = data[item.from]
  })
  emit('change', data)
}
</script>

<template>
  <div class="supplier-select">
    <input-select
      ref="inputSelectRef"
      :model-value="props.formData[props.valueKey]"
      width="600px"
      value-key="name"
      focusGetImmediate
      :config="config"
      :disabled="disabled"
      :params="params"
      :staticParams="{
        type: SenderReceiverTypeEnum.收件人
      }"
      @update:model-value="onUpdateModelValue"
      @show-more="onShowMore"
      @select-data="onSelectData"
    />
  </div>
</template>

<style lang="scss" scoped>
.supplier-select {
  flex-grow: 1;
  width: 0;
}
</style>
<script lang="ts">
export default {
  name: 'CustomerSelect',
}
</script>

<script setup lang="ts">
import InputSelect from '@/components/input-select/index.vue'
import { useDialogStore } from '@/store/dialog-invoker'
import { defineConfig } from '@juzhenfe/page-model'
import { ref } from 'vue'

type Props = {
  formData: AnyObject;
  valueKey: string;
  sets: {from: string, to: string}[];
  disabled?: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', data: any): void
}>()

const inputSelectRef = ref<any>()

const dialogStore = useDialogStore()

const config = defineConfig<CustomerResultModel>({
  getUrl: '/api/Customers',
  table: {
    els: [
      {
        label: '客户编码',
        prop: 'code',
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '客户名称',
        prop: 'name',
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
    name: 'ChooseCustomer',
    callback(data: CustomerResultModel) {
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
      query-key="name"
      value-key="name"
      :disabled="disabled"
      focusGetImmediate
      :config="config"
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
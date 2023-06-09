<script lang="ts">
export default {
  name: 'CraftequipmentSelect',
}
</script>

<script setup lang="ts">
import InputSelect from '@/components/input-select/index.vue'
import APIS from '@/constants/apis';
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

const config = defineConfig<EquipmentListModel>({
  getMethod: 'get',
  getUrl: '/api/BackWorkProcedure/ProcedureGetEquipment',
  table: {
    els: [
      {
        prop: 'EquipmentName',
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
      value-key="name"
      query-key="name"
      focusGetImmediate
      :config="config"
      :disabled="disabled"
      :clearable="true"
      :params="params"
      @update:model-value="onUpdateModelValue"
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
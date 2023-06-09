<script lang="ts">
export default {
  name: 'WarehouseLocationSelect',
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
  params?: AnyObject;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', data: any): void
}>()

const inputSelectRef = ref<any>()

const dialogStore = useDialogStore()

const config = defineConfig<WarehouseLocationResultModel>({
  getUrl: APIS.WAREHOUSE_LOCATION_SELECT_URL,
  table: {
    els: [
      {
        label: '仓位编码',
        prop: 'code',
        width: 220,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '仓位名称',
        prop: 'name',
      }
    ]
  },
})

// 输入值
const onUpdateModelValue = (val: string) => {
  props.formData[props.valueKey] = val
}

// 需要显示更多信息
const onShowMore = () => {
  dialogStore.invoke({
    name: 'ChooseWarehouseLocation',
    callback(data: WarehouseLocationResultModel) {
      dialogStore.close()
      inputSelectRef.value.setCurrentRow(data)
    }
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
      :params="params"
      query-key="name"
      value-key="name"
      width="400px"
      focusGetImmediate
      :config="config"
      v-bind="$attrs"
      @update:model-value="onUpdateModelValue"
      @show-more="onShowMore"
      @select-data="onSelectData"
    />
  </div>
</template>

<style lang="scss" scoped>
.supplier-select {
  flex-grow: 1;
}
</style>
<script lang="ts">
export default {
  name: 'GoodsSelect',
}
</script>

<script setup lang="ts">
import InputSelect from '@/components/input-select/index.vue'
import { useDialogStore } from '@/store/dialog-invoker'
import { defineConfig } from '@juzhenfe/page-model'
import { computed, ref } from 'vue'

type Props = {
  formData: AnyObject;
  valueKey: string;
  sets: {from: string, to: string}[];
  filterFn?: Function;
  inputProps?: AnyObject;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', data: any): void
}>()

const inputSelectRef = ref<any>()

const dialogStore = useDialogStore()

const modelValue = computed(() => {
  return props.formData[props.valueKey]
})

const config = defineConfig<BusinessStoreGoodsResultModel>({
  getUrl: '/api/Goods',
  table: {
    els: [
      {
        label: '商品编码',
        prop: 'code',
        width: 140,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '商品名称',
        prop: 'name',
      },
      {
        label: '商品规格',
        prop: 'spec',
      },
      {
        label: '商品单位',
        prop: 'unit',
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
    name: 'ChooseGoods',
    callback(data: BusinessStoreGoodsResultModel) {
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
  console.log(data)
  emit('change', data)
}
</script>

<template>
  <div class="supplier-select">
    <input-select
      ref="inputSelectRef"
      :model-value="modelValue"
      value-key="keywords"
      :filter-fn="filterFn"
      focusGetImmediate
      :config="config"
      width="400px"
      v-bind="inputProps"
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
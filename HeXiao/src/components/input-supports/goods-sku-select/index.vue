<script lang="ts">
export default {
  name: 'GoodsSkuSelect',
}
</script>

<script setup lang="ts">
import InputSelect from '@/components/input-select/index.vue'
import APIS from '@/constants/apis';
import { useDialogStore } from '@/store/dialog-invoker'
import { defineConfig } from '@juzhenfe/page-model'
import { computed, ref } from 'vue'

type Props = {
  formData: AnyObject;
  valueKey: string;
  params?: AnyObject;
  sets: {from: string, to: string}[];
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

const config = defineConfig<BusinessStoreGoodsSkuResultModel>({
  getUrl: APIS.GOODS_SKU_SELECT_URL,
  table: {
    els: [
      {
        label: '商品名称',
        prop: 'goodsName',
        width: 140,
        props: {
          showOverflowTooltip: true
        }

      },
      {
        label: '商品规格',
        prop: 'goodsSpec',
        width: 140,
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: 'SKU',
        prop: 'sku',
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
    name: 'ChooseGoodsSku',
    callback(data: BusinessStoreGoodsSkuResultModel) {
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
      :model-value="modelValue"
      value-key="name"
      focusGetImmediate
      :config="config"
      :params="params"
      width="500px"
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
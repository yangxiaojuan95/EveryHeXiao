<script lang="ts">
export default {
  name: 'MiddleTransformCompanySelect',
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
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'change', data: any): void
}>()

const inputSelectRef = ref<any>()

const dialogStore = useDialogStore()

const config = defineConfig<MiddleTransformCompanyResultModel>({
  getUrl: APIS.MIDDLE_TRANSFORM_COMPANY_SELECT_URL,
  table: {
    els: [
      {
        label: '中转公司',
        prop: 'name',
        props: {
          showOverflowTooltip: true
        },
        width: 120
      },
      {
        label: '经营人',
        prop: 'linkman',
        width: 120
      },
      {
        label: '电话',
        prop: 'linkmanPhone',
        width: 160
      },
      {
        label: '地址',
        prop: 'totalAddress',
        props: {
          showOverflowTooltip: true
        },
      },
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
    name: 'ChooseMiddleTransformCompany',
    callback(data: MiddleTransformCompanyResultModel) {
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
<script lang="ts">
export default {
  name: 'DriverSelect',
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

const dialogStore = useDialogStore()

const config = defineConfig<DriverResultModel>({
  getUrl: APIS.DRIVER_SELECT_URL,
  table: {
    els: [
      {
        label: '司机名称',
        prop: 'name',
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '司机电话',
        prop: 'mobile',
        props: {
          showOverflowTooltip: true
        }
      },
      {
        label: '车牌号',
        prop: 'carLicense',
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
    name: 'ChooseDriver',
    callback(data: DriverResultModel) {
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
      value-key="name"
      focusGetImmediate
      :config="config"
      :disabled="disabled"
      :params="params"
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
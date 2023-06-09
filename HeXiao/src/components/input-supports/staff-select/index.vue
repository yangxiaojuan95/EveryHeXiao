<script lang="ts">
export default {
  name: "StaffSelect",
};
</script>

<script setup lang="ts">
import InputSelect from "@/components/input-select/index.vue";
import APIS from "@/constants/apis";
import { RoleTypeEnum } from "@/models/business/common/enum";
import { useDialogStore } from "@/store/dialog-invoker";
import { defineConfig } from "@juzhenfe/page-model";
import { ref } from "vue";

type Props = {
  formData: AnyObject;
  valueKey: string;
  sets: { from: string; to: string }[];
  disabled?: boolean;
  params?: AnyObject;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "change", data: any): void;
}>();

const inputSelectRef = ref<any>();

const dialogStore = useDialogStore();

const config = defineConfig<StaffResultModel>({
  getMethod: 'post',
  getUrl: '/api/BackVehicle/GetStaffDtoList',
  table: {
    els: [
      {
        prop: "UserName",
        props: {
          showOverflowTooltip: true,
        },
      }
    ],
  },
});

// 输入值
const onUpdateModelValue = (val: string) => {
  props.formData[props.valueKey] = val;
};

// 需要显示更多信息
const onShowMore = () => {
  dialogStore.invoke({
    name: "ChooseStaff",
    callback(data: StaffResultModel) {
      dialogStore.close();
      inputSelectRef.value.setCurrentRow(data);
    },
  });
};

// 选中数据
const onSelectData = (data: AnyObject) => {
  props.sets.forEach((item) => {
    props.formData[item.to] = data[item.from];
  });
  emit("change", data);
};
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
      :params="params"
      :clearable="true"
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

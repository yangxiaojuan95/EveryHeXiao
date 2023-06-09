<script setup lang="tsx">
import { ref } from 'vue';
import FormGoodsList from './form-goods-list/index.vue'

type Props = {
  formData: OnWayOrderResultModel;
  disabled?: boolean;
}

const emit = defineEmits<{
  (e: 'show-serial-numbers', jdOrderId: string): void;
}>()

defineProps<Props>()

const activeName = ref('0')

</script>

<template>
<div class="form-list-tabs">
  <el-tabs type="card" v-model="activeName">
    <el-tab-pane label="商品明细" name="0">
      <FormGoodsList :goodsList="formData.items" :disabled="disabled" />
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<style lang="scss" scoped>
.form-list-tabs {
  flex-grow: 1;
  width: 0;

  &::v-deep {
    .el-tabs__header {
      margin-bottom: 0;
      background-color: #EFEFF3;
    }

    .el-tabs__item {
      &.is-active {
        background-color: #fff;
      }
    }
  }
}
</style>
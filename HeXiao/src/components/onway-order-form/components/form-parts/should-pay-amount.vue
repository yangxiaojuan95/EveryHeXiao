<script lang="ts">
export default {
  name: 'ShouldPayAmount'
}
</script>

<script setup lang="ts">import { computed } from 'vue';

type Props = {
  formData: OnWayOrderResultModel;
}

const props = defineProps<Props>()

// 应收金额计算
const shouldPayAmount = computed((): number => {
  const formData = props.formData
  const amounts: number[] = [
    formData.taxesFee, // 税款
    formData.transferFee, // 中转费
    formData.takeGoodsFee, // 提贷费
    formData.payWarehousingFee, // 进仓费
    formData.rebateFee, // 返款
    formData.payOtherFee, // 其它费用
    formData.fuelFee, // 燃油费
    formData.directDeliveryFee // 直送费
  ]

  // 费用累加
  const result = amounts.reduce((memo, amount) => {
    return memo += Number(amount || 0)
  }, 0)

  // 返回两位小数
  return Number(result.toFixed(2))
})

</script>

<template>

<div class="form-parts">
  <el-row>
    <el-col :span="24">
      <el-form-item label="应付金额">
        <el-input :model-value="shouldPayAmount" disabled placeholder="0.00">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
  </el-row>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/fee-form.scss';
</style>
<script lang="ts">
export default {
  name: 'ShouldReceiveAmount'
}
</script>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  formData: OnWayOrderResultModel;
}

const props = defineProps<Props>()

// 应收金额计算
const shouldReceiveAmount = computed((): number => {
  const formData = props.formData
  const amounts: number[] = [
    formData.transportFee, // 运费
    formData.storageFee, // 仓储费
    formData.warehousingFee, // 进仓费
    formData.incomeOtherFee, // 其它费用
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
      <el-form-item label="应收金额">
        <el-input :model-value="shouldReceiveAmount" placeholder="0.00" disabled>
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
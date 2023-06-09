<script lang="ts">
export default {
  name: 'FeeForm'
}
</script>

<script setup lang="ts">
type Props = {
  formData: OnWayOrderResultModel;
  disabled?: boolean;
}

defineProps<Props>()

</script>

<template>

<div class="form-parts">
  <el-row>
    <el-col :span="8">
      <el-form-item label="税款">
        <el-input v-model="formData.taxesFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="直送费">
        <el-input v-model="formData.directDeliveryFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="中转费">
        <el-input v-model="formData.transferFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="提贷费">
        <el-input v-model="formData.takeGoodsFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="返款">
        <el-input v-model="formData.rebateFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="进仓费">
        <el-input v-model="formData.payWarehousingFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="其它费用">
        <el-input v-model="formData.payOtherFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="燃油费">
        <el-input v-model="formData.fuelFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="备注">
        <el-input v-model="formData.payRemark" placeholder="请输入" :disabled="disabled">
        </el-input>
      </el-form-item>
    </el-col>
  </el-row>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/fee-form.scss';
</style>
<script lang="ts">
export default {
  name: 'RemarksForm'
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
    <el-col :span="24">
      <el-form-item label="客服备注">
        <el-input v-model="formData.customerServiceRemark" placeholder="请输入" :disabled="disabled">
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="调车备注">
        <el-input v-model="formData.dispatchRemark" placeholder="请输入" :disabled="disabled">
        </el-input>
      </el-form-item>
    </el-col>
  </el-row>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/fee-form.scss';
</style>
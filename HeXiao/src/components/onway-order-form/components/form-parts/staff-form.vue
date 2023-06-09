<script lang="ts">
export default {
  name: 'StaffForm'
}
</script>

<script setup lang="ts">
type Props = {
  formData: any;
  disabled?: boolean;
}

defineProps<Props>()

const sets = [
  {
    from: 'id',
    to: 'staffId'
  },
  {
    from: 'code',
    to: 'staffCode'
  },
  {
    from: 'name',
    to: 'staffName'
  },
  {
    from: 'mobile',
    to: 'staffMobile'
  }
]

</script>

<template>

<div class="form-parts">
  <div class="form-parts-icon">
    <jz-icon 
      icon="iconfont icon_salesman"
      :fontSize="40"
    />
    <span>业务员</span>
  </div>
  <div class="form-parts-inputs">
    <el-form-item label="编号">
      <staff-select 
        :formData="formData"
        value-key="staffCode"
        :sets="sets"
        :disabled="disabled"
      />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="formData.staffName" :disabled="disabled" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formData.staffMobile" :disabled="disabled" />
    </el-form-item>
  </div>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/icon-form.scss';
</style>
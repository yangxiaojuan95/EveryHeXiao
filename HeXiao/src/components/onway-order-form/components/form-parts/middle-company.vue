<script lang="ts">
export default {
  name: 'MiddleCompany'
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
    to: 'transitCompanyId'
  },
  {
    from: 'linkman',
    to: 'transitCompanyLinkman'
  },
  {
    from: 'linkmanPhone',
    to: 'transitCompanyLinkmanPhone'
  },
  {
    from: 'totalAddress',
    to: 'transitCompanyAddress'
  }
]

</script>

<template>

<div class="form-parts">
  <div class="form-parts-icon">
    <jz-icon
      icon="iconfont icon_transit-company"
      :fontSize="40"
    />
    <span>中转公司</span>
  </div>
  <div class="form-parts-inputs">
    <el-form-item label="物流公司">
      <middle-transform-company-select 
        :formData="formData"
        value-key="transitCompanyName"
        :sets="sets"
        :disabled="disabled"
      />
    </el-form-item>
    <el-form-item label="经营人">
      <!-- <middle-transform-company-select 
        :formData="formData"
        value-key="transitCompanyLinkman"
        :sets="sets"
      /> -->
      <el-input v-model="formData.transitCompanyLinkman" :disabled="disabled" />
    </el-form-item>
    <el-form-item label="电话">
      <!-- <middle-transform-company-select 
        :formData="formData"
        value-key="transitCompanyLinkmanPhone"
        :sets="sets"
      /> -->
      <el-input v-model="formData.transitCompanyLinkmanPhone" :disabled="disabled" />
    </el-form-item>
    <el-form-item label="地址">
      <!-- <middle-transform-company-select 
        :formData="formData"
        value-key="transitCompanyAddress"
        :sets="sets"
      /> -->
      <el-input v-model="formData.transitCompanyAddress" :disabled="disabled" />
    </el-form-item>
  </div>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/icon-form.scss';

</style>
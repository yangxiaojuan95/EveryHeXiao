<script lang="ts">
export default {
  name: 'PostMan'
}
</script>

<script setup lang="ts">
type Props = {
  formData: any;
  disabled?: boolean;
}

const props = defineProps<Props>()


const sets = [
  {
    from: 'personName',
    to: 'senderName'
  },
  {
    from: 'personMobile',
    to: 'senderMobile'
  },
  {
    from: 'provinceCode',
    to: 'senderProvinceCode'
  },
  {
    from: 'provinceName',
    to: 'senderProvinceName'
  },
  {
    from: 'cityCode',
    to: 'senderCityCode'
  },
  {
    from: 'cityName',
    to: 'senderCityName'
  },
  {
    from: 'areaName',
    to: 'senderAreaName'
  },
  {
    from: 'areaCode',
    to: 'senderAreaCode'
  },
  {
    from: 'detailAddress',
    to: 'senderAddress'
  }
]

const onSelectChange = (row: SenderReceiverResultModel) => {
  if (!props.formData.senderTotalAddress) {
    props.formData.senderTotalAddress = row.totalAddress
  }
}

</script>

<template>

<div class="form-parts">
  <div class="form-parts-icon">
    <jz-icon 
      icon="iconfont icon_consignor"
      :fontSize="40"
    />
    <span>发件人</span>
  </div>
  <div class="form-parts-inputs">
    <el-form-item label="发件人">
      <sender-select
        :formData="formData"
        value-key="senderName"
        :sets="sets"
        :disabled="disabled"
        @change="onSelectChange"
      />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formData.senderMobile" :disabled="disabled" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="formData.senderAddress" :disabled="disabled" />
    </el-form-item>
  </div>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/icon-form.scss';

</style>
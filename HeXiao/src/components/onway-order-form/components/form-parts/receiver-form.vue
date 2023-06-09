<script lang="ts">
export default {
  name: 'PickupMan'
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
    to: 'receiverName'
  },
  {
    from: 'personMobile',
    to: 'receiverMobile'
  },
  {
    from: 'provinceCode',
    to: 'receiverProvinceCode'
  },
  {
    from: 'provinceName',
    to: 'receiverProvinceName'
  },
  {
    from: 'cityCode',
    to: 'receiverCityCode'
  },
  {
    from: 'cityName',
    to: 'receiverCityName'
  },
  {
    from: 'areaName',
    to: 'receiverAreaName'
  },
  {
    from: 'areaCode',
    to: 'receiverAreaCode'
  },
  {
    from: 'detailAddress',
    to: 'receiverAddress'
  }
]

const onSelectChange = (row: SenderReceiverResultModel) => {
  if (!props.formData.receiverTotalAddress) {
    props.formData.receiverTotalAddress = row.totalAddress
  }
}

</script>

<template>

<div class="form-parts">
  <div class="form-parts-icon">
    <jz-icon 
      icon="iconfont icon_consignee"
      :fontSize="40"
    />
    <span>收货方</span>
  </div>
  <div class="form-parts-inputs">
    <el-form-item label="收件人">
      <receiver-select
        :formData="formData"
        value-key="receiverName"
        :sets="sets"
        :disabled="disabled"
        @change="onSelectChange"
      />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formData.receiverMobile" :disabled="disabled" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="formData.receiverAddress" :disabled="disabled" />
    </el-form-item>
  </div>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/icon-form.scss';

</style>
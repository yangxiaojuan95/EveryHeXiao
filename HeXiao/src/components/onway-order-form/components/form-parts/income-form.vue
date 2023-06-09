<script lang="ts">
export default {
  name: 'IncomeForm'
}
</script>

<script setup lang="ts">
import { getDictionaryList } from '@/utils/dictionary-getter';
import { ref } from 'vue';

type Props = {
  formData: OnWayOrderResultModel;
  disabled?: boolean;
}

defineProps<Props>()

const paymentMethodList = ref([])

;(async () => {
  paymentMethodList.value = await getDictionaryList({
    key: '出库结算方式'
  })
})()

</script>

<template>

<div class="form-parts">
  <el-row>
    <el-col :span="8">
      <el-form-item label="付款方式">
        <el-select v-model="formData.settlementMethodCode" placeholder="请选择" style="width: 100%;" :disabled="disabled">
          <el-option 
            v-for="(item) in paymentMethodList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="运费">
        <el-input v-model="formData.transportFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="仓储费">
        <el-input v-model="formData.storageFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="进仓费">
        <el-input v-model="formData.warehousingFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="其它费用">
        <el-input v-model="formData.incomeOtherFee" placeholder="0.00" :disabled="disabled">
          <template #prepend>¥</template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="备注">
        <el-input v-model="formData.incomeRemark" :disabled="disabled"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</div>

</template>

<style lang="scss" scoped>
@import '../../styles/fee-form.scss';
</style>
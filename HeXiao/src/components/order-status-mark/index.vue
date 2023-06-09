<script lang="ts">
export default {
  name: 'OrderStatusMark'
}
</script>

<script setup lang="ts">
import { ReviewFlowStatusEnum } from '@/models/business/common/enum';

type Props = {
  status: ReviewFlowStatusEnum;
}

defineProps<Props>()

</script>

<template>
  <div v-if="status === ReviewFlowStatusEnum.审核通过 || status === ReviewFlowStatusEnum.订单作废" class="order-status">
    <span v-if="status === ReviewFlowStatusEnum.审核通过">已审核</span>
    <span v-else-if="status === ReviewFlowStatusEnum.订单作废">已作废</span>
  </div>
</template>

<style lang="scss" scoped>

.order-status {
  color: var(--danger);
  border: 2px solid;
  padding: 4px 20px;
  border-radius: 4px;
  font-weight: 600;
  transform: rotate(-10deg);
}
</style>

<script lang="ts">
export default {
  name: 'FeeAuditCell'
}
</script>

<script setup lang="ts">
import { OnwayOrderAuditStatusEnum } from '@/models/business/common/enum';
import { computed } from 'vue';

type Props = {
  status: OnwayOrderAuditStatusEnum;
}

const props = defineProps<Props>()

const statusInfo = computed(() => {
  if (props.status === OnwayOrderAuditStatusEnum.未提交) {
    return {
      type: 'red',
      text: '未提交'
    }
  } else if (props.status === OnwayOrderAuditStatusEnum.审批中) {
    return {
      type: 'yellow',
      text: '审批中'
    }
  } else if (props.status === OnwayOrderAuditStatusEnum.付款中) {
    return {
      type: 'green',
      text: '付款中'
    }
  } else if (props.status === OnwayOrderAuditStatusEnum.完结) {
    return {
      type: 'green',
      text: '完结'
    }
  }
})

</script>

<template>
  <statement-cell :type="statusInfo.type">
    {{ statusInfo.text }}
  </statement-cell>
</template>
  
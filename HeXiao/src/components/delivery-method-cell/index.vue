<script lang="ts">
export default {
  name: 'DeliveryMethodCell'
}
</script>

<script setup lang="ts">
  type Props = {
    row: {
      deliveryMethodCode: string;
      deliveryMethodName: string;
    };
  }

  defineProps<Props>();

  const colorMaps: AnyObject = {
    '10001': 'yellow',
    '10002': 'blue',
    '10003': 'green',
    '10004': 'orange',
    '10005': 'purple',
  }

</script>

<template>
  <statement-cell :type="colorMaps[row.deliveryMethodCode]">{{ row.deliveryMethodName }}</statement-cell>
</template>
  
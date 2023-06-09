<script lang="ts">
export default {
  name: 'StatementCell'
}
</script>

<script setup lang="ts">
  type Props = {
    type?: 'orange' | 'green' | 'yellow' | 'purple' | 'blue' | 'red' | 'gray'
  }
  defineProps<Props>()

</script>

<template>
  <span :class="['statement-cell', type]">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.statement-cell {
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  &.orange {
    background-color: orange;
  }
  &.green {
    background-color: #67c23a;
  }
  &.yellow {
    background-color: #c8c44b;
  }
  &.purple {
    background-color: #9370db;
  }
  &.blue {
    background-color: #87ceeb;
  }
  &.red {
    background-color: #ff5118;
  }
  &.gray {
    background-color: gray;
  }
}
</style>
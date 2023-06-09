<script lang="ts">import createBEMNameSpace from '@/frame/utils/bem';
import { computed } from 'vue';


export default {
  name: 'TextImg'
}

</script>

<script setup lang="ts">

const { createBEMName, BEMSpace } = createBEMNameSpace('text-img')

interface Props {
  value?: string;
  width?: number;
  background?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  width: 36
})

const text = computed(() => {
  return (props.value ?? '').slice(0, 1)
})

const style = computed(() => {
  return {
    width: props.width + 'px',
    height: props.width + 'px',
    lineHeight: props.width + 'px',
    background: props.background ?? 'var(--theme)',
    color: props.color ?? '#fff',
    fontSize: props.width / 2.4 + 'px'
  }
})

</script>

<template>

<div :class="BEMSpace" :style="style">
  <span :class="createBEMName('text')">{{ text }}</span>
</div>

</template>

<style lang="scss" scoped>

.text-img {
  text-align: center;
  border-radius: 50%;
  user-select: none;
}

</style>
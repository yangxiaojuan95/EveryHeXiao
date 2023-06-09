<script lang="ts">

export default {
  name: 'ToolScreenfull'
}

</script>

<script setup lang="ts">

import screenfull from 'screenfull'

import JzIcon from '@/frame/components/global/jz-icon/index.vue';

import { computed, ref } from 'vue';

const isScreenfull = ref(false)

const icon = computed(() => {
  return isScreenfull.value ? 'exit-fullscreen' : 'fullscreen'
})

const toggleScreenfull = () => {
  if (isScreenfull.value) {
    screenfull.exit()
  } else {
    screenfull.request()
  }
  isScreenfull.value = !isScreenfull.value
}

</script>


<template>

<JzIcon class="icon" :icon="icon" @click="toggleScreenfull"></JzIcon>

</template>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
}
</style>
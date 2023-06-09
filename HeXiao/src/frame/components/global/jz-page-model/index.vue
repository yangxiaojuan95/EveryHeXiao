<script lang="ts">

export default {
  name: 'JzPageModel'
}
</script>

<script setup lang="ts">

import { BEMSpace } from './utils/bem';
import TopBar from './components/top-bar/index.vue'

</script>

<template>
  <div :class="BEMSpace">
  </div>
</template>
  
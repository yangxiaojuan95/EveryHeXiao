<script lang="ts">
export default {
  name: 'MenuCollapseToggle'
}
</script>

<script setup lang="ts">

import { Fold, Expand } from '@element-plus/icons-vue'

interface Props {
  collapse: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapse: false
})

const emit = defineEmits<{
  (e: 'toggle-collapse', collapse: boolean): void;
}>()

const toggleCollapse = () => {
  emit('toggle-collapse', !props.collapse)
}

</script>

<template>
  <el-icon class="icon" :size="22" @click="toggleCollapse">
    <component :is="props.collapse ? Expand : Fold" />
  </el-icon>
</template>

<style lang="scss" scoped>

.icon {
  cursor: pointer;
  color: #666;
}

</style>
<script lang="ts">
export default {
  name: 'NoexsitCell'
}
</script>

<script setup lang="ts">
type Props = {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: '无数据'
})

</script>

<template>
  <span class="noexsit-text">{{ text }}</span>
</template>

<style lang="scss" scoped>
.noexsit-text {
  color: #aaa;
  font-style: italic;
}
</style>
  
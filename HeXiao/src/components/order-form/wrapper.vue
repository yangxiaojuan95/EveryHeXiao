<script lang="ts">
export default {
  name: 'OrderFormWrapper'
}
</script>

<script setup lang="ts">
  import createBEMNameSpace from '@/frame/utils/bem';
  import { computed, useSlots } from 'vue';
  const { BEMSpace, createBEMName } = createBEMNameSpace('form-wrapper')

  const slots = useSlots()

  const hasFooter = computed(() => {
    return slots.footer
  })

</script>

<template>
  <div :class="BEMSpace">
    <div :class="createBEMName('header')">
      <slot name="header" />
    </div>
    <div :class="createBEMName('main')">
      <el-scrollbar :class="createBEMName('content-wrap')">
        <slot />
      </el-scrollbar>
    </div>
    <div v-if="hasFooter" :class="createBEMName('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  height: 100%;
  background-color: var(--pageBg);
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  box-sizing: border-box;
}

.form-wrapper__header {
  flex-shrink: 0;
  font-size: 14px;
  padding: 0 0 10px;
  align-self: flex-end;
  display: flex;
  align-items: center;
}

.form-wrapper__main {
  flex-grow: 1;
  height: 0;
  background-color: #fff;
}

.form-wrapper__footer {
  flex-shrink: 0;
  height: 48px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  border-top: 1px solid rgb(230, 230, 230);
  padding-left: 24px;
  padding-right: 24px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 8%);
  display: flex;
  align-items: center;
}
</style>

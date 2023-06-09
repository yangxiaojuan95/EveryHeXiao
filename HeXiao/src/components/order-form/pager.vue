<script lang="ts">
export default {
  name: 'OrderFormPager'
}
</script>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'prev'): void;
    (e: 'next'): void;
    (e: 'first'): void;
    (e: 'last'): void;
  }>()

  const onPrev = () => {
    emit('prev')
  }

  const onNext = () => {
    emit('next')
  }

  const onFirst = () => {
    emit('first')
  }

  const onLast = () => {
    emit('last')
  }

</script>

<template>
  <div class="pager-tools">
    <span class="pager-icon" title="上一张单据" @click="onPrev">
      <jz-icon icon="fa-solid fa-angle-left" :fontSize="10" />
    </span>
    <span class="pager-icon" title="第一张单据" @click="onFirst">
      <jz-icon icon="fa-solid fa-angles-left" :fontSize="10" />
    </span>
    <span class="pager-icon" title="最后一张单据" @click="onLast">
      <jz-icon icon="fa-solid fa-angle-right" :fontSize="10" />
    </span>
    <span class="pager-icon" title="下一张单据" @click="onNext">
      <jz-icon icon="fa-solid fa-angles-right" :fontSize="10" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.pager-tools {
  display: flex;
  align-items: center;
}

.pager-icon {
  width: 32px;
  height: 32px;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  margin-right: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(204, 204, 204);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: var(--theme);
  }
}
</style>
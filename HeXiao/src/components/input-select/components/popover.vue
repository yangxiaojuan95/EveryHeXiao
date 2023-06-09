<script lang="ts">
export default {
  name: 'Popover'
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

type Props = {
  visible: boolean;
  width?: string;
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  customClass: ''
})

let firstRender = ref(false)

const posStyle = reactive<{
  top?: string
  left?: string
  bottom?: string
  right?: string
}>({})

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      firstRender.value = true
      nextTick(() => {
        setContentPositonStyle()
      })
    }
  },
  {
    deep: true
  }
)

function getTargetElBoundingRect(element: HTMLElement) {
  return element.getBoundingClientRect()
}

const referenceElRef = ref<any>()

const popoverElRef = ref<any>()

function setContentPositonStyle() {
  const bodyRect = getTargetElBoundingRect(document.body)

  const fullWidth = bodyRect.width
  const fullHeight = bodyRect.height
  const referenceRect = getTargetElBoundingRect(referenceElRef.value)
  const popoverRect = getTargetElBoundingRect(popoverElRef.value)
  

  // 右侧剩余宽度
  let rightLeftWidth = fullWidth - (referenceRect.left + popoverRect.width)
  if (rightLeftWidth < 0) {
    // 右侧宽度不足支撑，向左侧迁移
    posStyle.left = referenceRect.left + rightLeftWidth + 'px'
  } else {
    posStyle.left = referenceRect.left + 'px'
  }

  const bottomLeftHeight = fullHeight - (referenceRect.bottom + popoverRect.height)
  if (bottomLeftHeight < 0) {
    posStyle.top = referenceRect.top - popoverRect.height + 'px'
  } else {
    posStyle.top = referenceRect.bottom + 'px'
  }
}

window.addEventListener('resize', setContentPositonStyle)
onUnmounted(() => {
  window.removeEventListener('resize', setContentPositonStyle)
})

</script>

<template>
  <div ref="referenceElRef" class="popover-reference">
    <slot name="reference" />
  </div>
  <teleport to="body">
    <div
      ref="popoverElRef"
      :class="[{ visible }, 'popover-show-content', customClass]"
      :style="{
        width: width,
        ...posStyle
      }"
    >
      <slot />
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
  .popover-show-content {
    position: absolute;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    z-index: 3999;
    display: none;

    &.visible {
      display: block;
    }
  }
</style>

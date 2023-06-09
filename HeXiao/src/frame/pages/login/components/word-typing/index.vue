<script lang="ts">
export default {
  name: 'WordTyping',
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

type Props = {
  words: string;
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  words: '',
  interval: 150
})

const typeWordRef = ref<HTMLSpanElement>()

let widths: number[] = []

let currentWordWidth = ref(0)

function setAnimate() {
  if (widths.length) {
    currentWordWidth.value += widths.shift() as number
    setTimeout(setAnimate, props.interval);
  }
}

function collecteWidth() {
  if (typeWordRef.value) {
    const children = typeWordRef.value.children as unknown as HTMLSpanElement[]
    widths = Array.from(children).map(span => {
      return span.getBoundingClientRect().width
    })
    setAnimate()
  } else {
    setTimeout(() => {
      collecteWidth()
    }, 20);
  }
}

watch(
  () => props.words,
  () => {
    nextTick(collecteWidth)
  }
)

</script>

<template>
  <span class="word-typing" 
    ref="typeWordRef"
    :style="{
    width: currentWordWidth + 'px'
  }">
    <span v-for="(word, index) in words" :key="index" class="word-item">{{ word }}</span>
  </span>
</template>

<style lang="scss" scoped>
.word-typing {
  display: inline-block;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: caret 1 1s;
}

.word-item {
  display: inline-block;
}

.caret {
  border-right: 1px solid transparent;
  animation: caret 1 1s;
}

@keyframes caret {
  50% {
    border-color: currentColor;
  }
}

</style>
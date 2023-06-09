<script lang="ts">
export default {
  name: 'TableCell'
}
</script>

<script setup lang="ts">
  import { nextTick, onMounted, onUnmounted, ref } from 'vue';

  const emit = defineEmits<{
    (e: 'input-click'): void;
    (e: 'key-tab', event: KeyboardEvent): void;
  }>()

  const cellRef = ref<any>()

  let input: null | HTMLInputElement = null

  const onInputClick = () => {
    emit('input-click')
  }

  const onInputKeydown = (e: KeyboardEvent) => {
    if (e.code === 'Tab') {
      emit('key-tab', e)
    }
  }

  const markInput = () => {
    input = cellRef.value.querySelector('input')

    if (input) {
      input.addEventListener('click', onInputClick)
      input.addEventListener('keydown', onInputKeydown)
    }
  }

  onUnmounted(() => {
    if (input) {
      input.removeEventListener('click', onInputClick)
      input.removeEventListener('keydown', onInputKeydown)
    }
  })

  onMounted(() => {
    markInput()
  })

</script>

<template>
  <div ref="cellRef" class="table-cell">
    <slot />
  </div>
</template>
  
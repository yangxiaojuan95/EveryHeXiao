<script lang="ts">
export default {
  name: 'MyComponent'
}
</script>

<script setup lang="ts">import useClickEvent from './use-click-event';

  type Props = {
    index: number;
  }

  const props = defineProps<Props>()
  
  const {
    plus,
    count
  } = useClickEvent()

  const handleClick = () => {
    plus()
  }

</script>

<template>
  <button @click="handleClick">{{ count }}</button>
</template>
  
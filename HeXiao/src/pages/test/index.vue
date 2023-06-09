<script lang="ts">
export default {
  name: 'ComponentName'
}
</script>

<script setup lang="ts">
  import MyComponent from './component.vue'
</script>

<template>
  <div>
    <div v-for="(i, index) in 4">
      <MyComponent :index="i" />
    </div>
  </div>
</template>
  
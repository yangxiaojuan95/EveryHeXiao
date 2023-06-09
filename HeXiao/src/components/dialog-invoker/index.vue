<script lang="ts">
export default {
  name: 'DialogInvoker'
}
</script>

<script setup lang="ts">
  import { useDialogStore } from '@/store/dialog-invoker'
  import { computed } from 'vue';

  const dialogStore = useDialogStore()

  const dialogs = computed(() => {
    return dialogStore.dialogs
  })

  const onClosed = (index: number) => {
    dialogStore.closeDialog(index)
  }

</script>

<template>
  <div class="dialog-invokers">
    <component
      v-for="(dialog, index) in dialogs"
      :key="(dialog.name || '') + index"
      :is="dialog.name || dialog.component"
      :data="dialog.data"
      :callback="dialog.callback"
      @closed="onClosed(index)"
    />
  </div>
</template>

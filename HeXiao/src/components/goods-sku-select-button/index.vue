<script lang="ts">
export default {
  name: 'GoodsSkuSelectButton'
}
</script>

<script setup lang="ts">
import { useDialogStore } from '@/store/dialog-invoker';

type Props = {
  name: string;
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '选择商品SKU'
})

const emit = defineEmits<{
  (e: 'confirm', data: any): void;
}>()

const dialogStore = useDialogStore()

const showDialog = () => {
  dialogStore.invoke({
    name: 'ChooseGoodsSku',
    callback(data: any) {
      emit('confirm', data)
      dialogStore.close()
    }
  })
}

const onClick = () => {
  showDialog()
}

</script>

<template>
  <el-button @click="onClick">{{ name || placeholder }}</el-button>
</template>

<script lang="ts">
export default {
  name: 'CodeCell',
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  row: AnyObject
  prop: string
  ctx: any
  customClick?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'click'): void;
}>()

const codeValue = computed(() => {
  if (props.row) {
    return props.row[props.prop]
  } else {
    return ''
  }
})

const showUpdateForm = () => {
  if (props.ctx) {
    try {
      props.ctx.context.$parent.handleUpdEvent(props.row)
    } catch (error) {
      console.log('error', error)
    }
  }
}

const onClickCode = () => {
  if (props.customClick) {
    emit('click')
  } else {
    showUpdateForm()
  }
}

</script>

<template>
  <span class="code-cell" :title="codeValue" @click.stop="onClickCode">{{ codeValue }}</span>
</template>

<style lang="scss" scoped>
.code-cell {
  color: rgb(44, 67, 201);
  text-decoration: underline;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

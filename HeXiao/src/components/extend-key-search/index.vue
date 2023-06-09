<script lang="ts">
export default {
  name: 'ExtendKeySearch'
}
</script>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue';

  type Props = {
    extendKeys: { label: string, prop: string }[];
    formData: AnyObject;
  }

  const instance = getCurrentInstance()

  const props = defineProps<Props>()

  // const emit = defineEmits<{
  //   (e: 'change'): void;
  // }>()

  const extendKey = ref('')
  const extendValue = ref('')

  const change = () => {
    // emit('change')
  }

  watch(extendKey,
    (newVal, oldVal) => {
      // 每次类型的变化,需要消除旧值
      props.formData[oldVal as any] = null
      extendValue.value = ''
      change()
    }
  )

  watch(extendValue,
    (newVal) => {
      props.formData[extendKey.value] = newVal
    }
  )

</script>

<template>
  <div class="extend-key-search">
    <el-input v-model="extendValue" @change="change">
      <template #prepend>
        <el-select v-model="extendKey" class="keys-select">
          <el-option 
            v-for="(item, index) in props.extendKeys"
            :key="index"
            :label="item.label"
            :value="item.prop"
          />
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
.extend-key-search {
  display: flex;
  align-items: center;
}

.keys-select {
  width: 100px;
}
</style>
<script lang="ts">
export default {
  name: 'DesignPageRednerer'
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Props {
  config: PageDesignConfigParsed;
  context?: AnyObject;
  reflections?: AnyObject;
}

const props = defineProps<Props>()

const innerConfig = ref<PageDesignConfigParsed>()

const pageModelRef = ref()

watch(
  () => props.config,
  (config) => {
    innerConfig.value = config
  },
  {
    deep: true,
    immediate: true
  }
)

const pageModelConfig = computed({
  get(): any {
    return innerConfig.value?.pageModelConfig
  },
  set(config: any) {
    if (innerConfig.value) {
      return innerConfig.value.pageModelConfig = config
    } else {
      return {}
    }
  }
})

defineExpose({
  pageModelRef,
  config: pageModelConfig
})

</script>

<template>
  <div class="design-page-renderer">
    <page-model
      v-if="pageModelConfig"
      ref="pageModelRef"
      :config="pageModelConfig"
      :reflections="reflections"
      v-on="innerConfig?.globalEvents"
    />
  </div>
</template>

<style lang="scss" scoped>
.design-page-renderer {
  height: 100%;
}
</style>
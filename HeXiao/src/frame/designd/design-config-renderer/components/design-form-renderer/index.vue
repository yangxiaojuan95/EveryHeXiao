<script lang="ts">
export default {
  name: 'DesignFormRednerer'
}
</script>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { PageModelForm, ButtonsRenderer } from '@juzhenfe/page-model'
import { processdRequest } from '@/utils/request';
import { FormGetDataType } from '@/frame/designd/utils/enum';

interface Props {
  config: FormDesignConfigParsed;
  context?: AnyObject;
  reflections?: AnyObject;
}

const props = defineProps<Props>()

const innerConfig = ref<FormDesignConfigParsed>()
const pageModelFormRef = ref<any>()

const getFormData = async () => {
  if (!innerConfig.value) {
    return false
  }
  
  const dataConfig = innerConfig.value.dataConfig

  let formData = {}

  if (dataConfig.type === FormGetDataType['API获取']) {
    formData = await processdRequest[dataConfig.getMethod as keyof typeof processdRequest](dataConfig.getUrl)
  } else if (dataConfig.type === FormGetDataType['外层设置']) {
    formData = props.context?.formData || {}
  }

  pageModelFormRef.value.setFormData(formData)
}

watch(
  () => props.config,
  (config) => {
    innerConfig.value = config
    nextTick(() => {
      getFormData()
    })
  },
  {
    deep: true,
    immediate: true
  }
)

const onCustomEvent = async (event: string) => {
  if (!innerConfig.value) {
    return false
  }

  if (event === 'submit') {
    const dataConfig = innerConfig.value.dataConfig
    // 提交
    const data = await pageModelFormRef.value.getFormData()
    await processdRequest[dataConfig.putMethod as keyof typeof processdRequest](dataConfig.putUrl, data)
    getFormData()
  }
}

defineExpose({
  pageModelFormRef
})

</script>

<template>
  <div v-if="innerConfig" class="design-form-renderer">
    <page-model-form ref="pageModelFormRef" :form="innerConfig.pageModelFormConfig" :reflections="reflections" />
    <div :style="innerConfig.formActions.style">
      <buttons-renderer :els="innerConfig.formActions.els" @custom="onCustomEvent" />
    </div>
  </div>
</template>

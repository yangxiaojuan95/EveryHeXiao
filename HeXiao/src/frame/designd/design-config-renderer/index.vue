<script lang="ts">
export default {
  name: 'DesignConfigRenderer'
}
</script>

<script setup lang="ts">
  import { computed, nextTick, onMounted, reactive, ref } from 'vue';
  import DesignFormRenderer from './components/design-form-renderer/index.vue'
  import DesignPageRenderer from './components/design-page-renderer/index.vue'
  import * as stringFns from '@/frame/designd/utils/string-fn';
  import parse from '@juzhenfe/parse-design-config'
  import { parseReflections } from '@/frame/designd/utils/parser-reflections';
  import { getCommonParseContext } from '@/frame/designd/utils/parse-common-context';
  import { processdRequest } from '@/utils/request';
  import { FormDialog } from '@juzhenfe/page-model'
  import cloneDeep from 'lodash.clonedeep';
  import { ConfigType } from '@/frame/designd/utils/enum'

  interface Props {
    model: PageDesignModel;
    context?: AnyObject;
  }
  const props = defineProps<Props>()
  
  const transferKeys = Object.values(stringFns).map(val => {
    return {
      from: val,
      to: val.stringFnPropertyToRaw()
    }
  })

  const rendererComponentRef = ref<any>()

  const type = computed(() => {
    return props.model.type
  })

  const dialogVisible = ref(false)
  const dialogConfig = ref<any>()
  const dialogInvokeOpt = ref<AnyObject>()
  const dialogProps = ref<AnyObject>({})
  const dialogEvents = ref<AnyObject>({})
  const dialogHeight = ref('auto')

  // 拉起连接设计组件
  const invokeDialog = async (name: string, invokeOpt?: AnyObject) => {
    if (!Array.isArray(parsedConfig.dialogs)) {
      return false
    }

    let dialog = parsedConfig.dialogs.find((d: any) => d.name === name)
    if (!dialog) {
      return false
    }

    dialog = cloneDeep(dialog)

    if (dialog.dialogProps) {
      dialogProps.value = dialog.dialogProps
      if (dialog.dialogProps.height) {
        dialogHeight.value = dialog.dialogProps.height
      } else {
        dialogHeight.value = 'auto'
      }
      delete dialogProps.value.height
    } else {
      dialogProps.value = {}
    }

    if (dialog.dialogEvents) {
      dialogEvents.value = dialog.dialogEvents
    } else {
      dialogEvents.value = {}
    }

    dialogInvokeOpt.value = invokeOpt ?? {}

    const pageConfigResult = await processdRequest.get('/design-page/detail', {
      name: dialog.name
    })

    dialogConfig.value = pageConfigResult.data
    dialogVisible.value = true
  }

  // 数据库保存的原始配置（携带字符串函数）
  const rawConfig: AnyObject = JSON.parse(props.model.config)
  // 解析原始配置
  const parsedConfig: AnyObject = parse(rawConfig, transferKeys, {
    ...getCommonParseContext(),
    ...props.context,
    invokeDialog
  })

  // 解析反射数据
  const reflections = reactive<any>({})
  const processReflections = (config: AnyObject) => {
    if (config.reflectionConfigList) {
      parseReflections(config.reflectionConfigList, reflections)
    }
  }
  processReflections(parsedConfig)

  // 解析配置的生命周期
  const lifecycle = parsedConfig.lifecycle || {}

  // 执行挂载的生命周期
  onMounted(() => {
    if (typeof lifecycle.onMounted === 'function') {
      nextTick(() => {
        lifecycle.onMounted.call(rendererComponentRef.value, props.context)
      })
    }
  })

</script>

<template>
  <div class="design-config-renderer">
    <component
      ref="rendererComponentRef"
      :is="type === ConfigType.页面配置 ? DesignPageRenderer : DesignFormRenderer"
      :config="parsedConfig"
      :context="context"
      :reflections="reflections"
    />

    <!-- 连接组件 -->
    <form-dialog
      v-if="dialogConfig"
      :title="dialogProps.title"
      v-model="dialogVisible"
      :dialogEvents="dialogEvents"
      :dialogProps="{
        'destroy-on-close': true,
        ...dialogProps,
      }"
    >
      <div :style="{
        height: dialogHeight
      }">
        <design-config-renderer 
          :model="dialogConfig" 
          :context="dialogInvokeOpt" 
        />
      </div>
    </form-dialog>
  </div>
</template>

<style lang="scss" scoped>
.design-config-renderer {
  height: 100%;
}
</style>
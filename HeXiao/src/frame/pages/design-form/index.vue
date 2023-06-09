<script lang="ts">
export default {
  name: 'DesignFormPage'
}
</script>

<script setup lang="ts">
  import { processdRequest } from '@/utils/request';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router'
  import DesignForm from '@/frame/designd/design-form/index.vue'

  const route = useRoute()
  const isReady = ref(false)
  // 当前配置的节点id name
  const pointId = route.params.pointId as string

  // 页面渲染的配置
  let config = ref<any>()

  // 根据节点获取配置
  const getPointConfig = async (pointId: string) => {
    const result = await processdRequest.get('/design-page/detail', {
      name: pointId
    })
    config.value = JSON.parse(result.data.config)
    isReady.value = true
  }

  getPointConfig(pointId)
</script>

<template>
  <div class="designd-form-page">
    <design-form :config="config" />
  </div>
</template>

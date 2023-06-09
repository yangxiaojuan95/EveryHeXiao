<script lang="ts">
export default {
  name: 'DesignPage'
}
</script>

<script setup lang="ts">
  import { processdRequest } from '@/utils/request';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router'
  import DesignConfigRenderer from '@/frame/designd/design-config-renderer/index.vue'

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
    config.value = result
    isReady.value = true
  }

  getPointConfig(pointId)

</script>

<template>
  <div v-loading="!isReady && config" element-loading-text="准备中" class="design-page">
    <design-config-renderer v-if="config" :model="config" />
  </div>
</template>

<style lang="scss" scoped>
.design-page {
  height: 100%;
}
</style>
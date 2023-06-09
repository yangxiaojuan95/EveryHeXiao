<script lang="ts">
export default {
  name: 'StatisticForms'
}
</script>

<script setup lang="ts">

  import { defineConfig } from '@juzhenfe/page-model'
  import { useRoute } from 'vue-router';
  import { processdRequest } from '@/utils/request';
  import { nextTick, ref } from 'vue';

  const route = useRoute()

  const pointId = route.params.pointId as string

  const isReady = ref(false)

  const pageRef = ref<any>()

  const config = defineConfig({
    getImmediate: false,
    table: {
      pagination: {
        show: false
      },
      els: []
    }
  })

  // 获取配置接口
  const getPointApiConfig = async (id: string) => {
    const result = await processdRequest.get<any>(`/api/endpoints/config/${id}`)
    const {table, filters } = result.spec
    config.table.els = table

    let filterEls: any[] = []
    if (filters) {
      filterEls = filters.map((item: any) => {
        return {
          ...item,
          eType: 'el-input',
          props: {
            placeholder: item.label
          }
        }
      })
    }
    config.searchForm = {
      els: filterEls
    }

    config.getUrl = result.metadata.annotations.endPointApi

    isReady.value = true

    // 获取数据
    nextTick(() => {
      pageRef.value.manager.doGetDataRequest()
    })
  }

  getPointApiConfig(pointId)

</script>

<template>
  <div v-loading="!isReady" element-loading-text="配置准备中" class="report-forms">
    <page-model v-if="isReady" ref="pageRef" :config="config" />
  </div>
</template>

<style lang="scss" scoped>

.report-forms {
  height: 100%;
}

</style>

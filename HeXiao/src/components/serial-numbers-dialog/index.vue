<script lang="ts">
export default {
  name: 'SerialNumbers'
}
</script>

<script setup lang="ts">
import APIS from '@/constants/apis';
import { processdRequest } from '@/utils/request';
import { FormDialog } from '@juzhenfe/page-model'
import { ref } from 'vue';

const visible = ref(false)

const loading = ref(false)

const serialNumbers = ref<string[]>([])

/**
 * 获取序列号
 * @param id 拣货单id
 */
const getSerialNumbers = async (id: string) => {
  loading.value = true

  try {
    const result = await processdRequest.get<string[]>(APIS.JH_ORDER_SERIAL_NUMBER_URL, {
      id: id
    })
    serialNumbers.value = result
  } catch (error) {
    
  } finally {
    loading.value = false
  }
}

const show = (jhOrderId: string) => {
  visible.value = true
  getSerialNumbers(jhOrderId)
}

defineExpose({
  show
})

</script>

<template>
  <form-dialog
    title="查看序列号"
    v-model="visible"
    width="500px"
  >
    <div class="serial-number" v-loading="loading" element-loading-text="加载中">
      <template v-if="!loading">
        <div v-if="serialNumbers.length">
          <div v-for="(number) in serialNumbers" :key="number" class="serial-number-item">
            <el-tag>{{ number }}</el-tag>
          </div>
        </div>
        <el-empty v-else description="暂无序列号" />
      </template>
    </div>
  </form-dialog>
</template>

<style lang="scss" scoped>
.serial-number {
  padding: 10px 0;
  min-height: 200px;
}

.serial-number-item {
  display: inline-block;
  vertical-align: top;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
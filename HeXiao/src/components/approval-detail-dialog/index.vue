<script lang="ts">
export default {
  name: 'ApprovalDetailDialog'
}
</script>
  
<script setup lang="ts">
import APIS from '@/constants/apis';
import { processdRequest } from '@/utils/request';
import { FormDialog } from '@juzhenfe/page-model'
import { ref } from 'vue';

const visible = ref(false)

const loading = ref(false)

const approvalInfo = ref<any>({})

const currentApprovalIndex = ref(0)

async function getApprovalInfo(aprovalId: string) {
  loading.value = true
  const result = await processdRequest.get(APIS.APPROVAL_ORDER_DETAIL_URL, {
    id: aprovalId
  })
  loading.value = false
  approvalInfo.value = result
  currentApprovalIndex.value = result.items.findIndex(a => a.isPass == null)
}

const show = (aprovalId: string) => {
  visible.value = true
  approvalInfo.value = {}
  currentApprovalIndex.value = 0
  getApprovalInfo(aprovalId)
}

defineExpose({
  show
})

</script>

<template>
  <form-dialog
    title="审核进度"
    v-model="visible"
    width="500px"
  >
    <div
      class="serial-number"
      v-loading="loading"
      element-loading-text="加载中"
    >
      <template v-if="!loading">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in approvalInfo.items"
            :key="index"
            :timestamp="item.reviewTime"
          >
            <template v-if="item.isPass == null">
              <template v-if="index > currentApprovalIndex">
                <span class="unactive">【{{ item.roleName }}】</span>
              </template>
              <template v-else>
                <span>【{{ item.roleName }}】 正在审核</span>
              </template>
            </template>
            <template v-else-if="item.isPass === true">
              <span>【{{ item.staffName }}】 通过了审核</span>
            </template>
            <template v-else>
              <span>【{{ item.staffName }}】 未通过审核</span>
            </template>
          </el-timeline-item>
        </el-timeline>
      </template>
    </div>
  </form-dialog>
</template>
  
<style lang="scss" scoped>
  .serial-number {
    min-height: 300px;
  }
  
  .unactive {
    color: #999;
  }
</style>
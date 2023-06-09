<script lang="ts">
export default {
  name: 'ChooseReceiver'
}
</script>

<script setup lang="ts">
import APIS from '@/constants/apis';
import SideTree from '../components/side-tree/index.vue'
import { defineConfig, FormDialog } from '@juzhenfe/page-model';
import { SenderReceiverTypeEnum } from '@/models/business/common/enum';
import { nextTick, ref, watch } from 'vue';

type Props = {
  data?: AnyObject;
  callback?: Function;
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'closed'): void;
}>()

const visible = ref(true)

const pageModelRef = ref<any>()

const submit = () => {
  const data = pageModelRef.value.getRadioData()
  props.callback && props.callback(data)
}

const onClosed = () => {
  emit('closed')
}

const config = defineConfig<SenderReceiverModel>({
  getUrl: APIS.CUSTOMER_ORDERS_URL,
  otherParams: {
    type: SenderReceiverTypeEnum.收件人
  },
  searchForm: {
    els: [
      {
        eType: 'el-input',
        prop: 'keywords',
        props: {
          placeholder: '名称',
          clearable: true
        }
      }
    ]
  },
  table: {
    pagination: {
      show: false
    },
    showRadio: true,
    showIndex: true,
    showTools: false,
    els: [
      {
        label: '收件人',
        prop: 'personName',
      },
      {
        label: '电话',
        prop: 'personMobile',
      },
      {
        label: '地址',
        prop: 'totalAddress',
      }
    ]
  },
  hasForm: false
})

</script>

<template>
  <form-dialog
    v-model="visible"
    append-to-body
    :close-on-click-modal="false"
    title="收件人"
    width="960px"
    @closed="onClosed"
  >
    <div class="dialog-content">
      <div class="list-data">
        <page-model
          ref="pageModelRef"
          :config="config"
        />
      </div>
    </div>
    <template #bottom>
      <el-button
        type="primary"
        @click="submit"
      >确定</el-button>
    </template>
  </form-dialog>
</template>

<style lang="scss" scoped>
.dialog-content {
  height: 500px;
  display: flex;
}

.side-tree-data {
  flex-shrink: 0;
  width: 260px;
  border-right: 1px solid rgb(230, 230, 230);
}

.list-data {
  flex-grow: 1;
  width: 0;
}
</style>

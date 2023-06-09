<script lang="ts">
export default {
  name: 'ChooseMiddleTransformCompany'
}
</script>

<script setup lang="ts">
import APIS from '@/constants/apis';
import { defineConfig, FormDialog } from '@juzhenfe/page-model';
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

const config = defineConfig<MiddleTransformCompanyResultModel>({
  getUrl: APIS.MIDDLE_TRANSFORM_COMPANY_SELECT_URL,
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
        label: '中转公司',
        prop: 'name',
        props: {
          showOverflowTooltip: true
        },
        width: 120
      },
      {
        label: '经营人',
        prop: 'linkman',
        width: 120
      },
      {
        label: '电话',
        prop: 'linkmanPhone',
        width: 160
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
    title="中转公司"
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

<script lang="ts">
export default {
  name: 'ChooseWarehouseLocation'
}
</script>

<script setup lang="ts">
import SideTree from '../components/side-tree/index.vue'
import { defineConfig, FormDialog } from '@juzhenfe/page-model';
import { nextTick, ref, watch } from 'vue';
import APIS from '@/constants/apis';

type Props = {
  data?: AnyObject;
  callback?: Function;
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'closed'): void;
}>()

const visible = ref(true)

const currentType = ref('')

const pageModelRef = ref<any>()

const submit = () => {
  const data = pageModelRef.value.getRadioData()
  props.callback && props.callback(data)
}

const onClosed = () => {
  emit('closed')
}

const config = defineConfig<WarehouseLocationResultModel>({
  getUrl: APIS.WAREHOUSE_LOCATION_SELECT_URL,
  otherParams: {
    warehouseId: null,
    enabled: true
  },
  searchForm: {
    els: [
      {
        eType: 'el-input',
        prop: 'name',
        props: {
          placeholder: '仓位名称',
          clearable: true
        }
      }
    ]
  },
  table: {
    showRadio: true,
    showTools: false,
    els: [
      {
        label: '仓位编码',
        prop: 'code'
      },
      {
        label: '仓位名称',
        prop: 'name'
      }
    ]
  },
  hasForm: false
})

// 监听左侧分类的变化
watch(
  () => currentType,
  () => {
    if (config.otherParams) {
      config.otherParams.warehouseId = currentType.value
      nextTick(() => {
        pageModelRef.value.refreshTableData()
      })
    }
  },
  {
    deep: true
  }
)

</script>

<template>
  <form-dialog
    v-model="visible"
    append-to-body
    :close-on-click-modal="false"
    title="仓位"
    width="960px"
    @closed="onClosed"
  >
    <div class="dialog-content">
      <div class="side-tree-data">
        <side-tree
          v-model:type="currentType"
          api="/api/Warehouses"
          :tree-props="{
            label: 'name',
            value: 'id',
            pId: 'pId',
            children: 'childs'
          }"
        />
      </div>
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

<script lang="ts">
export default {
  name: "ChooseStaff",
};
</script>

<script setup lang="ts">
import APIS from "@/constants/apis";
import SideTree from "../components/side-tree/index.vue";
import { defineConfig, FormDialog } from "@juzhenfe/page-model";
import { nextTick, ref, watch } from "vue";

type Props = {
  data?: AnyObject;
  callback?: Function;
};
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "closed"): void;
}>();

const currentType = ref("");

const visible = ref(true);

const pageModelRef = ref<any>();

const submit = () => {
  const data = pageModelRef.value.getRadioData();
  props.callback && props.callback(data);
};

const onClosed = () => {
  emit("closed");
};

// 监听左侧分类的变化
watch(
  () => currentType,
  () => {
    if (config.otherParams) {
      config.otherParams.departmentId = currentType.value;
      nextTick(() => {
        pageModelRef.value.refreshTableData();
      });
    }
  },
  {
    deep: true,
  }
);

const config = defineConfig<StaffResultModel>({
  getUrl: APIS.STAFF_SELECT_URL,
  otherParams: {
    enabled: true,
  },
  searchForm: {
    els: [
      {
        eType: "el-input",
        prop: "keywords",
        props: {
          placeholder: "员工名称",
          clearable: true,
        },
      },
    ],
  },
  table: {
    pagination: {
      show: false,
    },
    showRadio: true,
    showIndex: true,
    showTools: false,
    els: [
      {
        label: "员工编码",
        prop: "code",
      },
      {
        label: "员工名称",
        prop: "name",
      },
      {
        label: "员工电话",
        prop: "mobile",
      },
    ],
  },
  hasForm: false,
});
</script>

<template>
  <form-dialog
    v-model="visible"
    append-to-body
    :close-on-click-modal="false"
    title="员工"
    width="960px"
    @closed="onClosed"
  >
    <div class="dialog-content">
      <div class="side-tree-data">
        <side-tree
          v-model:type="currentType"
          :api="APIS.DEPARTMENT_SELECT_URL"
          :tree-props="{
            label: 'name',
            value: 'id',
            pId: 'pId',
            children: 'childs',
          }"
        />
      </div>
      <div class="list-data">
        <page-model ref="pageModelRef" :config="config" />
      </div>
    </div>
    <template #bottom>
      <el-button type="primary" @click="submit">确定</el-button>
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

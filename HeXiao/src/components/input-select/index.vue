<script lang="ts">
// 辅助选择型输入框
export default {
  name: "InputSelect",
};
</script>

<script setup lang="ts">
import MyPopover from "./components/popover.vue";
import debounce from "lodash.debounce";

import { onUnmounted, ref, useAttrs } from "vue";
import { ChatDotRound, Close } from "@element-plus/icons-vue";
import useQuickShowTable from "./use-quick-show-table";
import useVisible from "./use-visible";
import useKeyboardEvents from "./use-keyboard-events";

interface Props {
  // 输入框值
  modelValue?: string | null;
  // 值的key
  valueKey: string;
  // 配置
  config: any;
  // 宽度
  width?: string;
  // 聚焦即显示
  focusGetImmediate?: boolean;
  // 获取时的动态参数
  params?: AnyObject;
  // 获取时的静态参数
  staticParams?: AnyObject;
  // 是否需要清空
  clearable?: boolean;
  // 过滤数据的函数
  filterFn?: Function;
}

// 参数
const compProps = withDefaults(defineProps<Props>(), {
  width: "300px",
  focusGetImmediate: false,
});

// 事件提交
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "select-data", row: AnyObject): void;
  (e: "show-more"): void;
  (e: "changeValue"): void;

}>();

const attrs = useAttrs();

/**
 * 提交选中的数据
 */
const emitChange = (row?: AnyObject) => {
  // 提交选定的值
  emit("update:modelValue", row?.[compProps.valueKey] ?? "");
  // 提交选择行事件
  emit("select-data", row ?? {});

  hidePopover();
};

/**
 * 使用表格
 */
const { pageModelRef, quickConfig, getTableData, tableData } = useQuickShowTable(
  compProps,
  {
    // 选中行数据，做一次提交
    rowClick: function (row: any) {
      handleRowClick(row);
    },
  }
);

/**
 * 控制popup的显隐
 */
const { visiblePopover, isHoldingPop, hidePopover, showPopover } = useVisible(
  getTableData
);

/**
 * 点击内容的时候，离开焦点，保持不隐藏
 */
const onContentClick = () => {
  isHoldingPop.value = true;
  setTimeout(() => {
    isHoldingPop.value = false;
  }, 150);
};

/**
 * 点击选中行数据，提交数据
 * @param row
 */
const handleRowClick = (row: AnyObject) => {
  emitChange(row);
};

/**
 * 点击清空按钮
 */
const handleClearContent = () => {
  emitChange();
};

/**
 * 搜索用户的数据
 */
const searchDatas = debounce(async () => {
  setCurrentHilightIndex(-1);
  showPopover();
}, 500);

// 用户输入字符串
const onUpdateModelValue = (val: string) => {
  // 更新值
  emit("update:modelValue", val);

  // 进行远程搜索
  searchDatas();
};

// 聚焦
const onFocus = () => {
  if (compProps.focusGetImmediate || compProps.modelValue) {
    showPopover();
  }
};

// 失去聚焦
const onBlur = () => {
  setTimeout(hidePopover, 120);
};

// 查看更多数据
const handleShowMore = () => {
  if (attrs.disabled) {
    return false;
  }
  emit("show-more");
  hidePopover();
};

const {
  highlightRowIndex,
  setCurrentHilightIndex,
  setNextLine,
  setPrevLine,
} = useKeyboardEvents(tableData, pageModelRef);

const getCurrentHightRow = () => {
  return tableData.value[highlightRowIndex.value];
};

// 监听键盘事件
const onKeydown = (e: any) => {
  if (e.key === "ArrowUp") {
    setPrevLine();
  } else if (e.key === "ArrowDown") {
    setNextLine();
  } else if (e.key === "Enter") {
    const row = getCurrentHightRow();
    row && handleRowClick(row);
  }
  e.stopPropagation();
};

/**
 * 添加点击外部隐藏事件
 */
document.addEventListener("click", hidePopover);
onUnmounted(() => {
  hidePopover();
  document.removeEventListener("click", hidePopover);
});

// 外部设置选中当前行
const setCurrentRow = (data: AnyObject) => {
  handleRowClick(data);
};

defineExpose({
  setCurrentRow,
});
</script>

<template>
  <div class="input-selector">
    <my-popover :visible="visiblePopover" :width="width" custom-class="my-popover">
      <template #reference>
        <div class="input-selector__input" @click.stop>
          <el-input
            :modelValue="modelValue"
            v-bind="$attrs"
            @update:modelValue="onUpdateModelValue"
            @focus="onFocus"
            @blur="onBlur"
            @keydown="onKeydown"
          />
          <!-- <i class="fa-regular fa-comment-dots more-info" @click="handleShowMore"></i> -->
        </div>
      </template>
      <template #default>
        <div class="popover-content" @click="onContentClick">
          <page-model
            v-if="quickConfig"
            ref="pageModelRef"
            :config="quickConfig"
            style="height: 180px"
          />
          <div class="input-selector__actions">
            <div class="action-item">
              <!-- <el-button
                tabindex="-1"
                type="primary"
                link
                size="small"
                :icon="ChatDotRound"
                @click="handleShowMore"
                >查看更多</el-button
              > -->
              <el-button
                tabindex="-1"
                type="primary"
                link
                v-if="clearable"
                :icon="Close"
                size="small"
                @click="handleClearContent"
                >清除选项</el-button
              >
            </div>
          </div>
        </div>
      </template>
    </my-popover>
  </div>
</template>

<style lang="scss">
.my-popover {
  border-radius: 0 !important;
  padding: 0 !important;

  .page-model__main {
    padding: 0;
  }

  .el-table__row {
    cursor: pointer;
  }
}

.input-selector__input {
  position: relative;
  width: 100%;

  .el-input__inner {
    padding-right: 34px !important;
  }

  .more-info {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
    color: #666;
  }
}

.input-selector__actions {
  display: flex;
  align-items: center;
  padding: 10px 8px;
}

.action-item {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 50%;
  text-align: center;
}

.form-dialog-more {
  & > .el-dialog__header {
    border-bottom: 1px solid #eee;
    padding-top: 10px;

    .el-dialog__title {
      font-size: 16px;
    }
  }

  & > .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
  }

  & > .el-dialog__headerbtn {
    top: 0;
  }
}

.more-dialog-body {
  height: 500px;
}
</style>

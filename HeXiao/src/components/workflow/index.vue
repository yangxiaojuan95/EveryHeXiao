<script lang="ts">
export default {
  name: 'Workflow'
}
</script>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue'
import TableCell from '@/components/editable-table/components/table-cell/index.vue'
import { TableCellRenderer } from '@juzhenfe/page-model'

type Props = {
  data: any[];
  els: any[];
  props?: AnyObject;
}

const emit = defineEmits<{
  (e: 'remove', data: any[]): void;
}>()

// 组件数据
const props = withDefaults(defineProps<Props>(), {

})

// 表格引用
const tableRef = ref<any>()

// 表格数据
const tableData = ref<any[]>([])

// 是否响应键盘事件
const isResponseKeyboardEvents = ref(false)

// 添加一条数据
const addTableData = (index: number) => {
  // if (props.noAddable) {
  //   return false
  // }
  tableData.value.splice(index + 1, 0, {})
  genTableDataIndex()
}

// 移除一条数据
const removeTableData = (index: number) => {
  tableData.value.splice(index, 1)
  console.log('减')
  genTableDataIndex()
  emit('remove', tableData.value)
}

// 当前编辑的行索引
const currentEditRowIndex = ref(0)

// 当前悬浮的行索引
const currentHoverRowIndex = ref(-1)

// 判断是否当前行是处于聚焦状态
const isCurrentRowFocus = (index: number) => {
  return index === currentEditRowIndex.value || index === currentHoverRowIndex.value
}

// 进入单元格
const onCellMouseEnter = (row: AnyObject) => {
  currentHoverRowIndex.value = row._rowIndex
}

// 离开单元格
const onCellMouseLeave = () => {
  currentHoverRowIndex.value = -1
}

// 行点击
const onRowClick = (row: AnyObject, column: AnyObject, event: any) => {
  event.stopPropagation()
  currentEditRowIndex.value = row._rowIndex
  isResponseKeyboardEvents.value = true
}

const onInputClick = (index: number) => {
  currentEditRowIndex.value = index
  isResponseKeyboardEvents.value = true
}

const onInputKeyTabEvent = (isFinalColumn: boolean, event: KeyboardEvent) => {
  if (isFinalColumn) {
    addTableData(currentEditRowIndex.value)
    currentEditRowIndex.value += 1
  }
}

// 生成表格数据
const genTableData = () => {
  tableData.value = props.data
  if (!props.data.length) {
    addTableData(0)
  }
  console.log('加')
  genTableDataIndex()
}

// 生成每条数据的索引
const genTableDataIndex = () => {
  tableData.value.forEach((item, index) => {
    item._rowIndex = index
  })
}

// 设置行的class
const setRowClassName = ({ row, rowIndex }: AnyObject) => {
  const isFocus = isCurrentRowFocus(rowIndex)
  return isFocus ? 'hilight' : ''
}

// 监听传入的数据的变化
watch(
  () => props.data,
  () => {
    genTableData()
  },
  {
    deep: true,
    immediate: true
  }
)

let data: any[] = reactive([''])

const add = (index: number) => {
  data.push('')
  console.log(data)
}

const remove = (index: number) => {
  if (data.length <= 1) { //如果只有一个框则不可以删除
    return false
  }
  data.splice(index, 1)
  console.log('减')
  emit('remove', data)
}
const onUpdateModelValue = (val: string,i: number) => {
  console.log(val)
  data[i] = val
}
</script>

<template>

  <div>
    <div>开始流程</div>

    <div class="img-icon">
      <el-icon class="editable-table-icon plus-icon">加</el-icon>
      <img src="/public/imgs/jiantou.png" />
      <el-icon class="editable-table-icon remove-icon">减</el-icon>
    </div>
    <div
      fixed="left"
      width="50"
    >

      <div v-for="item,i in data">
        <el-input
          :modelValue="item"
          @input="onUpdateModelValue($event,i)"
        />
        <div class="img-icon">
          <el-icon
            class="editable-table-icon plus-icon"
            @click="add(i)"
          >加</el-icon>
          <img src="/public/imgs/jiantou.png" />
          <el-icon
            class="editable-table-icon remove-icon"
            @click="remove(i)"
          >减</el-icon>
        </div>
      </div>
    </div>
    <div>结束流程</div>
  </div>

  <!-- <el-table
    ref="tableRef"
    class="editable-table"
    highlight-current-row
    :data="tableData" 
    :row-class-name="setRowClassName"
    v-bind="props.props"
    :cell-style="{ height: '40px', boxSizing: 'border-box', padding: 0 }"
    @cell-mouse-enter="onCellMouseEnter"
    @cell-mouse-leave="onCellMouseLeave"
    @row-click="onRowClick"
  >
    <el-table-column fixed="left" width="50">
      <template #default="{ row, $index }">
        <div class="edit-table-index-cell">
          <template v-if="isCurrentRowFocus($index)">
            <el-icon class="editable-table-icon plus-icon" @click.stop="addTableData($index)">
              <circle-plus-filled />
            </el-icon>
            <el-icon class="editable-table-icon remove-icon" @click.stop="removeTableData($index)">
              <remove-filled />
            </el-icon>
          </template>
          <span v-else>{{ $index + 1 }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      v-for="(column, index) in els"
      :key="column.label"
      :label="column.label"
      :prop="column.prop"
      :width="column.width"
      :minWidth="column.minWidth"
      v-bind="column.props"
    >
      <template #header>
        <span v-if="column.required" class="column-required">*</span>
        {{ column.label || '' }}
      </template>
      <template v-if="column.renderFn" #default="{ row, $index }">
        <table-cell 
          class="cell-inner"
          @input-click="onInputClick($index)"
          @key-tab="onInputKeyTabEvent(index === els.length - 1, $event)"
        >
          <div v-show="isCurrentRowFocus($index)">
            <table-cell-renderer
              :render-fn="column.renderFn"
              :args="[row, $index]"
            />
          </div>
          <span v-show="!isCurrentRowFocus($index)">{{ row[column.prop] }}</span>
        </table-cell>
      </template>
    </el-table-column>
  </el-table> -->
</template>

<style lang="scss">
.editable-table {
  .hilight {
    background-color: rgb(233, 242, 253);
  }

  .editable-table-icon {
    font-size: 16px;
    padding: 4px;
    cursor: pointer;
  }

  .plus-icon {
    color: rgb(35, 134, 238);
  }

  .remove-icon {
    color: rgb(250, 80, 80);
  }

  .column-required {
    color: red;
  }

}

.edit-table-index-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

// .img-icon{
//   display: flex;
//   justify-content: space-around;
// }
</style>
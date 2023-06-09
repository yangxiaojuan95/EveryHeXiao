import { Ref, ref, watch } from "vue"

/**
 * 使用键盘事件
 * @returns 
 */
export default function useKeyboardEvents(tableData: Ref<any[]>, pageModelRef: Ref<any>) {

  /**
   * 当前表格聚焦行索引
   */
  let highlightRowIndex = ref(-1)

  const getCurrentTableDataLength = () => tableData.value.length

  // 设置当前的索引
  const setCurrentHilightIndex = (index: number) => {
    highlightRowIndex.value = index
  }

  // 移动至上一行
  const setPrevLine = () => {
    let val = highlightRowIndex.value - 1
    val = val < 0 ? getCurrentTableDataLength() - 1 : val
    setCurrentHilightIndex(val)
  }

  // 移动至下一行
  const setNextLine = () => {
    let val = highlightRowIndex.value + 1
    val = val > (getCurrentTableDataLength() - 1) ? 0 : val
    setCurrentHilightIndex(val)
  }

  /**
   * 监听当前索引变化，更新
   */
  watch(
    () => highlightRowIndex,
    () => {
      if (highlightRowIndex.value !== -1) {
        const row = tableData.value[highlightRowIndex.value]
        pageModelRef.value.manager.tableManager.tableRef.setCurrentRow(row)
      } else {
        pageModelRef.value.manager.tableManager.tableRef.setCurrentRow()
      }
    },
    {
      deep: true
    }
  )

  return {
    highlightRowIndex,
    setCurrentHilightIndex,
    setPrevLine,
    setNextLine
  }
}
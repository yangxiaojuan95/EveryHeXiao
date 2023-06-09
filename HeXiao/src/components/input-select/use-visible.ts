import { nextTick, ref } from "vue";

/**
 * 控制popup是否显示
 */
export default function useVisible(showCallback: Function) {

  /**
   * 显示表格
   */
  const visiblePopover = ref(false)

  /**
   * 是否在失去聚焦时保持显示
   */
  const isHoldingPop = ref(false)

  /**
   * 隐藏弹出层
   */
  const hidePopover = () => {
    if (isHoldingPop.value) {
      return false
    }
    visiblePopover.value = false
  }

  /**
   * 显示弹出层
   */
  const showPopover = () => {
    visiblePopover.value = true
    setTimeout(() => {
      showCallback()
    }, 0);
  }

  return {
    visiblePopover,
    isHoldingPop,
    hidePopover,
    showPopover,
  }
}

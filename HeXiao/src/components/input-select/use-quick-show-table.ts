/**
 * 创建用于显示表格的page-modle配置
 */

import { processdRequest } from "@/utils/request"
import { defineConfig } from "@juzhenfe/page-model"
import { ref, watch } from "vue"
import isEqual from 'lodash.isequal'

export default function useQuickShowTable(props: any, events: AnyObject) {

  /**
   * 表格组件实例
   */
  const pageModelRef = ref<any>()

  /**
   * 表格配置
   */
  const quickConfig = defineConfig({
    ...props.config,
    size: 'small',
    getImmediate: false,
    table: {
      ...props.config.table,
      showTools: false,
      props: {
        stripe: true,
        highlightCurrentRow: true,
        headerCellStyle: {
          backgroundColor: '#fff',
          textAlign: 'center'
        }
      },
      events: {
        ...events
      },
      pagination: {
        show: false,
      },
    },
    hasForm: false,
    searchForm: undefined,
    actions: null,
    tabs: undefined,
  })

  /**
   * 表格数据
   */
  const tableData = ref<any[] | null>(null)

  /**
   * 请求表格服务端数据
   * @returns 
   */
  const getData = async () => {
    const result = await processdRequest[props.config.getMethod](props.config.getUrl, {
      pageIndex: 1,
      pageSize: 20,
      ...props.params,
      ...props.staticParams,
    })
    tableData.value = result.data
  }

  /**
   * 上次请求列表数据的参数
   */
  let prevParams = {}

  
  /**
   * 判断请求参数是否发生变化
   * 如果未发生变化，不请求数据
   * @returns 
   */
  const isParamsChange = () => {
    // 组件不需要参数的情况，判断空对象和undefined是否相等
    if (Object.keys(prevParams).length === 0 && props.params === void 0) {
      return false
    }
    return !isEqual(prevParams, props.params)
  }

  /**
   * 获取表格数据（如果参数无变化，直接使用原数据）
   */
  const getTableData = async () => {
    // 未获取过数据或者参数发生变化的时候，重新获取一次数据
    if (!tableData.value || isParamsChange()) {
      prevParams = { ...props.params }
      await getData()
    }
    updateTableData()
  }

  /**
   * 过滤表格数据
   * @returns 
   */
  const getFilteredData = () => {
    // 存在过滤函数，先过滤一次列表
    const list = (tableData.value || []).filter(item => {
      if (props.filterFn) {
        return props.filterFn(item)
      }
      return true
    })
    
    // 是否存在输入参数值，进行文字包含过滤
    const queryValue = props.modelValue
    if (!queryValue) {
      return list
    }

    // 对所有的字段进行文字过滤
    return list.filter(item => {
      const keys: string[] = props.config.table.els.map((el: any) => el.prop)
      return keys.filter(key => key).map(key => item[key]).some((val: any) => {
        return val != null && val.toString().includes(queryValue)
      })
    })
  }

  /**
   * 更新表格UI数据
   */
  const updateTableData = () => {
    const filterdData = getFilteredData()
    pageModelRef.value.updateTableData(filterdData)
  }

  /**
   * 监听到参数变化
   */
  watch(
    () => props.params,
    () => {
      getTableData()
    },
    {
      deep: true
    }
  )

  return {
    quickConfig,
    pageModelRef,
    getTableData,
    tableData
  }
}

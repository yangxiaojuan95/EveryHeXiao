import { RequestServiceProcess } from '@juzhenfe/request';
import cloneDeep from 'lodash.cloneDeep';
import ApiRequestCache from './api-request-cache';
import { processdRequest } from './request';
import ExtendKeySearch from '@/components/extend-key-search/index.vue'

const cache = new ApiRequestCache<RequestServiceProcess>(processdRequest)

cache.cacheMethod('get').cacheUrl('*')

const cachedRequest = cache.target

enum PageTypeEnum {
  采购报价单 = '/api/PurchaseSqOrders/Extend',
  采购订单 = '/api/PurchaseDdOrders/Extend',
  采购入库单 = '/api/PurchaseRkOrders/Extend',
  采购退货单 = '/api/PurchaseThOrders/Extend',
  销售报价单 = '/api/SalesBjOrders/Extend',
  销售订单 = '/api/SalesDdOrders/Extend',
  销售出库单 = '/api/SalesCkOrders/Extend',
  销售退货单 = '/api/SalesThOrders/Extend',
  其它出库单 = '/api/InventoryCkOrders/Extend',
  其它入库单 = '/api/InventoryRkOrders/Extend',
  移库单 = '/api/InventoryYkOrders/Extend',
}

type ExtendItem = {
  id: string,
  name: string,
  showName: string,
  type: PageTypeEnum,
  enabled: boolean,
  position: number
}

type ExtendParamsModel = {
  main: ExtendItem[]
  children: {
    [key: string]: ExtendItem[]
  }
}

const sortCombimeItems = (originEls: any[], paramsList: { position: number }[]) => {
  originEls = cloneDeep(originEls)
  paramsList = paramsList.sort((a, b) => a.position - b.position)
  let len = originEls.length + paramsList.length

  return Array(len).fill(1).map((_, index) => {
    const insertItemIndex = paramsList.findIndex(a => a.position - 1 <= index)

    if (insertItemIndex !== -1) {
      const insertItemItem = paramsList.splice(insertItemIndex, 1)
      return insertItemItem[0]
    }

    if (originEls.length) { 
      return originEls.shift()
    }

    return paramsList.shift()
  })
}

const growFormItemsField = async function(form: PageModel.Form<any>, type: keyof typeof PageTypeEnum, itemKey: string) {
  const api = PageTypeEnum[type]
  try {
    const { children } = await cachedRequest.get<ExtendParamsModel>(api)
    // 扩展表单
    const extendFormParams = children[itemKey].map(item => {
      return {
        eType: 'el-input',
        label: item.showName,
        prop: item.name,
        minWidth: 120,
        col: {
          span: 4
        },
        renderFn(row: AnyObject) {
          const onUpdateModelValue = (val: string) => {
            row[item.name] = val
          }
          return (
            <el-input
              modelValue={row[item.name]}
              onUpdate:modelValue={onUpdateModelValue}
            />
          )
        },
      }
    })
    form.els = form.els.concat(extendFormParams)
  } catch (error) {
    
  }
}

const growFormField = async function(form: PageModel.Form<any>, type: keyof typeof PageTypeEnum) {
  const api = PageTypeEnum[type]
  try {
    const { main } = await cachedRequest.get<ExtendParamsModel>(api)
    // 扩展表单
    const extendFormParams = main.map(item => {
      return {
        eType: 'el-input',
        label: item.showName,
        prop: item.name,
        minWidth: 120,
        col: {
          span: 4
        },
        renderFn(row: AnyObject) {
          const onUpdateModelValue = (val: string) => {
            row[item.name] = val
          }
          return (
            <el-input
              modelValue={row[item.name]}
              onUpdate:modelValue={onUpdateModelValue}
            />
          )
        },
      }
    })
    form.els = form.els.concat(extendFormParams)
  } catch (error) {
    
  }
}

type TranferMaps = {
  [key: string]: string;
}

const growConfigField = async function(config: PageModel.Config<any>, type: keyof typeof PageTypeEnum, childrenKeyTranferMap: TranferMaps) {
  const api = PageTypeEnum[type]

  try {
    const { main, children } = await cachedRequest.get<ExtendParamsModel>(api)
    
    // 扩展表格
    // 扩展表格主单
    const extendTableMainParams = main.map(item => {
      return {
        label: item.showName,
        prop: item.name,
        minWidth: 100,
        position: item.position
      }
    })

    // 扩展表格子单
    const extendTableChildrenParams = Object.keys(children).reduce((memo, key) => {
      const child = children[key]
      const params = child.map(item => {
        return {
          label: item.showName,
          prop: item.name,
          minWidth: 100,
          position: item.position,
          renderFn(row: AnyObject) {
            return (
              <span>{ row[childrenKeyTranferMap[key]][item.name] }</span>
            )
          }
        }
      })
      return memo.concat(params)
    }, [] as any[])

    const finalParams = extendTableMainParams.concat(extendTableChildrenParams)

    config.table.els = sortCombimeItems(config.table.els, finalParams)

    // 扩展搜索表单
    if (config.searchForm?.els && main.length) {
      const extendKeys = main.map(item => {
        return {
          label: item.showName,
          prop: item.name
        }
      })
      const extendSearchFormElItem = {
        label: '扩展字段',
        renderFn(row: AnyObject) {
          return (
            <ExtendKeySearch formData={ row } extendKeys={ extendKeys } />
          )
        },
        style: {
          width: '260px'
        }
      }
      config.searchForm.els = config.searchForm.els.concat(extendSearchFormElItem)
    }

    return {
      main,
      children
    }
  } catch (error) {
    
  }
  
}

export {
  growConfigField,
  growFormField,
  growFormItemsField,
}

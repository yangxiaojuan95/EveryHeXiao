import APIS from '@/constants/apis';
import { processdRequest } from './request';

const apiOptMap = {
  '内部公司列表': {
    value: '/api/Companies/Select',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '部门': {
    value: '/api/Departments/Select',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '合作商家': {
    value: '/api/Business/Select',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '合作商家部门': {
    value: APIS.BUSINESS_DEPARTMENT_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '账号': {
    value: '/api/Users',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '仓库': {
    value: APIS.WAREHOUSE_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '仓位': {
    value: APIS.WAREHOUSE_LOCATION_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '客户': {
    value: APIS.CUSTOMER_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '业务员': {
    value: '/api/Staffs/Select',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '车辆': {
    value: '/api/Cars/Select',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '线路': {
    value: '/api/DrivingRoutes/Select',
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '司机': {
    value: APIS.DRIVER_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '中转公司': {
    value: APIS.MIDDLE_TRANSFORM_COMPANY_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '客户结算方式': {
    value: APIS.CUSTOMER_SETTLEMENT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  },
  '结算账号': {
    value: APIS.SETTLEMENT_ACCOUNT_SELECT_URL,
    processFn(result: AnyObject) {
      return result.data
    }
  }
}

const cache: AnyObject = {}

const defaultParams = {
  pageIndex: 1,
  pageSize: 999
}

type GetSelectDataOpt = {
  key: keyof typeof apiOptMap;
  params?: AnyObject;
  refresh?: boolean;
}

async function getSelectData<T = any>(opts: GetSelectDataOpt): Promise<T> {
  const { key, refresh, params } = opts
  const api = apiOptMap[key]
  
  if (!api) {
    return <any>[]
  }

  // 使用缓存
  // if (!refresh && cache[key]) {
  //   return cache[key]
  // }

  let returnResult: any

  // 请求数据
  try {
    const result = await processdRequest.get<any>(api.value, {
      ...defaultParams,
      ...params
    })

    if (typeof api.processFn === 'function') {
      returnResult = api.processFn(result)
    } else {
      returnResult = result
    }
    
    return returnResult
  } catch (error) {
    throw error
  }
}

export default getSelectData

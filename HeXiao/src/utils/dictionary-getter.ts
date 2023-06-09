import { processdRequest } from "./request";

const keyMaps = {
  车型: 'car-type',
  车长: 'car-length',
  驾驶证级别: 'driving-licence-level',
  出库发货方式: 'ck-delivery-type',
  出库结算方式: 'ck-settlement-type',
  外部下单产品: 'external-goods',
  退货发货方式: 'refund-delivery-type',
}

async function getDictionaryList(opts: {
  key: keyof typeof keyMaps
}) {
  const result = await processdRequest.get('/api/SelectItems/ByCategoryCode', {
    pageIndex: 1,
    pageSize: 999,
    code: keyMaps[opts.key]
  })
  return result.data
}

export {
  getDictionaryList
}

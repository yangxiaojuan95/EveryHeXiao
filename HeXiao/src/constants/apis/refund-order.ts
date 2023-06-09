/**
 * 退货单基础地址
 */
export const REFUND_ORDER_URL = '/api/ThOrders'

/**
 * 退货单详情
 */
 export const REFUND_ORDER_DETAIL_URL = '/api/ThOrders/:id'

 /**
 * 退货单日志
 */
export const REFUND_ORDER_JOURNAL_URL = '/api/ThOrders/Journal'

/**
 * 退货单审核通过
 */
 export const REFUND_ORDER_PASS_URL = '/api/ThOrders/AuditPass'

 /**
 * 退货单审核不通过
 */
export const REFUND_ORDER_NOPASS_URL = '/api/ThOrders/AuditNotPass'

/**
 * 获取退货中的产品列表序列号
 */
export const REFUND_ORDER_SERIAL_NUMBERS_URL = '/api/WaybillOrders/Select/:id'

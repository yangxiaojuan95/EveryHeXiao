/**
 * 结算账号基础地址
 */
export const SETTLEMENT_ACCOUNT_URL = '/api/SettlementAccounts'

/**
 * 结算账号现金流
 */
export const SETTLEMENT_ACCOUNT_CASH_FLOW_URL = '/api/CashFlows/SettlementAccount'

/**
 * 现金流
 */
export const CASH_FLOW_URL = '/api/CashFlows'

/**
 * 结算账号下拉地址
 */
export const SETTLEMENT_ACCOUNT_SELECT_URL = '/api/SettlementAccounts/Select'

/**
 * 结算账号启用
 */
export const SETTLEMENT_ACCOUNT_ENABLE_URL = '/api/SettlementAccounts/Enable'

/**
 * 结算账号禁用
 */
export const SETTLEMENT_ACCOUNT_DISABLE_URL = '/api/SettlementAccounts/Disable'

/**
 * 运单财务收款列表
 */
export const INCOME_ORDER_URL = '/api/Financials/Collection'

/**
 * 运单财务收款列表
 */
export const ADJUST_AMOUNT_URL = '/api/Financials/AdjustmentFee'

/**
 * 财务收款对账单基础地址
 */
export const INCOME_STATEMENT_URL = '/api/IncomeStatements'

/**
 * 财务收款对账单开票
 */
export const INCOME_STATEMENT_INVOICE_URL = '/api/IncomeStatements/Invoicing'

/**
 * 财务收款对账单收款列表
 */
export const INCOME_STATEMENT_RECEIVE_URL = '/api/IncomeStatements/Collection'

/**
 * 财务收款对账单-取消
 */
export const INCOME_STATEMENT_RECEIVE_CANCEL_URL = '/api/IncomeStatements/Cancel'

/**
 * 财务收款封账
 */
export const INCOME_SEAL_ORDEER_URL = '/api/Financials/SealAccounts'

/**
 * 财务导入修改收款金额
 */
export const INCOME_IMPORT_MODIFIED_URL = '/api/Financials/ExcelModified'

/**
 * 对账员对账单
 */
export const PAYMENT_TRANSITCOMPANY_URL = '/api/Financials/TransitCompany/Pay'

/**
 * 调度员对账单
 */
export const PAYMENT_DRIVER_URL = '/api/Financials/Driver/Pay'

/**
 * 应付付款单
 */
export const PAYMENT_ORDER_URL = '/api/PaymentOrders'

/**
 * 应付付款单详情
 */
export const PAYMENT_ORDER_DETAIL_URL = '/api/PaymentOrders/:id'

/**
 * 应付付款单-付款
 */
export const PAY_PAYMENT_ORDER_URL = '/api/PaymentOrders/Payment'

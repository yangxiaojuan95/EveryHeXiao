/**
 * 客户对账返回模型
 */
interface ReportsCustomerResultModel {
  customerId: string,
  customerName: string,
  receivableFee: number,
  actualFee: number,
  surplusFee: number
}

/**
 * 收款页面搜索模型
 */
interface ReportsCustomerSearchModel {
  customerName: string
  customerId: string;
}

type ReportsCustomerModel = ReportsCustomerResultModel & ReportsCustomerSearchModel

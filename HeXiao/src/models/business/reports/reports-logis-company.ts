/**
 * 中转公司对账返回模型
 */
interface ReportsLogisCompanyResultModel {
  transitCompanyId: string,
  transitCompanyName: string,
  paymentFee: number,
  actualFee: number,
  surplusFee: number
}

/**
 * 收款页面搜索模型
 */
interface ReportsLogisCompanySearchModel {
  transitCompanyName: string
  transitCompanyId: string;
}

type ReportsLogisCompanyModel = ReportsLogisCompanyResultModel & ReportsLogisCompanySearchModel

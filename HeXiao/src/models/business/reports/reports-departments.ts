/**
 * 客户对账返回模型
 */
interface ReportsDepartmentResultModel {
  businessDepartmentId: string,
  businessDepartmentName: string,
  receivableFee: number,
  actualReceivableFee: number,
  paymentFee: number,
  actualPaymentFee: number,
  profit: number
}

/**
 * 收款页面搜索模型
 */
interface ReportsDepartmentSearchModel {
  businessDepartmentName: string
  businessDepartmentId: string;
}

type ReportsDepartmentModel = ReportsDepartmentResultModel & ReportsDepartmentSearchModel

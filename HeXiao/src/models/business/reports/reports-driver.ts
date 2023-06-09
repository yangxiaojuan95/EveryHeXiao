/**
 * 客户对账返回模型
 */
interface ReportsDriverResultModel {
  driverId: string,
  driverName: string,
  paymentFee: number,
  actualFee: number,
  surplusFee: number
  carLicense: string;
}

/**
 * 收款页面搜索模型
 */
interface ReportsDriverSearchModel {
  driverName: string
  driverId: string;
}

type ReportsDriverModel = ReportsDriverResultModel & ReportsDriverSearchModel

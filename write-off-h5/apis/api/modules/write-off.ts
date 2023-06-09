import { api, token } from ".."

/**
 * 核销列表
 */
export const GetApprovalRecordsAjax = (data: any, config?: any) => {
	return api.post('/api/Shop/GetApprovalRecords', data, config)
}
/**
 * 核销详情
 */
export const GetScanCouponGetDetailAjax = (data: any, config?: any) => {
	return api.get('/api/Shop/ScanCouponGetDetail', data, config)
}
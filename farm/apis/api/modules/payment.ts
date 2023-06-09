import { api } from ".."

/**
 * 创建订单
 */
export const GetCreateBuyLandOrderAjax = (data: any, config?: any) => {
	return api.get('/api/Order/CreateBuyLandOrder', data, config)
}

/**
 * 订单支付
 */
export const GetOrderPayAjax = (data: any, config?: any) => {
	return api.get('/api/Order/OrderPay', data, config)
}

/**
 * 获取首页信息
 */
export const GetHomeInfoAjax = (data: any, config?: any) => {
	return api.post('/api/Home/Info', data, config)
}

/**
 * 获取个人卡券
 */
export const GetMyCouponAjax = (data: any, config?: any) => {
	return api.post('/api/Home/MyCoupon', data, config)
}

/**
 * 获取店铺信息
 */
export const GetNeayShopAjax = (data: any, config?: any) => {
	return api.post('/api/Home/NearbyShop', data, config)
}

/**
 * 获取卡券店铺信息
 */
export const GetCouponShopAjax = (data: any, config?: any) => {
	return api.post('/api/Home/GetShopByCoupon', data, config)
}

/**
 * 获取首页信息
 */
export const ReceiveCouponAjax = (data: any, config?: any) => {
	return api.get('/api/Home/ReceiveCoupon', data, config)
}

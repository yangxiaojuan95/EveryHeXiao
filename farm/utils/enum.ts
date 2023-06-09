
/**
 * 劳作状态枚举
 */
export enum WorkStatusEnum {
	全部,
	待付款,
	代劳做,
	待评价,
	已完成
}

/**
 * 收获订单状态枚举
 */
export enum HarvestStatusEnum {
	全部,
	待收获,
	待评价,
	已完成
}

/**
 * 卡券类型
 */
export enum CouponTypeEnum {
	全部 = -1,
	抵扣券 = 0,
	折扣券 = 1,
	满减券 = 2,
}

/**
 * 卡券状态
 */
export enum CouponStatusEnum {
	待使用 = 0,
	已使用 = 1,
	已过期 = 2,
}


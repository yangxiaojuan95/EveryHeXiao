<template>
	<view :class="['coupon-item', { disabled: isDisabled }]" @click="handleToDetail">
		<!-- 卡券子项 -->
		<image class="coupon-item-bg" src="/static/imgs/coupon-bg@3x.png" mode="widthFix"></image>
		<!-- 卡券内容 -->
		<view class="coupon-content">
			<view class="coupon-left">
				<!-- 左侧文字类型 -->
				<template v-if="!showImage">
					<view v-if="item.CouponType === CouponTypeEnum['满减券']" class="coupon-info">
						<text class="amount-symbol">￥</text>
						<text>{{ item.Price }}</text>
					</view>
					<view v-else-if="item.CouponType === CouponTypeEnum['折扣券']" class="coupon-info">
						<text class="amount-int">{{ intNumber }}</text>
						<text class="amount-float">.{{ floatNumber }}</text>
						<text class="amount-label">折</text>
					</view>
					<view v-else-if="item.CouponType === CouponTypeEnum['抵扣券']" class="coupon-info">
						<text class="amount-int">{{ item.Price }}</text>
					</view>
					<view class="coupon-type">{{ CouponTypeEnum[item.CouponType] }}</view>
				</template>
				<image v-else class="coupon-image" :src="item.ThumbnailImage" mode="aspectFill"></image>
				
			</view>
			<view class="coupon-right">
				<view class="coupon-title">{{ item.CouponName }}</view>
				<view class="coupon-rule" @click.stop="handleToRule">
					<text>查看使用规则</text>
					<image src="/static/imgs/icon_go@3x.png" mode="widthFix"></image>
				</view>
				<view class="coupon-expire">{{ item.ValidTime }}</view>
				<view v-if="!item.isGet" class="coupon-button not-get" @click.stop="handleGetCoupon">
					<text>立即获取</text>
				</view>
				<template v-else>
					<view v-if="item.status === CouponStatusEnum['已过期']" class="coupon-button disabled">
						<text>已过期</text>
					</view>
					<view v-else-if="item.status === CouponStatusEnum['已使用']" class="coupon-button disabled">
						<text>已使用</text>
					</view>
					<view v-else class="coupon-button can-use">
						<text>立即使用</text>
					</view>
				</template>
			</view>
		</view>
		
		<!-- 可使用 -->
		<image v-if="item.isGet && !isDisabled" class="coupon-used" src="/static/imgs/label@3x.png" mode="widthFix"></image>
		
	</view>
</template>

<script>
	import { CouponTypeEnum, CouponStatusEnum } from '@/utils/enum'
	export default {
		props: {
			showImage: {
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				CouponTypeEnum,
				CouponStatusEnum
			}
		},
		computed: {
			discount() {
				return (this.item.Price || 0)
			},
			intNumber() {
				return this.discount.toString().split('.')[0]
			},
			floatNumber() {
				return this.discount.toString().split('.')[1] || 0
			},
			isDisabled() {
				return this.item.status === CouponStatusEnum["已过期"] || this.item.status === CouponStatusEnum["已使用"]
			}
		},
		methods: {
			handleToRule() {
				uni.setStorageSync('coupon-item', JSON.stringify(this.item))
				uni.navigateTo({
					url: '/pages/coupon-rule/index?id=' + this.item.CouponID
				})
			},
			handleToDetail() {
				uni.setStorageSync('coupon-item', JSON.stringify(this.item))
				uni.navigateTo({
					url: '/pages/coupon-detail/index?id=' + this.item.CouponID
				})
			},
			handleGetCoupon() {
				this.$emit('get')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-item {
		position: relative;
		height: 290upx;
		
		&.disabled {
			.coupon-info, .coupon-type, .coupon-title {
				color: #999999;
			}
			
			.coupon-rule, .coupon-expire{
				color: #BBBBBB;
			}
		}
	}
	
	.coupon-item-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.coupon-content {
		position: relative;
		z-index: 1;
		height: 100%;
		display: flex;
		align-items: center;
	}
	
	.coupon-left {
		flex-shrink: 0;
		width: 284upx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-family: PingFangSC-Medium, PingFang SC;
	}
	
	.coupon-image {
		width: 100%;
		height: 290upx;
	}
	
	.coupon-info {
		color: #E92323;
		font-size: 72upx;
		font-weight: 500;
	}
	
	.amount-symbol {
		font-size: 36upx;
		transform: translateX(5upx);
		font-weight: 500;
	}
	
	.amount-label {
		font-size: 28upx;
		margin-left: 4upx;
	}
	
	.amount-int {
		font-size: 88upx;
	}
	
	.amount-float {
		font-size: 44upx;
	}

	.coupon-type {
		font-weight: 500;
		margin-top: 10upx;
		font-size: 28upx;
		letter-spacing: 2upx;
		line-height: 40upx;
	}
	
	.coupon-right {
		flex-grow: 1;
		width: 0;
		height: 100%;
		padding: 30upx 40upx 30upx 20upx;
		box-sizing: border-box;
	}
	
	.coupon-title {
		font-size: 32upx;
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.coupon-rule {
		margin-top: 20upx;
		color: #999999;
		display: flex;
		align-items: center;
		line-height: 40upx;
		
		image {
			width: 40upx;
			height: 40upx;
		}
	}
	
	.coupon-expire {
		margin-top: 20upx;
		color: #999999;
		font-size: 24upx;
		line-height: 34upx;
		height: 34upx;
	}
	
	.coupon-button {
		margin-top: 22upx;
		line-height: 46upx;
		height: 50upx;
		border: 2upx solid;
		border-radius: 10upx;
		text-align: center;
		font-size: 24upx;
		width: 320upx;
		box-sizing: border-box;
		
		&.not-get {
			background-color: #333;
			color: #fff;
		}
		
		&.can-use {
			
		}
		
		&.disabled {
			background-color: #999999;
			color: #fff;
		}
	}
	
	.coupon-used {
		position: absolute;
		top: 0;
		left: 0;
		width: 94upx;
		height: 94upx;
		z-index: 9;
	}
	
</style>
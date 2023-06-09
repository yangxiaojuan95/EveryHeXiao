<template>
	<view class="page">
		<!-- bg="/static/imgs/coupon-detil-bg@3x.png" -->
		<page-nav-bar class="fs0" :bg="`https://approvalsale.nbxuanma.com${couponItem.BackgroundTheme}`" :height="730"
			title="卡券详情" :absolute="false">
			<view class="coupon-detail-content">
				<view class="coupon-img">
					<image :src="couponItem.CouponImage" mode="aspectFill"></image>
				</view>
				<!-- 				<view class="coupon-type">
					<view v-if="couponItem.CouponType === CouponTypeEnum['满减券']" class="coupon-info">
						<text class="amount-symbol">￥</text>
						<text>{{ couponItem.Price }}</text>
					</view>
					<view v-else-if="couponItem.CouponType === CouponTypeEnum['折扣券']" class="coupon-info">
						<text class="amount-int">{{ couponItem.Price }}</text>
						<text class="amount-label">折</text>
					</view>
					<view v-else-if="couponItem.CouponType === CouponTypeEnum['抵扣券']" class="coupon-info">
						<text class="amount-int">{{ couponItem.Price }}</text>
					</view>
					<text>{{ CouponTypeEnum[couponItem.CouponType] }}</text>
				</view> -->
				<!-- <view class="coupon-title">{{ couponItem.title }}</view> -->

				<!-- 按钮 -->
				<view v-if="couponItem.isGet === false" class="button-get" @click="handleReceive">
					<text>立即领取</text>
				</view>
				<!-- 				<view v-else-if="couponItem.status === CouponStatusEnum['待使用']" class="button-get disabled">
					<text>已领取</text>
				</view> -->
				<view v-else-if="couponItem.status === CouponStatusEnum['已过期']" class="button-get disabled">
					<text>已过期</text>
				</view>
				<view v-else-if="couponItem.status === CouponStatusEnum['已使用']" class="button-get disabled">
					<text>已使用</text>
				</view>

				<view class="coupon-code">
					<uqrcode v-if="couponItem.CouponID && couponItem.status === CouponStatusEnum['待使用']" ref="uqrcode"
						canvas-id="qrcode" :value="couponItem.CouponID" :options="{ margin: 10 }"></uqrcode>
					<!-- <ay-qrcode v-if="couponItem.CouponID && couponItem.status === CouponStatusEnum['待使用']" :url="couponItem.CouponID" modal :width="width" :height="width"></ay-qrcode> -->
					<!-- <ay-qrcode  :url="couponItem.CouponID" modal :width="width" :height="width"></ay-qrcode> -->
					<view class="coupon-expire">
						<text class="label">可用时间：</text>
						<text>{{ couponItem.ValidTime }}</text>
					</view>
				</view>


				<view class="coupon-nav-item" @click="handleToRule">
					<text>使用规则</text>
					<image src="/static/imgs/icon_go@3x.png" mode="widthFix"></image>
				</view>
				<view class="coupon-nav-item" @click="handleToUseStore">
					<text>可用门店</text>
					<image src="/static/imgs/icon_go@3x.png" mode="widthFix"></image>
				</view>
			</view>
		</page-nav-bar>
	</view>
</template>

<script>
	import PageNavBar from '@/components/page-nav-bar/index.vue'
	import AyQrcode from '@/components/ay-qrcode/ay-qrcode.vue'
	import {
		CouponTypeEnum,
		CouponStatusEnum
	} from '@/utils/enum'
	import {
		ReceiveCouponAjax
	} from '@/apis/api/modules/payment'
	import {
		baseUrl
	} from '@/config'

	export default {
		components: {
			PageNavBar,
			AyQrcode
		},
		data() {
			return {
				width: uni.upx2px(300),
				couponId: null,
				couponItem: {},
				CouponTypeEnum,
				CouponStatusEnum
			}
		},
		onLoad() {
			this.getCoupon()
		},
		methods: {
			getCoupon() {
				const coupon = uni.getStorageSync('coupon-item')
				const item = JSON.parse(coupon)
				// item.CouponImage = baseUrl + item.CouponImage
				this.couponItem = item
			},
			handleToRule() {
				uni.setStorageSync('coupon-item', JSON.stringify(this.couponItem))
				uni.navigateTo({
					url: '/pages/coupon-rule/index?id=' + this.couponItem.CouponID
				})
			},
			handleToUseStore() {
				uni.navigateTo({
					url: '/pages/coupon-shops/index?couponId=' + this.couponItem.CouponID
				})
			},
			async handleReceive() {
				uni.showLoading({
					title: '领取中',
					mask: true
				})
				await ReceiveCouponAjax({
					CouponID: this.couponItem.CouponID,
					token: true
				})
				uni.showToast({
					title: '领取成功！',
					icon: 'none'
				})
				this.couponItem.isGet = true
				this.couponItem.status = CouponStatusEnum.待使用
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		position: relative;
		min-height: 100%;
		background-color: #F7F7F7;
		padding-bottom: 30upx;
		box-sizing: border-box;
	}

	.coupon-detail-content {
		position: relative;
		z-index: 1;
		margin: -550upx 30upx 0;
		background-color: #fff;
		border-radius: 10upx;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
	}

	.coupon-img {
		height: 250upx;
		border-radius: 8upx;
		overflow: hidden;
		background-color: #eee;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.coupon-type {
		text-align: center;
		margin-top: 50upx;
		font-size: 48upx;
		font-weight: 500;
	}

	.coupon-title {
		margin-top: 20upx;
		color: #999;
		font-size: 32upx;
		text-align: center;
	}

	.coupon-expire {
		margin-top: 40upx;
		color: #333333;
		text-align: center;

		.label {
			color: #999999;
		}
	}

	.coupon-code {
		margin-top: 50upx;
		text-align: center;
		padding-bottom: 54upx;
		border-bottom: 2upx dashed #CCCCCC;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.code-text {
			color: #666666;
			margin-top: 20upx;
			font-size: 32upx;
		}
	}

	.coupon-nav-item {
		padding: 34upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;

		image {
			width: 40upx;
			height: 40upx;
		}

		&+.coupon-nav-item {
			border-top: 2upx solid #EFEFEF;
		}
	}

	.button-get {
		line-height: 104upx;
		border-radius: 10upx;
		text-align: center;
		color: #fff;
		background: #333333;
		margin: 40upx 0 60upx;
		font-size: 32upx;
		font-weight: 500;

		&.disabled {
			background-color: #BBBBBB;
		}
	}
</style>
<template>
	<view class="box">
		<view class="bottom">
			<view class="btn">
				<text class="pay" @click="open">支付</text>
			</view>
			<view class="btn" @click="payment">
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetCreateBuyLandOrderAjax,
		GetOrderPayAjax
	} from '@/apis/api/modules/payment'
	export default {
		data() {
			return {
				payOrder: {},
				orderNo: null
			}
		},
		methods: {
			async open() {
				//创建订单号
				const result = await GetCreateBuyLandOrderAjax({
					token: true
				})
				this.orderNo = result.Result
				const payOrder = await GetOrderPayAjax({
					orderNo: result.Result,
					payType: 2,
					token: true
				})
				this.payOrder = payOrder.Result
			},
			/**
			 * 支付
			 */
			payment() {
				let that = this
				setTimeout(() => {
					uni.requestPayment({
						"provider": 'wxpay',
						"signType": "RSA",
						"appId": that.payOrder.appId,
						"nonceStr": that.payOrder.nonceStr,
						"package": that.payOrder.package,
						"partnerId": that.payOrder.partnerId,
						"prepayId": that.payOrder.prepayId,
						"timeStamp": that.payOrder.timeStamp,
						"paySign": that.payOrder.paySign,
						success: function(res) {
							uni.showToast({
								title: '支付成功！',
								icon: 'success'
							})
						},
						fail: function(err) {
							uni.showToast({
								title: '支付失败！',
								icon: 'error'
							})
						}
					}, 200)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn {
		margin: 60upx;
		background: #00D08F;
		border-radius: 52upx;
		backdrop-filter: blur(20upx);
		font-size: 32upx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 104upx;
		text-align: center;
	}
</style>

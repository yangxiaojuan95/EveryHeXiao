<template>
	<view class="box">
		<view class="content">
			<view class="">
				<image :src="`https://approvalsale.nbxuanma.com${order.Image}`" mode="aspectFit"></image>
			</view>
			<view class="">{{order.CouponName}}</view>
			<view class=""> {{order.Price}}{{order.CouponTypeStr}} </view>
			<view class="">有效时间:{{order.EffectiveTime}}</view>
			<view class="">{{status[order.Status]}}</view>
			<view class="">{{order.SyGoods}}</view>
		</view>
		<view class="left">
			<view class="" :style="{color: order.IsSuit ? '#2258bd' : 'red'}">适用产品：{{order.IsSuit?'在本店适用范围':'非本店适用范围'}}</view>
		</view>
		<view v-if="order.IsApprovale" class="bottom">
			<view class="button" @click="handleApproval">{{order.IsApprovale?'核销':''}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			order: {
				type: Object,
				default: () => ({})
			},
		},
		data() {
			return {
				status: ['待使用', '已使用', '已过期']
			}
		},
		methods: {
			async handleApproval() {
				this.$emit("handleApproval")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
		font-size: 26upx;

		.content {}

		.left {
			text-align: center;
		}

		.bottom {
			width: 100%;
			display: flex;
			justify-content: center;
		}

		.button {
			margin-top: 20rpx;
			text-align: center;
			width: 200upx;
			padding: 10upx 20upx;
			box-shadow: 0rpx 4rpx 16rpx 0rpx #e1e1e1;
			background: #2258bd;
			color: #fff;
		}
	}

	image {
		width: 500upx;
		height: 250upx;
	}
</style>
<template>
	<view class="box" :style="{background: id === order.couponID?'#2258bd':'',color: id === order.couponID?'#fff':''}">
		<view class="">
			<view class="">券种</view>
			<view class="">{{order.Price }}{{order.CouponTypeStr}}</view>
		</view>
		<view class="">
			<view class="">核销时间</view>
			<view class="">{{order.ApprovalTime}}</view>
		</view>
	</view>
</template>

<script>
	import {
		EntruckOrderStatusEnum
	} from '@/utils/enum'
	export default {
		props: {
			order: {
				type: Object,
				default: () => ({})
			},
			id: {
				type: String,
				default: () => ('')
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		justify-content: space-between;
		margin: 30upx;
		// border: 2upx solid #bdbdbd;
		box-shadow: 0rpx 4rpx 16rpx 0rpx #efefef;
		padding: 20upx;
		border-radius: 10upx;
		line-height: 50upx;
		position: relative;
		font-size: 28upx;
	}
</style>

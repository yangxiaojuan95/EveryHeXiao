<template>
	<view class="order-item">
		
		<order-header :order="order"></order-header>
		
		<view class="order-content-body">
			<order-delivery-info :order="order"></order-delivery-info>
			
			<view class="order-time-info">
				<view class="item-info">
					<text>发货时间：{{ order.deliveryTime }}</text>
				</view>
				<view class="item-info">
					<text>预计送达时间：{{ order.arriveTime }}</text>
				</view>
			</view>
		</view>
		
		<view class="order-actions">
			<view class="order-action-item notify-action">
				<text>通知</text>
			</view>
		</view>
	</view>
</template>

<script>
	import OrderHeader from './components/order-header/index.vue'
	import OrderDeliveryInfo from '@/components/order-parts/order-delivery-info/index.vue'
	
	export default {
		name: 'OrderItem',
		components: {
			OrderHeader,
			OrderDeliveryInfo
		},
		props: {
			order: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			onClickCopy() {
				uni.setClipboardData({
					data: this.order.code
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		background-color: #fff;
		border-radius: 16upx;
		padding: 0 20upx;
	}
	
	.order-content-body {
		padding-bottom: 30upx;
	}
	
	.order-time-info {
		.item-info {
			color: #666666;
			font-size: 28upx;
			line-height: 40upx;
			
			& + .item-info {
				margin-top: 10upx;
			}
		}
	}
	
	.order-actions {
		border-top: 2upx solid $border-color;
		padding: 20upx 0;
		@include flex-c-center;
		justify-content: flex-end;
	}
	
	.order-action-item {
		height: 60upx;
		line-height: 56upx;
		border: 2upx solid #B7BBC4;
		border-radius: 32upx;
		padding: 0 40upx;
		color: #666666;
		box-sizing: border-box;
		transition: background-color .3s;
		
		&:hover {
			background-color: #EFEFEF;
		}
	}
</style>

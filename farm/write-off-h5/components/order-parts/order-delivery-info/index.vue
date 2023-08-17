<template>
	<view class="order-deliver-info">
		<view class="order-city start-city">
			<view class="city-name">{{ order.startCity }}</view>
			<view class="city-user-name">{{ order.startName }}</view>
		</view>
		<view class="order-status">
			<image src="/static/img/icon_arrow@3x.png" mode="widthFix"></image>
			<view class="order-status-text">运输中</view>
		</view>
		<view class="order-city end-city">
			<view class="city-name">{{ order.endCity }}</view>
			<view class="city-user-name">{{ order.endName }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			order: {
				type: Object,
				default: () => ({})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-deliver-info {
		@include flex-center;
		padding: 30upx 0;
	}
	
	.order-city {
		flex-grow: 1;
		flex-basis: 10upx;
		flex-shrink: 0;
		text-align: center;
	}
	
	.order-status {
		flex-shrink: 0;
		width: 166upx;
		text-align: center;
		font-size: 0;
		margin: 0 40upx;
	
		image {
			width: 100%;
			height: 20upx;
		}
		
		.order-status-text {
			margin-top: 10upx;
			font-size: 24upx;
			color: $theme-color;
		}
	}
	
	.city-name {
		font-weight: 500;
		font-size: 36upx;
		line-height: 50upx;
	}
	
	.city-user-name {
		margin-top: 10upx;
		font-size: 28upx;
		line-height: 40upx;
		color: #999999;
	}
</style>

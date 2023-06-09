<template>
	<view class="order-address-detail">
		<view class="address-item">
			<image class="address-icon" src="/static/img/icon_send@3x.png" mode="widthFix"></image>
			<view class="address-text-info">
				<view class="address-user-info">
					<text class="address-user-name">{{ order.sendUserName }}</text>
					<text class="address-user-mobile">{{ order.sendUserMobile }}</text>
				</view>
				<view class="address-detail">
					<text>{{ order.sendAddress }}</text>
				</view>
			</view>
			<view class="address-list-label">地址簿</view>
		</view>
		<view class="address-item">
			<image class="address-icon" src="/static/img/icon_receipt@3x.png" mode="widthFix"></image>
			<view class="address-text-info">
				<view class="address-user-info">
					<text class="address-user-name">{{ order.receiveUserName }}</text>
					<text class="address-user-mobile">{{ order.receiveUserMobile }}</text>
				</view>
				<view class="address-detail">
					<text>{{ order.receiveAddress }}</text>
				</view>
			</view>
			<view class="address-list-label">地址簿</view>
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
	@import '../order-styles/order-address.scss';
	
	.address-list-label {
		font-size: 24upx;
		color: $theme-color;
		margin-top: 30upx;
		margin-left: 30upx;
		flex-shrink: 0;
	}
	
</style>

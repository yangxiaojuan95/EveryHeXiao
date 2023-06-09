<template>
	<view class="order-item-header">
		<view class="order-code">
			<text>运单号：{{ order.code }}</text>
			<image class="copy-order-icon" src="/static/img/icon_copy@2x.png" mode="widthFix" @click="onClickCopy"></image>
		</view>
		<slot />
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
	.order-item-header {
		padding: 20upx 0;
		border-bottom: 2upx solid $border-color;
		color: #A3A7B3;
		font-size: 26upx;
		line-height: 36upx;
		@include flex-c-center;
		justify-content: space-between;
	}
	
	.order-code {
		@include flex-c-center;
		flex-shrink: 0;
	}
	
	.copy-order-icon {
		width: 36upx;
		height: 36upx;
		margin-left: 10upx;
	}
</style>

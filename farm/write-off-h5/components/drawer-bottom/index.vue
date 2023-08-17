<template>
	<uni-popup ref="popupRef" type="dialog">
		<view class="popup__title">
			<text>{{ title }}</text>
			<image class="popup__close" src="/static/img/icon_close.png" mode="widthFix" @click="onClickClose"></image>
		</view>
		<view class="popup__content">
			<slot />
		</view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		methods: {
			show() {
				this.$refs.popupRef.open('bottom')
			},
			hide() {
				this.$refs.popupRef.close()
			},
			onClickClose() {
				this.hide()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup__title {
		padding: 30upx;
		background-color: #fff;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		font-size: 32upx;
		@include flex-between;
		align-items: center;
		font-weight: 500;
		border-bottom: 2upx solid $border-color;
		
		.popup__close {
			width: 40upx;
			height: 40upx;
		}
	}
	
	.popup__content {
		background-color: #fff;
	}
</style>

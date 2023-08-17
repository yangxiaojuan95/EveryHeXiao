<template>
		<view class="files-block">
			<view class="files-block-title">
				<text>{{ title }}</text>
			</view>
			<view class="files-block-content">
				<slot />
			</view>
		</view>
</template>

<script>
	export default {
		props: {
			title: String,
			default: ''
		}
	}
</script>

<style lang="scss" scoped>
	.files-block {
		background-color: #fff;
	}
	
	.files-block-title {
		padding: 30upx 0;
		font-weight: 500;
		border-bottom: 2upx solid $border-color;
	}
	
</style>

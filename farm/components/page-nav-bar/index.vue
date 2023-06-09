<template>
	<view class="page-nav-bar">
		<nav-bar :title="title" fontColor="#fff" fixed useScroll alwaysShowTitle></nav-bar>
		<image class="nav-bg-img" :src="bg" mode="aspectFill" :style="{ height: useHeight }"></image>
		<view :class="['nav-bg-slot', { absolute }]">
			<slot />
		</view>
	</view>
</template>

<script>
	import NavBar from '@/frame/components/nav-bar/index.vue'
	export default {
		components: {
			NavBar
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			bg: {
				type: String,
				default: ''
			},
			absolute: {
				type: Boolean,
				default: true
			},
			height: {
				type: Number,
				default: 400
			}
		},
		computed: {
			useHeight() {
				return uni.upx2px(this.height) + 'px'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-nav-bar {
		position: relative;
		font-size: 0;
		z-index: 9;
	}
	
	.nav-bg-img {
		width: 100%;
		height: 320upx;
	}
	
	.nav-bg-slot {
		font-size: 28upx;
		&.absolute {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>@at-root
<template>
	<view class='loading-page-cover' v-show='isShow'>
		<view class='loading-page-wrap'>
			<text v-for='(item, index) in data' :key='index'></text>
		</view>
	</view>
</template>

<script lang="ts">

  import Vue from 'vue'

	export default Vue.extend({
		name: 'PageLoading',
		data() {
			return {
				data: ['', '', '', ''],
				isShow: false
			}
		},
		methods: {
			showLoading() {
				this.isShow = true
			},
			hideLoading() {
				this.isShow = false
			}
		}
	})
</script>

<style lang="scss" scoped>
	.loading-page-cover {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}

	.loading-page-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%) rotate(-10deg);
		width: 48rpx;
		height: 48rpx;
		animation: rotate 1s linear infinite;
	}

	.loading-page-wrap text {
		position: absolute;
		width: 14rpx;
		height: 14rpx;
		background-color: $theme-color;
		border-radius: 50%;
	}

	.loading-page-wrap text:nth-child(1) {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.loading-page-wrap text:nth-child(2) {
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		opacity: .8;
	}

	.loading-page-wrap text:nth-child(3) {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		opacity: .6;
	}

	.loading-page-wrap text:nth-child(4) {
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		opacity: .4;
	}

	@keyframes rotate {
		0% {
			transform: translateX(-50%) translateY(-50%) rotate(-10deg)
		}

		100% {
			transform: translateX(-50%) translateY(-50%) rotate(349deg)
		}
	}
</style>

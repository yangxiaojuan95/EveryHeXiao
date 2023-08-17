<template>
	<view :class="['timeline-item', { active }]">
		<view class="timeline-item-line">
			<view class="timeline-item-line-tail"></view>
			<view class="timeline-item-line-dot"></view>
		</view>
		<view class="timeline-item-content">
			<view class="timeline-item__time">{{ time }}</view>
			<view class="timeline-item__text">{{ text }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			time: {
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			active: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.timeline-item {
		position: relative;
		@include flex;
		padding-bottom: 30upx;
		color: #999999;
		padding-left: 14upx;
		
		&.active {
			color: #333333;
			
			.timeline-item-line-dot {
				background-color: $theme-color;
				width: 30upx;
				height: 30upx;
				transform: translateX(-6upx);
			}
		}
	}
	
	.timeline-item-line {
		width: 70upx;
		flex-shrink: 0;
	}
	
	.timeline-item-line-dot {
		position: relative;
		z-index: 1;
		width: 18upx;
		height: 18upx;
		border-radius: 50%;
		background-color: #CDCDCD;
	}
	
	.timeline-item-line-tail {
		position: absolute;
		left: calc(8upx + 14upx);
		top: 0;
		height: 100%;
		width: 2upx;
		background-color: #EFEFEF;
	}
	
	.timeline-item__time {
		font-size: 28upx;
	}
	
	.timeline-item__text {
		font-size: 28upx;
		margin-top: 10upx;
	}
</style>

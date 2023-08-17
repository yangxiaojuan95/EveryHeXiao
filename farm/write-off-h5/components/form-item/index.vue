<template>
	<view :class="['form-item', `form-item__${labelPosition}`]">
		<view class="form-item__label">
			<slot name="label">
				{{ label }}
			</slot>
		</view>
		<view class="form-item__content">
			<slot />
		</view>
		<image v-if="arrow" src="/static/img/icon_go@3x.png" class="form-item__arrow"></image>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: ''
			},
			labelPosition: {
				type: String,
				default: 'left' // left top
			},
			arrow: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-item {
		@include flex-c-center;
		
		&.form-item__left {
			.form-item__content {
				margin-left: 20upx;
				justify-content: flex-end;
			}
		}
		
		&.form-item__top {
			display: block;
			
			.form-item__content {
				margin-top: 20upx;
				width: 100%;
			}
		}
	}
	
	.form-item__label {
		flex-shrink: 0;
		color: #666666;
		font-size: 32upx;
	}
	
	.form-item__content {
		flex-grow: 1;
		width: 0;
		@include flex-c-center;
	}
	
	.form-item__arrow {
		width: 36upx;
		height: 36upx;
		margin-left: 20upx;
		flex-shrink: 0;
	}
</style>

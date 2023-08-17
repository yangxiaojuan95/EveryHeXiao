<template>
	<view class="number-step">
		<view class="step-box minus" @click="change(-1)">
			<image src="/static/img/icon_minus@3x.png" mode="widthFix"></image>
		</view>
		<view class="step-input">
			<input type="number" :value="value" />
		</view>
		<view class="step-box plus" @click="change(1)">
			<image src="/static/img/icon_add@3x.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number],
				default: null
			},
			min: {
				type: Number,
				default: 1
			},
			max: {
				type: Number,
				default: null
			}
		},
		methods: {
			change(cVal) {
				const nextVal = this.value + cVal
				
				if (nextVal < this.min) {
					return false
				}
				
				if (this.max != null && nextVal > this.max) {
					return false
				}
				
				this.emit(nextVal)
			},
			emit(val) {
				this.$emit('input', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.number-step {
		min-width: 292upx;
		@include flex-c-center;
		height: 72upx;
	}
	
	.step-box {
		width: 72upx;
		height: 100%;
		@include flex-center;
		flex-shrink: 0;
		background-color: #F4F4F4;
		
		image {
			width: 32upx;
			height: 32upx;
		}
	}
	
	.step-input {
		flex-grow: 1;
		width: 0;
		background-color: #F4F4F4;
		height: 100%;
		margin: 0 10upx;
		padding: 0 30upx;
		box-sizing: border-box;
		text-align: center;
		font-size: 32upx;
		
		input {
			width: 100%;
			height: 100%;
		}
	}
</style>

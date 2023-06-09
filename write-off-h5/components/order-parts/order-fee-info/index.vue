<template>
	<view class="order-fee-info">
		<view class="info-row">
			<view class="fee-item">
				<label for="">运费：</label>
				<view class="fee-item-value">
					<text>￥100.00</text>
				</view>
			</view>
			<view class="fee-item">
				<label for="">进仓费：</label>
				<view class="fee-item-value">
					<text>￥100.00</text>
				</view>
			</view>
		</view>
		<view class="info-row">
			<view class="fee-item">
				<label for="">仓储费：</label>
				<view class="fee-item-value">
					<text>￥100.00</text>
				</view>
			</view>
			<view class="fee-item">
				<label for="">其它费用：</label>
				<view class="fee-item-value">
					<text>￥100.00</text>
				</view>
			</view>
		</view>
		<view class="info-row">
			<view class="fee-item weight">
				<label for="">总运费：</label>
				<view class="fee-item-value">
					<text>￥100.00</text>
				</view>
			</view>
			<view class="fee-item">
				
			</view>
		</view>
		<view class="info-row">
			<view class="fee-item">
				<label for="">接单时间：</label>
				<view class="fee-item-value">
					<text>2022.07.19 12:00:00</text>
				</view>
			</view>
		</view>
		<view class="info-row">
			<view class="fee-item">
				<label for="">发货时间：</label>
				<view class="fee-item-value">
					<text>2022.07.19 12:00:00</text>
				</view>
			</view>
		</view>
		<view class="info-row">
			<view class="fee-item">
				<label for="">到货时间：</label>
				<view class="fee-item-value">
					<text>2022.07.19 12:00:00</text>
				</view>
			</view>
		</view>
		<view class="info-row">
			<view class="fee-item">
				<label for="">签收时间：</label>
				<view class="fee-item-value">
					<text>2022.07.19 12:00:00</text>
				</view>
			</view>
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
	.info-row {
		@include flex;
		font-size: 28upx;
		
		& + .info-row {
			margin-top: 30upx;
		}
	}
	
	.fee-item {
		@include flex;
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 10upx;
		
		label {
			flex-shrink: 0;
			color: #777;
		}
		
		.fee-item-value {
			flex-grow: 1;
			text-align: right;
			width: 0;
			color: #333;
		}
		
		& + .fee-item {
			margin-left: 50upx;
		}
		
		&.weight {
			.fee-item-value, label {
				color: $theme-color;
			}
			
			.fee-item-value {
				font-weight: 500;
			}
		}
	}
</style>

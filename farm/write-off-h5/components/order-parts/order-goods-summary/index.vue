<template>
	<view class="goods-info">
		<view class="goods-info-item">
			<label for="">货物数量：</label>
			<view class="goods-value">
				<text>10件</text>
			</view>
		</view>
		<view class="goods-info-item">
			<label for="">货物重量：</label>
			<view class="goods-value">
				<text>100KG</text>
			</view>
		</view>
		<view class="goods-info-item">
			<label for="">货物体积：</label>
			<view class="goods-value">
				<text>10立方</text>
			</view>
		</view>
		<view class="goods-info-item">
			<label for="">货物照片：</label>
			<view class="goods-value">
				<image class="goods-imgs" src="https://images.unsplash.com/photo-1658855268569-f000c4f55523?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	// 货物信息
	.goods-info {
		font-size: 0;
		padding-bottom: 30upx;
	}
	
	.goods-info-item {
		display: inline-flex;
		vertical-align: top;
		width: calc(50% - 26upx);
		font-size: 28upx;
		margin-top: 30upx;
		
		label {
			color: #777;
			width: 140upx;
			flex-shrink: 0;
		}
		
		.goods-value {
			text-align: right;
			flex-grow: 1;
			width: 0;
			color: #333;
		}
		
		.goods-imgs {
			width: 100upx;
			height: 100upx;
			border-radius: 8upx;
			background-color: $bg-color-image;
		}
		
		&:nth-child(2n) {
			margin-left: 50upx;
		}
	}
</style>

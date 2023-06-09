<template>
	<view :class="['shop-item']" @click="handleOpenAddress">
		<image class="shop-item-bg" :src="item.Image" mode="widthFix"></image>
		<!-- 卡券内容 -->
		<view class="shop-content">
			<view class="shop-top">
				<view class="shop-title">{{ item.ShopName }}</view>
				<view class="shop-distance">距离您{{ item.Distance }}</view>
			</view>
			<view class="shop-bottom">
				{{ item.Address }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			handleOpenAddress() {
				uni.openLocation({
					name: this.item.title,
					address: this.item.address,
					latitude: 29,
					longitude: 116
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.shop-item {
		padding: 30upx;
		border-radius: 16upx;
		background-color: #fff;
		display: flex;
		align-items: center;
	}
	
	.shop-item-bg {
		width: 100upx;
		height: 100upx;
		margin-right: 30upx;
		border-radius: 8upx;
		border: 2upx solid #F5F5F5;
		background-color: #eee;
	}
	
	.shop-content {
		height: 100%;
		flex-grow: 1;
		width: 0;
	}
	
	.shop-top {
		display: flex;
		justify-content: space-between;
	}
	
	.shop-title {
		flex-grow: 1;
		width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 20upx;
		font-size: 32upx;
		font-weight: 500;
	}
	
	.shop-distance {
		color: #999999;
		font-size: 24upx;
	}
	
	.shop-bottom {
		margin-top: 16upx;
		font-size: 28upx;
		color: #999999;
	}
	
</style>
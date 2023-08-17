<template>
	<view class="order-goods-list-table">
		<view class="table">
			<view class="thead">
				<view class="tr">
					<view class="th">货物名称</view>
					<view class="th">规格型号</view>
					<view class="th">数量</view>
				</view>
			</view>
			<view class="tbody">
				<view v-for="(item ,index) in goodsList" :key="index" class="tr">
					<view class="td">
						<text>{{ item.goodsName }}</text>
					</view>
					<view class="td">
						<text>{{ item.goodsSpec }}</text>
					</view>
					<view class="td">
						<text>{{ item.goodsNumber }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsList: {
				type: Array,
				default: () => ([])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table {
		border: 2upx solid $border-color;
		border-radius: 8upx;
		font-size: 26upx;
	}
	
	.thead {
		.tr {
			border-bottom: 2upx solid $border-color;
		}
		
		.th {
			background-color: #F7F7FB;
			font-weight: 600;
		}
	}
	
	.tbody {
		.tr {
			& + .tr {
				border-top: 2upx solid $border-color;
			}
		}
	}
	
	.tr {
		@include flex-center;
		
		.td, .th {
			flex-basis: 10upx;
			flex-grow: 1;
			flex-shrink: 0;
			text-align: center;
			padding: 20upx 0;
		}
		
		.td {
			& + .td {
				border-left: 2upx solid $border-color;
			}
		}
		
		.th {
			& + .th {
				border-left: 2upx solid $border-color;
			}
		}
	}
</style>

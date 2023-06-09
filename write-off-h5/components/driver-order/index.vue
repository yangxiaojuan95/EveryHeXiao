<template>
	<view>
		<template v-if="order.type === OnWayOrderLogisticsTypeEnum.整车">
			<single-order :order="order" @refresh="handleRefresh"></single-order>
		</template>
		<template v-else>
			<multiple-order :order="order" @refresh="handleRefresh"></multiple-order>
		</template>
	</view>
</template>

<script>
	import { PostWaybillordersImproveInformationAjax } from '@/apis/api/modules/driver'
	import { OnWayOrderLogisticsTypeEnum } from '@/utils/enum'
	import SingleOrder from './components/single-order/index.vue'
	import MultipleOrder from './components/multiple-order/index.vue'
	
	export default{
		components: {
			SingleOrder,
			MultipleOrder
		},
		data() {
			return {
				OnWayOrderLogisticsTypeEnum
			}
		},
		props: {
			order: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			handleRefresh(){
				this.$emit('refresh')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order{
		margin: 0 30upx 30upx;
		padding: 20upx;
		background-color: #fff;
		border-radius: 10upx;
		min-height: 100%;
	}
	.order-time{
		display: flex;
		justify-content: space-between;
		padding-bottom: 20upx;
		border-bottom: 2upx solid #F7F7F7;
	}
	.information{
		border-bottom: 2upx solid #F7F7F7;
		padding: 20upx 0;
		.information-show{
			display: flex;
			justify-content: space-between;
			.text{
				width: 48%;
				display: flex;
				justify-content: space-between;
				.information-name{
					font-size: 28upx;
					font-weight: 400;
					color: #999999;
					line-height: 40upx;
				}
				.information-text{
					font-size: 28upx;
					font-weight: 400;
					color: #666666;
					line-height: 40upx;
				}
			}
		}
	}
	
	.btn{
		width: 210upx;
		height: 60upx;
		background: #1747B2;
		box-shadow: 0upx 4upx 16upx 0upx rgba(23,71,178,0.25);
		border-radius: 32upx;
		font-size: 28upx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 60upx;
		text-align: center;
		margin-top: 20upx;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	@import './order-styles/order-address.scss';
</style>
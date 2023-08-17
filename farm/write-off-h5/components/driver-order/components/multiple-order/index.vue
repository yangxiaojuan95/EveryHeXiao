<template>
	<view>
		<view class="order">
			<view class="order-time">
				<view class="">
					车次号：{{order.trainNum}}
				</view>
				<view class="">
					{{order.showType}}
				</view>
			</view>
			<view class="information">
				<view class="information-show" >
					<view class="text">
						<view class="information-name">
							体积：
						</view>
						<view class="information-text">
							{{totalVolume}}立方米
						</view>
					</view>
					<view class="text">
						<view class="information-name">
							重量：
						</view>
						<view class="information-text">
							{{totalWeight}}吨
						</view>
					</view>
				</view>
				<view class="information-show" >
					<view class="text">
						<view class="information-name">
							运单数：
						</view>
						<view class="information-text">
							{{order.items.length}}个
						</view>
					</view>
					<view class="text">
						<view class="information-name">
							提货费：
						</view>
						<view class="information-text">
							{{order.fare}}元
						</view>
					</view>
				</view>
			</view>
			<view v-if="firstOrder.status === OnWayOrderStatusEnum.装车待发货" class="btn" @click.stop="handleStartup">
				发车
			</view>
			<view v-else-if="firstOrder.status === OnWayOrderStatusEnum.运输中" class="btn" @click.stop="handleToOrderList">
				查看运单
			</view>
		</view>
	</view>
</template>

<script>
	import { PostWaybillordersImproveInformationAjax, DepartEntruckOrdersAjax } from '@/apis/api/modules/driver'
	import { OnWayOrderLogisticsTypeEnum, OnWayOrderStatusEnum } from '@/utils/enum'
	
	export default{
		data() {
			return {
				OnWayOrderLogisticsTypeEnum,
				OnWayOrderStatusEnum
			}
		},
		props: {
			order: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			firstOrder() {
				return this.order.items[0] || {}
			},
			totalWeight() {
				return this.order.items.reduce((memo, item) => {
					return memo += Number(item.goodsWeight)
				}, 0)
			},
			totalVolume() {
				return this.order.items.reduce((memo, item) => {
					return memo += Number(item.goodsVolume)
				}, 0)
			}
		},
		methods: {
			/**
			 * 发车
			 */
			async handleStartup(){
				const isConfirm = await this.showModal('提示', '是否确定发车？')
				if (!isConfirm) {
					return false
				}
				
				uni.showLoading({
					title: '处理中',
					mask: true
				})
				
				const data = this.order.items.map(a => {
					return {
						id: a.waybillOrderId
					}
				})
				data.token = true
				
				await DepartEntruckOrdersAjax(data)
				uni.showToast({
					title: '发车成功',
					mask: true
				})
				this.$emit('refresh')
			},
			/**
			 * 查看运单列表
			 */
			handleToOrderList() {
				uni.navigateTo({
					url: `/pages/waybill-order/index?entruckOrderId=${this.order.id}`
				})
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
			margin-bottom: 20upx;
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
	@import '../../order-styles/order-address.scss';
</style>
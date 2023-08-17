<template>
	<view>
		<view class="order">
			<view class="order-time">
				<view class="">
					车次号：{{order.trainNum}}
				</view>
				<view class="">
					<text>{{ order.showType }}</text>
				</view>
			</view>
			<view class="order-address-detail">
				<view class="address-item">
					<image class="address-icon" src="/static/img/icon_send@3x.png" mode="widthFix"></image>
					<view class="address-text-info">
						<view class="address-user-info">
							<text class="address-user-name">{{firstOrder.senderName}}</text>
							<text class="address-user-mobile">{{firstOrder.senderMobile}}</text>
						</view>
						<view class="address-detail">
							<text>{{firstOrder.senderTotalAddress}}</text>
						</view>
					</view>
				</view>
				<view class="address-item">
					<image class="address-icon" src="/static/img/icon_receipt@3x.png" mode="widthFix"></image>
					<view class="address-text-info">
						<view class="address-user-info">
							<text class="address-user-name">{{firstOrder.receiverName}}</text>
							<text class="address-user-mobile">{{firstOrder.receiverMobile}}</text>
						</view>
						<view class="address-detail">
							<text>{{firstOrder.receiverTotalAddress}}</text>
						</view>
					</view>
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
							是否库内：
						</view>
						<view class="information-text">
							{{ firstOrder.showType }}
						</view>
					</view>
					<view class="text">
						<view class="information-name">
							网点：
						</view>
						<view class="information-text">
							{{ firstOrder.warehouseName }}
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
							整车费：
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
			<view v-else-if="firstOrder.status === OnWayOrderStatusEnum.运输中" class="btn" @click.stop="handleArrive">
				到货
			</view>
			<view v-else-if="firstOrder.status === OnWayOrderStatusEnum.已送达" class="btn" @click.stop="handleReceive">
				签收
			</view>
		</view>
	</view>
</template>

<script>
	import { DepartEntruckOrdersAjax, ArrivalEntruckOrdersAjax, SignForEntruckOrdersAjax } from '@/apis/api/modules/driver'
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
			 * 到货
			 */
			async handleArrive() {
				const isConfirm = await this.showModal('提示', '是否确定到货？')
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
				
				await ArrivalEntruckOrdersAjax(data)
				uni.showToast({
					title: '到货成功',
					mask: true
				})
				this.$emit('refresh')
			},
			/**
			 * 签收
			 */
			async handleReceive() {
				uni.navigateTo({
					url: `/pages/order-receive/index?entruckOrderId=${this.order.id}`
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
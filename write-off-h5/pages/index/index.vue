<template>
	<view class="index-page">
		<view class="top">
			<view class="custom">
				<view class="">
					<image src="@/static/img/back.png" mode="aspectFit"></image>
				</view>
				<view class="title">核销记录</view>
				<view class="">{{ShopName}}</view>
			</view>
			<view class="times">
				<view class="time">
					<view class="">
						<picker mode="date" class="querys" v-model="StartDate" @change="handleStartDate">
							<view class="clear-btn">
								<input type="serch" :value="StartDate" placeholder="起始日期" placeholder-class="placeholder" disabled>
								<!-- <icon class="search-clear-buttons" v-if="StartTime"
								@click.stop="close(clera = 'CreationTime')" type="clear" :size="14"></icon> -->
							</view>
						</picker>
						<picker mode="date" class="querys" v-model="EndDate" @change="handleEndDate">
							<view class="clear-btn">
								<input type="serch" :value="EndDate" placeholder="结束日期" placeholder-class="placeholder" disabled>
								<!-- <icon class="search-clear-buttons" v-if="EndTime" @click.stop="close(clera = 'LeaveTime')"
								type="clear" :size="14"></icon> -->
							</view>
						</picker>
					</view>
					<view class="">
						<picker mode="time" class="querys" :value="StartTime" @change="handleStartTime">
							<!-- <view class="uni-input">{{time}}</view> -->
							<input type="serch" :value="StartTime" placeholder="起始时间" placeholder-class="placeholder" disabled>
						</picker>
						<picker mode="time" class="querys" :value="EndTime" @change="handleEndTime">
							<input type="serch" :value="EndTime" placeholder="结束时间" placeholder-class="placeholder" disabled>
						</picker>
					</view>
				</view>


				<!--  start="09:01" end="21:01" -->
				<view class="button" @click="handleData">筛选</view>
			</view>
			<!-- tab栏 -->
			<view class="top-box">
				<swiper-tab :tabs="tabs" :current="currentTab" :activeColor="themeColor" :barColor="themeColor" :fontSize="28"
					@change="onTabCgnage">
				</swiper-tab>
			</view>
		</view>

		<scroll-view class="order-orders" scroll-y @scrolltolower="handleLower">
			<write-order v-for="item,i in orderList" :key="item.DispatchOrderID" @click.native="handleItem(item.couponID)"
				:id="couponID" :order="item" class="pull-order-item-out"></write-order>
		</scroll-view>
		<!-- <list-status :status="table.status" /> -->
		<view class="pagination">
			<view class="hexiao" @click="information">核销</view>
			<!-- <view class="banben">(V-1.0.1)</view> -->
		</view>

		<uni-popup ref="popup" type="center">
			<Information class="popup" :order="order" @handleApproval="handleApproval"></Information>
		</uni-popup>
	</view>
</template>

<script>
	import {
		GetApprovalRecordsAjax,
		GetScanCouponGetDetailAjax,
		PostApprovalCouponAjax
	} from '@/apis/api/modules/write-off'
	import SwiperTab from '@/frame/components/swiper-tab/index.vue'
	import SearchHeader from '@/components/search-header/index.vue'
	import {
		themeColor
	} from 'uni.scss'
	import {
		EntruckOrderStatusEnum
	} from '@/utils/enum'
	import WriteOrder from './components/write-order.vue'
	import Information from './components/information.vue'
	import {
		token
	} from '@/apis/api/index.ts';
	import PageList from '@/frame/utils/create-list.ts';
	export default {
		name: 'Index',
		components: {
			SearchHeader,
			WriteOrder,
			Information
		},
		data() {
			return {
				order: [],
				couponID: null,
				hexiaoId: undefined,
				tabs: [{
						text: '全部',
						value: EntruckOrderStatusEnum.全部,
						number: ''
					},
					{
						text: '抵扣券',
						value: EntruckOrderStatusEnum.抵扣券,
						number: ''
					},
					{
						text: '折扣券',
						value: EntruckOrderStatusEnum.折扣券,
						number: ''
					},
					{
						text: '满减券',
						value: EntruckOrderStatusEnum.满减券,
						number: ''
					}
				],
				currentTab: 0,
				themeColor,
				PageIndex: 1,
				PageSize: 10,
				CouponType: 0,
				StartDate: null,
				StartTime: null,
				EndDate: null,
				EndTime: null,
				ShopName: null,
				list: {},
				orderList: [],
				show: false
			}
		},
		async onLoad(e) {
			// 获取列表数据
			this.addOrderStatus()
			this.hexiaoId = e?.data || ''
			// this.hexiaoId = 'e374729a-dc35-ee11-988d-b565010bf522'
			if (this.hexiaoId !== '') {
				const result = await GetScanCouponGetDetailAjax({
					couponID: this.hexiaoId,
					token: true
				})
				this.order = result.Result
				this.$refs.popup.open()
			}
		},
		onShow() {
			this.ShopName = uni.getStorageSync("ShopName");
		},
		methods: {
			async handleStartDate(e) {
				this.StartDate = e.detail.value
			},
			async handleStartTime(e) {
				this.StartTime = e.detail.value
			},
			async handleEndDate(e) {
				this.EndDate = e.detail.value
			},
			async handleEndTime(e) {
				this.EndTime = e.detail.value
			},
			/** 筛选 */
			async handleData() {
				this.addOrderStatus()
			},
			handleItem(id) {
				this.couponID = id
				console.log(id, this.couponID)
			},
			async information() {
				uni.navigateTo({
					url: '/pages/mumu-one-code/index?type=2'
				})
			},
			async addOrderStatus() {
				this.PageIndex = 1
				this.show = false
				let start = `${this.StartDate} ${this.StartTime}`
				if (this.StartDate == null || this.StartTime == null) {
					start = null
				}
				let end = `${this.EndDate} ${this.EndTime}`
				if (this.EndDate == null || this.EndTime == null) {
					end = null
				}
				const loginResult = await GetApprovalRecordsAjax({
					CouponType: this.CouponType - 1,
					StartTime: start,
					EndTime: end,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize,
					token: true
				})
				this.list = loginResult.Result
				this.orderList = loginResult.Result.data
				this.tabs[0].text = `全部(${this.list.total})`
				this.tabs[1].text = `抵扣券(${this.list.DkCount})`
				this.tabs[2].text = `折扣券(${this.list.ZkCount})`
				this.tabs[3].text = `满减券(${this.list.YhCount})`
			},
			async handleLower() {
				if (this.show) {
					return false
				}
				this.PageIndex = this.PageIndex + 1

				let start = `${this.StartDate} ${this.StartTime}`
				if (this.StartDate == null || this.StartTime == null) {
					start = null
				}
				let end = `${this.EndDate} ${this.EndTime}`
				if (this.EndDate == null || this.EndTime == null) {
					end = null
				}
				const result = await GetApprovalRecordsAjax({
					CouponType: this.CouponType - 1,
					StartTime: start,
					EndTime: end,
					PageIndex: this.PageIndex,
					PageSize: this.PageSize,
					token: true
				})
				this.list = result.Result
				this.tabs[0].text = `全部(${this.list.total})`
				this.tabs[1].text = `抵扣券(${this.list.DkCount})`
				this.tabs[2].text = `折扣券(${this.list.ZkCount})`
				this.tabs[3].text = `满减券(${this.list.YhCount})`
				if (result.Result.data.length > 0) {
					this.orderList.push(...result.Result.data)
					return false
				} else {
					this.show = true
				}
			},
			onTabCgnage(e) {
				this.CouponType = e
				this.PageIndex = 1
				this.show = false
				this.addOrderStatus()
			},
			async handleApproval() {
				await PostApprovalCouponAjax({
					couponID: this.hexiaoId,
					Price: 0,
					token: true
				})
				uni.showToast({
					title: '核销成功！',
					icon: 'none'
				})
				this.hexiaoId = ''
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		background: #ffffff;
	}

	.top {
		.custom {
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			padding: 20px 20px 0 20upx;

			.title {}

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.times {
			margin: 0 30rpx;

			.button {
				width: 640rpx;
				// width: 100upx;
				height: 50upx;
				background: #2258bd;
				color: #fff;
				text-align: center;
				line-height: 50upx;
				padding: 10upx 20upx;
				margin-right: 10upx;
				box-shadow: 0rpx 4rpx 16rpx 0rpx #e1e1e1;
				border-radius: 40upx;
			}
		}

		.time {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			margin-top: 30upx;
			padding-left: 10upx;

			.querys {
				width: 300upx;
				height: 40upx;
				background: #ffffff;
				border-radius: 44upx;
				margin-bottom: 20upx;
				padding: 16upx 0 16upx 30upx;
				font-size: 28upx;
				font-weight: 400;
				// color: #C0C4D3;
				line-height: 40upx;
				border: 1px solid #EFF1F8;
				margin-right: 10upx;
			}
		}

		.top-box {
			height: 60upx;
			// display: flex;
			// justify-content: space-around;
			border-bottom: 2upx solid #b1b1b1;
			margin: 20upx 30upx 20upx;

			.tabs {
				margin-bottom: 20upx;
			}
		}
	}



	.order-orders {
		flex: 1;
		width: 100%;
		overflow: auto;
		padding-bottom: 120upx;
	}

	.pagination {
		// height: 100upx;
		width: 100%;
		position: fixed;
		bottom: 0;
		line-height: 100upx;
		text-align: center;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		box-shadow: 0rpx 4rpx 16rpx 0rpx #e1e1e1;
		background: #2258bd;

		.hexiao {
			font-size: 32upx;
			color: #fff;
		}

		.banben {
			width: 100%;
			text-align: center;
		}
	}

	.popup {
		background: #fff;
	}
</style>
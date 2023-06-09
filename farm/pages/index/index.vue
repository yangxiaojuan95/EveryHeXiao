<template>
	<view class="page">
		<page-nav-bar class="fs0" :bg="homeInfo.BackgroundTheme" :height="336" title="领券中心">
			<user-data-header class="user-data" :avatar="homeInfo.UserIcon"
				:userName="homeInfo.UserName"></user-data-header>
		</page-nav-bar>

		<!-- 栏目 -->
		<view class="index-actions fs0">
			<view class="action-item" v-for="(item, index) in indexActions" :key="index"
				@click="handleClickActionItem(index)">
				<image :src="item.img" mode="widthFix"></image>
				<view class="action-info">
					<view class="action-title">{{ item.title }}</view>
					<view class="action-desc">{{ item.desc }}</view>
				</view>
			</view>
		</view>

		<!-- 券列表 -->
		<view class="coupon-wrap">
			<view class="coupon-tab">
				<view :class="['tab-item', { active: currentTabIndex === index }]" v-for="(tab, index) in renderTabs"
					:key="index" @click="handleTabClick(index)">
					<text>{{ tab.text }}({{ tab.count }})</text>
				</view>
			</view>

			<view class="coupon-list-wrap">
				<scroll-view scroll-y="true" style="height: 100%;">
					<coupon-list class="coupon-list-comp" :list="table.list" showImage
						@get="handleGetCoupon"></coupon-list>

					<view v-if="table.list.length === 0" class="no-coupon">暂无可领取的卡券</view>

				</scroll-view>
			</view>

		</view>

	</view>
</template>

<script>
	import PageNavBar from '@/components/page-nav-bar/index.vue'
	import UserDataHeader from '@/components/user-data-header/index.vue'
	import CouponList from '@/components/coupon-list/index.vue'
	import {
		token
	} from '@/apis/api';

	import {
		GetHomeInfoAjax,
		ReceiveCouponAjax
	} from '@/apis/api/modules/payment'
	import {
		CouponTypeEnum
	} from '@/utils/enum'
	import {
		baseUrl
	} from '@/config'

	export default {
		components: {
			PageNavBar,
			UserDataHeader,
			CouponList
		},
		data() {
			return {
				indexActions: [{
						img: '/static/imgs/icon_my-coupon@3x.png',
						title: '我的卡券',
						desc: '查看我的卡券',
						url: '/pages/my-coupon/index',
						auth: true
					},
					{
						img: '/static/imgs/icon_nearby-store@3x.png',
						title: '附近门店',
						desc: '查看附近门店',
						url: '/pages/shops/index'
					}
				],
				homeInfo: {},
				queryTabs: [{
						text: '全部',
						count: 0,
						key: 'AllCount',
						params: {
							CouponType: CouponTypeEnum.全部
						}
					},
					{
						text: '抵扣券',
						count: 0,
						key: 'DKCount',
						params: {
							CouponType: CouponTypeEnum.抵扣券
						}
					},
					{
						text: '折扣券',
						count: 0,
						key: 'ZKCount',
						params: {
							CouponType: CouponTypeEnum.折扣券
						}
					},
					{
						text: '满减券',
						count: 0,
						key: 'MJCount',
						params: {
							CouponType: CouponTypeEnum.满减券
						}
					}
				],
				table: {
					list: []
				},

				currentTabIndex: 0
			}
		},
		onShareAppMessage: function() {
			return {
				title: '券种核销',
				path: '/pages/index/index',
				success: function(res) {
					// 转发成功
				},
				fail: function(res) {
					console.log(res)
					// 转发失败
				}
			}
		},
		computed: {
			renderTabs() {
				const homeInfo = this.homeInfo
				return this.queryTabs.map(item => {
					item.count = homeInfo[item.key] || 0
					return item
				})
			}
		},
		onShow() {
			if (token.value) {
				this.$store.dispatch('user/getUserData')
			}
			this.getHomeInfo()
		},
		methods: {
			async getHomeInfo(loading = true) {
				loading && uni.showLoading({
					title: '加载中',
					mask: true
				})
				const result = await GetHomeInfoAjax({
					token: true,
					...this.queryTabs[this.currentTabIndex].params
				})
				// result.Result.BackgroundTheme = baseUrl + result.Result.BackgroundTheme
				this.homeInfo = result.Result
				this.table.list = result.Result.List.map(a => {
					a.isGet = false
					return a
				})
				uni.hideLoading()
				uni.setStorageSync('auth-bg', result.Result.ScBackgroudImage)
			},
			async handleGetCoupon(couponId) {
				uni.showLoading({
					title: '领取中',
					mask: true
				})
				await ReceiveCouponAjax({
					CouponID: couponId,
					token: true
				})
				uni.showToast({
					title: '领取成功！',
					icon: 'none'
				})
				this.getHomeInfo(false)
			},
			handleTabClick(index) {
				this.currentTabIndex = index
				this.getHomeInfo()
			},
			handleClickActionItem(index) {
				const item = this.indexActions[index]
				if (item.auth && !token.value) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		height: 100%;
		background-color: #F7F7F7;
		display: flex;
		flex-direction: column;
	}

	.user-data {
		position: absolute;
		bottom: 76upx;
		left: 30upx;
	}

	.index-actions {
		margin: 50upx 30upx 0;
		font-size: 0;
	}

	.action-item {
		display: inline-flex;
		align-items: center;
		width: calc(50% - 16upx);
		padding: 30upx;
		box-shadow: 0px 2upx 16upx 0px rgba(0, 0, 0, 0.05);
		border-radius: 8upx;
		box-sizing: border-box;
		background-color: #fff;

		image {
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.action-title {
			font-size: 32upx;
			font-weight: 600;
		}

		.action-desc {
			color: #999;
			font-size: 24upx;
			margin-top: 2upx;
		}

		&+.action-item {
			margin-left: 30upx;
		}
	}

	.coupon-wrap {
		margin: 40upx 30upx 0;
		flex-grow: 1;
		height: 0;
		display: flex;
		flex-direction: column;
	}

	.coupon-tab {
		font-size: 0;
		flex-shrink: 0;

		.tab-item {
			display: inline-block;
			vertical-align: top;
			border-radius: 8upx;
			background-color: #CACACA;
			padding: 10upx 16upx;
			color: #fff;
			transition: all .3s;
			font-size: 24upx;

			&.active {
				background-color: #333333;
				font-weight: 500;
			}

			&+.tab-item {
				margin-left: 20upx;
			}
		}
	}

	.coupon-list-wrap {
		margin-top: 40upx;
		flex-grow: 1;
		height: 0;
	}

	.coupon-list-comp {
		display: block;
		padding-bottom: 30upx;
	}

	.no-coupon {
		text-align: center;
		color: #999;
		padding: 40upx 0;
	}
</style>
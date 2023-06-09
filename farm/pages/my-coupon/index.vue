<template>
	<view class="page">
		<page-nav-bar class="fs0" bg="/static/imgs/my-coupon-bg@3x.png" :height="238" title="我的卡券">
			<swiper-tab 
				class="swiper-tabs" 
				:tabs="tabs" 
				id="tabs" 
				background="transparent" 
				color="#999999" 
				activeColor="#fff"
				:left="-10"
				:right="-10"
				@change="handleTabClick"
			>
				</swiper-tab>
		</page-nav-bar>
		
		<!-- 券列表 -->
		<view class="coupon-wrap">
			<view class="coupon-list-wrap">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="scrollToBottom">
					<coupon-list class="coupon-list-comp" :list="table.list" showImage></coupon-list>
					<list-status :status="table.status" @retry="resetList" />
				</scroll-view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import PageNavBar from '@/components/page-nav-bar/index.vue'
	import UserDataHeader from '@/components/user-data-header/index.vue'
	import CouponList from '@/components/coupon-list/index.vue'
	import SwiperTab from '@/frame/components/swiper-tab/index.vue'
	import { GetMyCouponAjax } from '@/apis/api/modules/payment'
	import ListPage from '@/frame/utils/create-list'
	import { CouponStatusEnum } from '@/utils/enum'
	
	const list = new ListPage({
		api: GetMyCouponAjax,
		data: {
			token: true,
		},
		callback(data) {
			return data.map(item => {
				item.isGet = true
				item.status = this.queryTabs[this.currentTabIndex].params.status
				return item
			})
		},
		process(data) {
			const result = data.data.Result
			this.queryTabs[0].count = result.WaitCount
			this.queryTabs[1].count = result.UseCount
			this.queryTabs[2].count = result.ExpireCount
		}
	})
	
	export default {
		mixins: [list],
		components: {
			PageNavBar,
			UserDataHeader,
			CouponList,
			SwiperTab
		},
		data() {
			return {
				queryTabs: [
					{
						text: '待使用',
						count: 0,
						params: {
							status: CouponStatusEnum.待使用
						}
					},
					{
						text: '已使用',
						count: 0,
						params: {
							status: CouponStatusEnum.已使用
						}
					},
					{
						text: '已过期',
						count: 0,
						params: {
							status: CouponStatusEnum.已过期
						}
					}
				],
				table: {
					list: []
				},
				currentTabIndex: 0
			}
		},
		computed: {
			tabs() {
				return JSON.parse(JSON.stringify(this.queryTabs)).map(item => {
					item.text = `${item.text}(${item.count || 0 })`
					return item
				})
			}
		},
		onLoad() {
			this.addParams({
				...this.queryTabs[this.currentTabIndex].params
			})
			this.getPageList()
		},
		methods: {
			handleTabClick(index) {
				this.currentTabIndex = index
				this.addParams({
					...this.queryTabs[this.currentTabIndex].params
				})
				this.resetList()
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
	
	.swiper-tabs {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.coupon-wrap {
		margin: 30upx 30upx 0;
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
			padding: 10upx 30upx;
			color: #fff;
			transition: all .3s;
			font-size: 28upx;
			
			&.active {
				background-color: #333333;
				font-weight: 500;
			}
			
			& + .tab-item {
				margin-left: 30upx;
			}
		}
	}
	
	.coupon-list-wrap {
		flex-grow: 1;
		height: 0;
	}

	.coupon-list-comp {
		display: block;
		padding-bottom: 30upx;
	}
</style>

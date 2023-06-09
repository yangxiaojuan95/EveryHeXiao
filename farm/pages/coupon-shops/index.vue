<template>
	<view class="page">
		<page-nav-bar class="fs0" bg="/static/imgs/nearly-store-bg@3x.png" :height="262" title="可用门店">
			<search-header class="search-header-comp" v-model="keywords" placeholder="输入门店名称" @confirm="onConfirm"></search-header>
		</page-nav-bar>
		
		<!-- 门店列表 -->
		<view class="shop-wrap">
			<view class="shop-list-wrap">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="scrollToBottom">
					<shop-list class="shop-list-comp" :list="table.list"></shop-list>
					<list-status :status="table.status" @retry="resetList" />
				</scroll-view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import PageNavBar from '@/components/page-nav-bar/index.vue'
	import ShopList from '@/components/shop-list/index.vue'
	import SearchHeader from '@/components/search-header/index.vue'
	import { GetCouponShopAjax } from '@/apis/api/modules/payment'
	import ListPage from '@/frame/utils/create-list'
	import { CouponStatusEnum } from '@/utils/enum'
	
	const list = new ListPage({
		api: GetCouponShopAjax,
		data: {
			token: true,
		},
		getList(data) {
			return data
		}
	})
	
	export default {
		mixins: [list],
		components: {
			PageNavBar,
			ShopList,
			SearchHeader
		},
		data() {
			return {
				couponId: null,
				keywords: '',
				location: {
					Lng: 121.63084,
					Lat: 29.86607
				},
				table: {
					list: []
				},
			}
		},
		onLoad(options) {
			this.couponId = options.couponId
			this.addParams({
				CouponId: this.couponId
			})
			this.getLocation()
		},
		methods: {
			getLocation() {
				uni.getFuzzyLocation({
					success: res => {
						this.location = {
							Lng: res.longitude,
							Lat: res.latitude
						}
						this.addParams({
							...this.location
						})
						this.resetList()
					},
					fail: res => {
						this.addParams({
							...this.location
						})
						this.resetList()
					}
				})
			},
			onConfirm() {
				this.addParams({
					keyword: this.keywords
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
	
	.search-header-comp {
		position: absolute;
		bottom: 30upx;
		left: 30upx;
		right: 30upx;
	}
	
	.shop-wrap {
		margin: 30upx 30upx 0;
		flex-grow: 1;
		height: 0;
		display: flex;
		flex-direction: column;
	}
	
	.shop-tab {
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
	
	.shop-list-wrap {
		flex-grow: 1;
		height: 0;
	}

	.shop-list-comp {
		display: block;
		padding-bottom: 30upx;
	}
</style>

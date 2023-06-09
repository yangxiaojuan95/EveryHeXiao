<template>
	<view class="page">
		<page-nav-bar class="fs0" bg="/static/imgs/role-bg@3x.png" :height="130" title="使用规则">
		</page-nav-bar>
		
		<view class="coupon-rule-info">
			<view class="rule-item" v-for="(item, index) in couponRuleList" :key="index">
				<view class="rule-label">{{ item.label }}</view>
				<view class="rule-content">
					<text v-if="!item.rich">{{ item.content }}</text>
					<rich-text v-else :nodes="item.content"></rich-text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import PageNavBar from '@/components/page-nav-bar/index.vue'
	import ShopList from '@/components/shop-list/index.vue'
	import SearchHeader from '@/components/search-header/index.vue'
	export default {
		components: {
			PageNavBar,
			ShopList,
			SearchHeader
		},
		data() {
			return {
				couponId: null,
				couponItem: {}
			}
		},
		computed: {
			couponRuleList() {
				return [
					{
						label: '优惠说明',
						content: this.couponItem.Illustrate,
					},
					{
						label: '有效日期',
						content: `${this.couponItem.ValidTime}`
					},
					{
						label: '可用时段',
						content: this.couponItem.ApplicableWeek
					},
					{
						label: '适用商品',
						content: this.couponItem.SyGoods
					},
					{
						label: '使用须知',
						content: this.couponItem.Instructions,
						rich: true
					}
				]
			}
		},
		onLoad(opt) {
			this.couponId = opt.ID
			this.getCoupon()
		},
		methods: {
			getCoupon() {
				const coupon = uni.getStorageSync('coupon-item')
				this.couponItem = JSON.parse(coupon)
			},
		}
	}
</script>

<style scoped lang="scss">
	.page {
		min-height: 100%;
		background-color: #fff;
	}
	
	.coupon-rule-info {
		
	}
	
	.rule-item {
		padding: 40upx 0;
		margin: 0 30upx;
		border-bottom: 2upx solid #EFEFEF;
	}
	
	.rule-label {
		font-size: 34upx;
		font-weight: 500;
		color: #333;
		
		&::before {
			content: '';
			display: inline-block;
			width: 4upx;
			height: 32upx;
			background-color: #333;
			margin-right: 16upx;
			vertical-align: middle;
		}
	}
	
	.rule-content {
		margin-top: 22upx;
		color: #666;
		font-size: 32upx;
	}

</style>

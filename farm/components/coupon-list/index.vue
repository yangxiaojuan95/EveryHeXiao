<template>
	<view class="coupon-list">
		<coupon-item 
			v-for="(item, index) in list" 
			:key="item.CouponId" 
			:item="item"
			:showImage="showImage"
			@get='handleGet(index)'
		 class="coupon-item-comp">
		 </coupon-item>
	</view>
</template>

<script>
	import CouponItem from '@/components/coupon-item/index.vue'
	export default {
		components: {
			CouponItem
		},
		props: {
			list: {
				type: Array,
				default: () => ([])
			},
			showImage: {
				type: Boolean,
				default: false
			},
		},
		methods: {
			handleGet(index) {
				this.$emit('get', this.list[index].CouponID)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-list {
		
	}
	.coupon-item-comp {
		display: block;
		
		& + .coupon-item-comp {
			margin-top: 30upx;
		}
	}
</style>
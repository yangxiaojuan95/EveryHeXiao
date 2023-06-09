<template>
	<view class="shop-list">
		<shop-item 
			v-for="(item, index) in list" 
			:key="index + item.ShopID" 
			:item="item"
		 class="shop-item-comp">
		 </shop-item>
	</view>
</template>

<script>
	import ShopItem from '@/components/shop-item/index.vue'
	export default {
		components: {
			ShopItem
		},
		props: {
			list: {
				type: Array,
				default: () => ([])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop-list {
		
	}
	.shop-item-comp {
		display: block;
		
		& + .shop-item-comp {
			margin-top: 30upx;
		}
	}
</style>
<template>
	<view class="search-header">
		<view class="search-item">
			<image class="search-item-img" src="/static/imgs/icon_serch@3x.png" mode="widthFix"></image>
			<input class="search-input" type="text" :value="value" :placeholder="placeholder"
				placeholder-class="placeholder" @input="onInputValue" @confirm="onConfirm" />
			<icon class="search-clear-button" v-show="value" type="clear" :size="14" @click="clearValue"></icon>
		</view>
	</view>
</template>

<script>
	import { debounce } from '@/frame/utils/index'
	export default {
		name: 'SearchHeader',
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请输入单号查询'
			},
		},
		methods: {
			onInputValue: debounce(function(e) {
				this.$emit('input', e.detail.value)
				this.doConfirm()
			}),
			onConfirm() {
				this.doConfirm()
			},
			doConfirm() {
				this.$emit('confirm', this.value)
			},
			clearValue() {
				this.$emit('input', '')
				this.doConfirm()
				this.$emit('clear')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-item {
		@include flex-center;
		border-radius: 8upx;
		background: #fff;
		padding: 16upx 20upx;
		height: 72upx;
		box-sizing: border-box;
	}

	.search-item-img {
		width: 40upx;
		height: 40upx;
		margin-right: 10upx;
		flex-shrink: 0;
	}

	.search-input {
		flex-grow: 1;
		width: 0;
	}

	.search-clear-button {
		flex-shrink: 0;
		margin-left: 20upx;
	}

</style>

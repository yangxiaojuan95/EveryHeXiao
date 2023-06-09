<template>
	<view class="search-header">
		<view class="search-item">
			<image class="search-item-img" src="/static/img/icon_serch@3x.png" mode="widthFix"></image>
			<input class="search-input" type="text" :value="value" :placeholder="placeholder"
				placeholder-class="search-placeholder" @input="onInputValue" @confirm="onConfirm" />
			<icon class="search-clear-button" v-show="value" type="clear" :size="14" @click="clearValue"></icon>
			<view class="search-btn" @click="onClickSearch">
				<text>{{ confirmText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
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
			confirmText: {
				type: String,
				default: '查询'
			}
		},
		methods: {
			onInputValue(e) {
				this.$emit('input', e.detail.value)
			},
			onClickSearch() {
				this.doConfirm()
			},
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
		border-radius: 44upx;
		background: #EFF1F8;
		overflow: hidden;
		padding-left: 30upx;
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

	.search-btn {
		height: 72upx;
		line-height: 72upx;
		background: $theme-color;
		box-shadow: -4upx 0px 16upx 0px rgba(23, 71, 178, 0.2700);
		border-radius: 44upx;
		flex-shrink: 0;
		margin-left: 20upx;
		padding: 0 40upx;
		color: #fff;
	}

	.search-placeholder {
		color: #999;
	}
</style>

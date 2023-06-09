<template>
	<view class="query-combine-wrap">
		<view :class="['query-combine-main', { opened: isopen }]">
			<slot />
			<view class="query-button" @click="onClickQuery">
				<text>筛选</text>
			</view>
		</view>	
		<view class="query-actions">
			<view class="close-button" @click="onClickToggleButton">
				<text>{{ isopen ? '收起' : '打开' }}</text>
				<text :class="['triangle', isopen ? 'top' : 'bottom']"></text>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isopen: true
			}
		},
		methods: {
			/**
			 * 切换搜索打开和关闭
			 */
			onClickToggleButton() {
				this.isopen = !this.isopen
			},
			/**
			 * 点击筛选
			 */
			onClickQuery() {
				this.$emit('query')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.query-combine-wrap {
		background-color: #fff;
		padding: 20upx 30upx;
	}
	
	.query-combine-main {
		transition: all .3s;
		max-height: 0;
		overflow: hidden;
		margin-bottom: 0;
		
		&.opened {
			max-height: 800upx;
			margin-bottom: 30upx;
		}
	}
	
	.query-button {
		background-color: $theme-color;
		color: #fff;
		line-height: 72upx;
		border-radius: 44upx;
		font-size: 28upx;
		text-align: center;
		margin-top: 30upx;
	}
	
	.close-button {
		color: #C0C4D3;
		font-size: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.triangle {
		display: inline-block;
		width: 0;
		height: 0;
		border-left: 8upx solid transparent;
		border-right: 8upx solid transparent;
		border-bottom: 8upx solid #A5A8BC;
		margin-left: 10upx;
		
		&.bottom {
			border-bottom: none;
			border-top: 8upx solid #A5A8BC;
		}
	}
</style>
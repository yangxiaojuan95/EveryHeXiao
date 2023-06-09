<template>
	<view class="upload-container">
		<view v-if="!mult" class="upload-wrap" :style="{
			width: widthStyle,
			height: widthStyle
		}" @click="handleChooseImage">
			<image v-show="src" :src="src" mode="aspectFit"></image>
			<view v-show='!src' class="upload-tip flex flex-direction c-center j-center">
				<image class="icon-add" src="/static/img/icon_photo@2x.png" mode="aspectFill"></image>
				<view class="tip">添加</view>
			</view>
		</view>
		<view class="mult-upload-wrap" v-else>
			<view class="upload-wrap" v-for="(item, index) in src" :key='index' :style="{
				width: widthStyle,
				height: widthStyle
			}" @click="handleChooseImageMult(index)">
				<image v-show="item" :src="item" mode="aspectFit"></image>
				<view v-show='!item' class="upload-tip flex flex-direction c-center j-center">
					<image class="icon-add" src="/static/img/icon_photo@2x.png" mode="aspectFill"></image>
					<view class="tip">添加</view>
				</view>
				<image v-if="item" @click.stop="onDel(index)" class="ic-close" src="/static/img/icon_close.png"
					mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: String,
				default: ''
			},
			mult: { // 多图上传
				type: Boolean,
				default: false
			},
			imgMaxNum: {
				type: Number,
				default: 0
			},
			imgMinNum: {
				type: Number,
				default: 0
			},
			width: {
				type: Number,
				default: 120
			},
			maxSize: {
				type: Number,
				default: 1 // 1M
			},
			max: {
				type: Number,
				default: -1
			}
		},
		watch: {
			value(val) {
				this.setSrc(val)
			}
		},
		computed: {
			widthStyle() {
				return uni.upx2px(this.width) + 'px'
			}
		},
		data() {
			return {
				src: ''
			}
		},
		mounted() {
			this.setSrc(this.value)
		},
		methods: {
			onDel(index) {
				this.src.splice(index, 1)
				this.$emit('input', this.src.filter(a => a).join(','))
			},
			// 多图
			handleChooseImageMult(index) {
				let src = this.src
				let isReplace = index !== src.length - 1
				uni.chooseImage({
					count: isReplace ? 1 : 9,
					success: res => {
						let tempFiles = res.tempFiles
						
						// 取出符合大小的图片
						const srcs = tempFiles.filter(file => {
							return !this.isOverSize(file.size)
						}).map(a => a.path)
						
						if (srcs.length < tempFiles.length) {
							this.showSizeError()
						}
						
						// 如果没有符合的 return
						if (!srcs.length) {
							return
						}
						
						if (isReplace) {
							src[index] = srcs[0]
						} else {
							src.splice(index, 1, ...srcs)
						}
						src = src.filter(item => item)
						if (this.max !== -1) {
							src = src.slice(0, this.max)
						}
						this.$emit('input', src.join(','))
					}
				})
			},
			handleChooseImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						const file = res.tempFiles[0]
						if (!this.isOverSize(file.size)) {
							this.$emit('input', file.path)
						} else {
							this.showSizeError()
						}
					}
				})
			},
			isOverSize(size) {
				return size > this.maxSize * 1024 * 1024
			},
			showSizeError() {
				uni.showToast({
					title: `请上传小于${this.maxSize}M的图片`,
					icon: 'none'
				})
			},
			setSrc(val) {
				if (this.mult) {
					if (!val) {
						this.src = ['']
					} else {
						let src = val.split(',')
						if (this.max === -1 || src.length < this.max) {
							// 还可以上传
							src.push('')
						}
						this.src = src
					}
				} else {
					this.src = val
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mult-upload-wrap {
		font-size: 0;

		.upload-wrap {
			display: inline-block;
			vertical-align: top;
			margin-bottom: 30upx;
			margin-right: 30upx;
		}
	}

	.upload-wrap {
		background-color: #F5F5F5;
		position: relative;

		&>image {
			width: 100%;
			height: 100%;
		}

		&>.upload-tip {
			text-align: center;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: 1px solid #CBCBCB;
			background-color: #fff;
			border-radius: 10upx;

			.icon-add {
				width: 44upx;
				height: 44upx;
			}
			
			.tip {
				color: #999999;
				font-size: 20upx;
				margin-top: 12upx;
			}
		}

		.ic-close {
			position: absolute;
			top: 4upx;
			right: 4upx;
			z-index: 1;
			width: 30upx;
			height: 30upx;
			background-color: #fff;
			border-radius: 50%;
			padding: 4upx;
		}

	}
</style>

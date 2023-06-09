<template>
	<view class='tabs flex c-center' :style="{backgroundColor: background, fontSize: tabFontSize}">
		<view class="tabs-item fg1"
		:class="{'active' : currentTab === index}"
		v-for="(item, index) in tabs"
		:key="index"
		@click="onSetTab(index)">
			<text :id="'tab' + index" :style="{color: currentTab === index ? activeColor : color}">{{ item.text }}</text>
		</view>
		<view v-if="isShow"
		class="active-bar"
		:style="{left: activeBar.left, right: activeBar.right, backgroundColor: barColor, height: upxTopx(barHeight)}"></view>
	</view>
</template>

<script>
	export default {
		name: 'SwiperTab',
		props: {
			tabs: {
			  type: Array,
			  default: () => []
			},
			current: {
			  type: Number,
			  default: 0
			},
			background: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#333'
			},
			activeColor: {
				type: String,
				default: '#333'
			},
			barColor: {
				type: String,
				default: '#fff'
			},
			barHeight: {
				type: Number,
				default: 6
			},
			left: {
				type: Number,
				default: 0
			},
			right: {
				type: Number,
				default: 0
			},
			overwidth: {
				type: Number,
				default: 0
			},
			fontSize: {
				type: Number,
				default: 28
			}
		},
		computed: {
			tabFontSize() {
				return uni.upx2px(this.fontSize) + 'px'
			}
		},
		data() {
			return {
				isShow: false,
				currentTab: 0,
				activeBar: {
				  left: 0,
				  right: 0
				}
			}
		},
		watch: {
			current(val) {
				this.currentTab = val
				this.setActiveBar()
			}
		},
		mounted() {
			this.currentTab = this.current
			this.$nextTick(() => {
				this.setActiveBar()
			})
		},
		methods: {
			upxTopx(val) {
				return uni.upx2px(val) + 'px'
			},
			onSetTab(index) {
			  index = index * 1
			  let currentTab = this.currentTab
			  if (index === currentTab) {
					return false
			  }
			  this.currentTab = index
			  this.setActiveBar(index < currentTab ? "left" : "right")
			  this.$emit('change', index)
			},
			setActiveBar: function (direction) {
				const query = uni.createSelectorQuery().in(this)
				query.select(`#tab${this.currentTab}`).boundingClientRect(rect => {
					if (!rect) {
						return
					}
					let left = rect.left - uni.upx2px(this.left) - this.overwidth + 'px'
					let right = this.$store.state.system.systemInfo.windowWidth - uni.upx2px(this.right) - rect.right - this.overwidth + 'px'
					if (direction) {
					  if (direction === 'left') {
							this.activeBar.left = left
							setTimeout(() => {
								this.activeBar.right = right
							}, 75)
					  } else {
							this.activeBar.right = right
							setTimeout(() => {
								this.activeBar.left = left
							}, 75)
					  }
					} else {
					  this.activeBar.left = left
					  this.activeBar.right = right
					}
					this.isShow = true
				}).exec()
			}
		}
	}
</script>

<style lang="scss">
.tabs {
  height: 90upx;
  line-height: 90upx;
  left: 0;
  right: 0;
  background-color: #fff;
  font-size: 32upx;
  text-align: center;
  position: relative;
  z-index: 2;
  .tabs-item {
		height: 100%;
  }
}

.tabs .tabs-item.active {
  font-weight: 500;
}

.tabs .tabs-item.active text {
  opacity: 1;
}

.active-bar {
  position: absolute;
  bottom: 0;
  height: 6upx;
  left: 0;
  right: 10upx;
  transition: left .15s, right .15s;
}
</style>

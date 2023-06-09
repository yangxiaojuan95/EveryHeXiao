<template>
	<view class="canvasBox">
		<view class="box">
			<view class="line"></view>
			<view class="angle"></view>
		</view>
		<view class="box2" v-if="isUseTorch">
			<view class="track" @click="openTrack">
				<svg
					t="1653920715959"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="1351"
					width="32"
					height="32"
				>
					<path
						d="M651.353043 550.479503H378.752795L240.862609 364.315031c-3.688944-4.897391-5.660621-10.876025-5.660621-17.045466v-60.040745c0-15.773416 12.847702-28.621118 28.621118-28.621118h502.459627c15.773416 0 28.621118 12.847702 28.621118 28.621118v59.977143c0 6.105839-1.971677 12.084472-5.660621 17.045466l-137.890187 186.228074zM378.752795 598.308571v398.024348c0 15.328199 12.402484 27.667081 27.667081 27.667081h217.266087c15.328199 0 27.667081-12.402484 27.66708-27.667081V598.308571H378.752795z m136.300124 176.942112c-14.564969 0-26.331429-11.76646-26.331428-26.331428v-81.283975c0-14.564969 11.76646-26.331429 26.331428-26.331429 14.564969 0 26.331429 11.76646 26.331429 26.331429v81.283975c0 14.564969-11.76646 26.331429-26.331429 26.331428zM512 222.608696c-17.554286 0-31.801242-14.246957-31.801242-31.801243V31.801242c0-17.554286 14.246957-31.801242 31.801242-31.801242s31.801242 14.246957 31.801242 31.801242v159.006211c0 17.554286-14.246957 31.801242-31.801242 31.801243zM280.932174 205.881242c-9.47677 0-18.889938-4.197764-25.122981-12.275279L158.242981 67.991056a31.864845 31.864845 0 0 1 5.597019-44.648944 31.864845 31.864845 0 0 1 44.648944 5.597018l97.502609 125.551305a31.864845 31.864845 0 0 1-5.597019 44.648944c-5.787826 4.579379-12.656894 6.741863-19.46236 6.741863zM723.987081 205.881242c-6.805466 0-13.674534-2.162484-19.462361-6.678261a31.794882 31.794882 0 0 1-5.597018-44.648944l97.566211-125.551304a31.794882 31.794882 0 0 1 44.648944-5.597019 31.794882 31.794882 0 0 1 5.597019 44.648944l-97.566211 125.551305c-6.360248 8.077516-15.709814 12.27528-25.186584 12.275279z"
						fill="#ffffff"
						p-id="1352"
					></path>
				</svg>
				{{ trackStatus ? '关闭闪光灯' : '打开闪光灯' }}
			</view>
		</view>
		<view class="mask1 mask" :style="'height:' + maskHeight + 'px;'"></view>
		<view class="mask2 mask" :style="'width:' + maskWidth + 'px;top:' + maskHeight + 'px'"></view>
		<view class="mask3 mask" :style="'height:' + maskHeight + 'px;'"></view>
		<view class="mask4 mask" :style="'width:' + maskWidth + 'px;top:' + maskHeight + 'px'"></view>
	</view>
</template>
<script>
const Quagga = require('./quagga.min.js')
export default {
	props: {
		continue: {
			type: Boolean,
			default: false // false 监听一次   true 持续监听
		},
		exact: {
			type: String,
			default: 'environment' // environment 后摄像头  user 前摄像头
		},
		definition: {
			type: Boolean,
			default: false // fasle 正常  true 高清
		},
		readers: {
			// 一维码类型
			type: Array,
			default: () => ['code_128_reader']
		}
	},
	data() {
		return {
			windowWidth: 0,
			windowHeight: 0,
			video: null,
			canvas2d: null,
			canvasDom: null,
			canvasDom2: null, // 用于画框
			canvas2d2: null,
			canvasWidth: 300,
			canvasHeight: 200,
			maskWidth: 0,
			maskHeight: 0,
			cpu: 1,
			inter: 0,

			track: null,
			isUseTorch: false,
			trackStatus: false,

			isParse: false,

			data1: '',
			data2: ''
		}
	},
	mounted() {
		this.windowWidth = document.documentElement.clientWidth || document.body.clientWidth
		this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
		this.isParse = true
		this.$nextTick(() => {
			this.video = document.createElement('video')
			this.video.width = this.windowWidth
			this.video.height = this.windowHeight

			const canvas = document.createElement('canvas')
			this.canvas = canvas
			canvas.id = 'canvas'
			canvas.width = this.canvasWidth
			canvas.height = this.canvasHeight
			canvas.style = 'display:none;'

			// 设置当前宽高 满屏
			const canvasBox = document.querySelector('.canvasBox')
			canvasBox.append(this.video)
			canvasBox.append(canvas)
			canvasBox.style = `width:${this.windowWidth}px;height:${this.windowHeight}px;`

			this.canvas2d = canvas.getContext('2d')

			// 创建第二个canvas
			const canvas2 = document.createElement('canvas')
			this.canvas2 = canvas2
			canvas2.id = 'canvas2'
			canvas2.width = this.canvasWidth
			canvas2.height = this.canvasHeight
			canvas2.style = 'position: absolute;top: 50%;left: 50%;z-index: 20;transform: translate(-50%, -50%);'
			this.canvas2d2 = canvas2.getContext('2d')
			canvasBox.append(canvas2)

			this.cpu = 1 // navigator.hardwareConcurrency || 1
			//	console.log(navigator.hardwareConcurrency )

			this.createMsk()
			setTimeout(() => {
				this.openScan()
			}, 500)
		})
	},
	methods: {
		openScan() {
			let width = this.transtion(this.windowHeight)
			let height = this.transtion(this.windowWidth)

			const videoParam = {
				audio: false,
				video: {
					facingMode: { exact: this.exact },
					width,
					height
				}
			}

			navigator.mediaDevices
				.getUserMedia(videoParam)
				.then(stream => {
					this.video.srcObject = stream
					this.video.setAttribute('playsinline', true)
					this.video.play()
					this.tick()

					this.track = stream.getVideoTracks()[0]
					setTimeout(() => {
						this.isUseTorch = this.track.getCapabilities().torch || null
					}, 500)
				})
				.catch(err => {
					console.log('设备不支持', err)
				})
		},
		tick() {
			if (!this.isParse) return
			try {
				if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
					this.canvas2d.drawImage(
						this.video,
						this.transtion(this.maskWidth),
						this.transtion(this.maskHeight),
						this.transtion(300),
						this.transtion(200),
						0,
						0,
						this.canvasWidth,
						this.canvasHeight
					)
					const img = this.canvas.toDataURL('image/jpg')

					Quagga.decodeSingle(
						{
							inputStream: {
								size: 300 * 2
							},
							locator: {
								patchSize: 'large',
								halfSample: true
							},
							numOfWorkers: this.cpu,
							decoder: {
								readers: this.readers
							},
							locate: true,
							src: img
						},
						result => {
							this.canvas2d2.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
							requestAnimationFrame(this.tick)
							if (!result || !result.codeResult) return

							if (!this.data1) return (this.data1 = result.codeResult.code)
							this.data2 = result.codeResult.code
							console.log(this.data1, '-', this.data2)
							if (this.data2 !== this.data1) return (this.data1 = '')
							this.drawLine(result.box, result.line)
							if (!this.continue) {
								this.closeCamera()
							}
							this.$emit('success', result.codeResult.code)
						}
					)
				} else {
					requestAnimationFrame(this.tick)
				}
			} catch (e) {
				requestAnimationFrame(this.tick)
			}
		},

		drawLine(box, line) {
			if (!line[0] || !line[0]['x']) return
			this.canvas2d2.beginPath()
			this.canvas2d2.moveTo(line[0]['x'] / 2, line[0]['y'] / 2)
			this.canvas2d2.lineTo(line[1]['x'] / 2, line[1]['y'] / 2)
			this.canvas2d2.lineWidth = 2
			this.canvas2d2.strokeStyle = '#FF3B58'
			this.canvas2d2.stroke()
		},

		createMsk() {
			this.maskWidth = this.windowWidth / 2 - 150
			this.maskHeight = this.windowHeight / 2 - 100
		},
		closeCamera() {
			this.isParse = false
			if (this.video.srcObject) {
				this.video.srcObject.getTracks().forEach(track => {
					track.stop()
				})
			}
		},

		transtion(number) {
			return this.definition ? number * 2.6 : number * 1.6
		},

		openTrack() {
			this.trackStatus = !this.trackStatus
			this.track.applyConstraints({
				advanced: [{ torch: this.trackStatus }]
			})
		}
	},
	beforeDestroy() {
		this.closeCamera()
	}
}
</script>
<style scoped>
page {
	background-color: #333333;
}

.canvasBox {
	width: 100vw;
	position: relative;

	background-image: linear-gradient(
			0deg,
			transparent 24%,
			rgba(32, 255, 77, 0.1) 25%,
			rgba(32, 255, 77, 0.1) 26%,
			transparent 27%,
			transparent 74%,
			rgba(32, 255, 77, 0.1) 75%,
			rgba(32, 255, 77, 0.1) 76%,
			transparent 77%,
			transparent
		),
		linear-gradient(
			90deg,
			transparent 24%,
			rgba(32, 255, 77, 0.1) 25%,
			rgba(32, 255, 77, 0.1) 26%,
			transparent 27%,
			transparent 74%,
			rgba(32, 255, 77, 0.1) 75%,
			rgba(32, 255, 77, 0.1) 76%,
			transparent 77%,
			transparent
		);
	background-size: 3rem 3rem;
	background-position: -1rem -1rem;
	z-index: 10;
	background-color: #1110;
}

.box {
	width: 300px;
	height: 200px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	border: 0.1rem solid rgba(0, 255, 51, 0.2);
	z-index: 11;
}

.line {
	height: calc(100% - 2px);
	width: 100%;
	background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
	border-bottom: 3px solid #00ff33;
	transform: translateY(-100%);
	animation: radar-beam 2s infinite alternate;
	animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
	animation-delay: 1.4s;
}

.box2 {
	width: 300px;
	height: 200px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 20;
}

.track {
	position: absolute;
	bottom: -100px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 20;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.box:after,
.box:before,
.angle:after,
.angle:before {
	content: '';
	display: block;
	position: absolute;
	width: 3vw;
	height: 3vw;
	z-index: 12;
	border: 0.2rem solid transparent;
}

.box:after,
.box:before {
	top: 0;
	border-top-color: #00ff33;
}

.angle:after,
.angle:before {
	bottom: 0;
	border-bottom-color: #00ff33;
}

.box:before,
.angle:before {
	left: 0;
	border-left-color: #00ff33;
}

.box:after,
.angle:after {
	right: 0;
	border-right-color: #00ff33;
}

@keyframes radar-beam {
	0% {
		transform: translateY(-100%);
	}

	100% {
		transform: translateY(0);
	}
}

.msg {
	text-align: center;
	padding: 20rpx 0;
}

.mask {
	position: absolute;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.55);
}

.mask1 {
	top: 0;
	left: 0;
	right: 0;
}

.mask2 {
	right: 0;
	height: 200px;
}

.mask3 {
	right: 0;
	left: 0;
	bottom: 0;
}

.mask4 {
	left: 0;
	height: 200px;
}
</style>

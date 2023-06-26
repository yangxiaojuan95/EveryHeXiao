<template>
	<view class="" @click="hide">
		<!-- <mumu-one-code class="mumu-one-code" @success='handlerSuccess'  definition="true" exact="environment" :readers='["code_128_reader"]'></mumu-one-code> -->
		<mumu-get-qrcode @success='qrcodeSucess' exact="environment" definition="true" @error="qrcodeError">
		</mumu-get-qrcode>

	</view>
</template>

<script>
	import mumuGetQrcode from '@/uni_modules/mumu-getQrcode/components/mumu-getQrcode/mumu-getQrcode.vue'
	// 嫌路径长的话可以单独复制出来
	export default {
		components: {
			mumuGetQrcode
		},
		data() {
			return {
				type: null
			}
		},
		onLoad(e) {
			this.type = e.type
		},
		methods: {
			qrcodeSucess(data) {
				// uni.showModal({
				// 	title: '成功',
				// 	content: data,
				// 	success: () => {
				if (this.type == 1) {
					let bgKey = JSON.stringify(data);
					uni.setStorageSync("bgKey", bgKey);
					uni.navigateTo({
						// url: `/pages/login/index?Key=${data}`
						url: `/pages/login/index`
					})
				}
				if (this.type == 2) {
					// let hexiao = JSON.stringify(data);
					// uni.setStorageSync("hexiao", hexiao);
					uni.navigateTo({
						url: `/pages/index/index?data=${data}`
					})
				}

				// 	}
				// })
			},
			qrcodeError(err) {
				console.log(err)
				uni.showModal({
					title: '摄像头授权失败',
					content: '摄像头授权失败，请检测当前浏览器是否有摄像头权限。',
					success: () => {
						uni.navigateBack({})
					}
				})
			}
		}
	}
</script>
<!-- // <script>
	// 	import MumuOneCode from '@/uni_modules/mumu-oneCode/components/mumu-oneCode/mumu-oneCode.vue'

	// 	export default {
	// 		components: {
	// 			MumuOneCode
	// 		},
	// 		data(){
	// 			return{
	// 				key: true
	// 			}
	// 		},
	// 		methods: {
	// 			handlerSuccess(code) {
	// 				console.log('...',this.key)
	// 				uni.showModal({
	// 					content: code
	// 				}).then(res => {
	// 					console.log(res)
	// 					this.key = res
	// 					uni.navigateTo({
	// 						url: `/pages/login/index?Key=${res}`
	// 					})
	// 				})
	// 			},
	// 			hide() {
	// 				uni.navigateBack({
	// 					delta: 1
	// 				})
	// 			}
	// 		}
	// 	}
	// 
// </script> -->

<style>
</style>
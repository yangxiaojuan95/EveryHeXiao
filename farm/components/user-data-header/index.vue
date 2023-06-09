<template>
	<view class="user-top">
		<button class="user-topleft clearButton" open-type="getUserInfo" @getuserinfo="hadnleGetUserInfo">
			<image :src="useAvatar || defaultAvatar" mode="aspectFill"></image>
			<view class="">
				<view class="txt">
					{{ userName || '授权用户信息' }}
				</view>
			</view>
		</button>
	</view>
</template>

<script>
	import { token } from '@/apis/api'
	import { baseUrl } from '@/config'
	
	export default {
		props: {
			avatar: {
				type: String,
				default: ''
			},
			userName: {
				type: String,
				default: ''
			}
		},
		computed: {
			userData() {
				return this.$store.state.user.userData || {}
			},
			useAvatar() {
				return this.avatar.startsWith('http') ? this.avatar : baseUrl + this.avatar
			}
		},
		data() {
			return {
				defaultAvatar: '/static/imgs/default-avatar.png'
			}
		},
		methods: {
			hadnleGetUserInfo(e) {
				uni.navigateTo({
					url: '/pages/login/index'
				})
				// if (!this.yCheckLogin()) {
				// 	uni.navigateTo({
				// 		url: '/pages/login/index'
				// 	})
				// 	return false
				// }
				// uni.navigateTo({
				// 	url: '/pages/login/personal-Information'
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-top{
		.user-topleft {
			display: flex;
			align-items: center;
			image{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 20upx;
				background-color: $bg-color-image;
			}
			
			view .txt{
				font-size: 34upx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 48upx;
			}
		}
	}
</style>
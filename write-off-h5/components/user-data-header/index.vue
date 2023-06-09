<template>
	<view class="user-top">
		<view class="user-topleft">
			<image :src="userData.headImgUrl" mode="aspectFill"></image>
			<view class="">
				<view class="txt">
					{{ userData.userName || '姓名' }}
				</view>
				<view class="">
					完善信息
				</view>
				<!-- <button>{{ userData.roleName || '角色' }}</button> -->
			</view>
		</view>
		<view class="user-topright">
			<view @click="logout">退出</view>
		</view>
	</view>
</template>

<script>
	import { token } from '@/apis/api'
	
	export default {
		computed: {
			userData() {
				return this.$store.state.user.userData || {}
			}
		},
		methods: {
			logout() {
				uni.showModal({
					title: '退出登录',
					content: '是否确定退出登录?',
					success: res => {
						if (res.confirm) {
							uni.showToast({
								title: '退出登录成功!',
								mask: true
							})
							token.remove()
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login'
								})
							}, 1000)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-top{
		width: 90%;
		padding: 30upx;
		display: flex;
		justify-content: space-between;
		.user-topleft{
			display: flex;
			justify-content: space-around;
			image{
				width: 110upx;
				height: 110upx;
				border-radius: 55px;
				margin-right: 20upx;
				background-color: $bg-color-image;
			}
			
			view .txt{
				font-size: 34upx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 48upx;
			}
			view button{
				margin: 14upx 0;
				background: rgba(255,255,255,0.1);
				border-radius: 4upx;
				border: 2upx solid rgba(255,255,255,0.7);
				font-size: 20upx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 32upx;
			}
		}
		.user-topright{
			margin-top: 38upx;
			view{
				height: 60upx;
				padding: 0 22upx;
				font-size: 28upx;
				font-weight: 500;
				color: #443600;
				line-height: 60upx;
				background: #FEC403;
				border-radius: 10upx;
				bottom: 0;
			}
		}
	}
</style>
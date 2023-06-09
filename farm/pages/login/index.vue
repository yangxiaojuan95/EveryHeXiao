<template>
	<view class="box">
		<image :src="bgImg" mode="aspectFill"></image>
		<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="clearButton btn">
			<text class="text" plain="true">授权登录</text>
		</button>
	</view>
</template>

<script>
	import {
		token
	} from '@/apis/api';
	import {
		GetWxTokenAndTicketAjax,
		GetOpenIDByCodeAjax,
		PostAuthLoginAjax
	} from '@/apis/api/modules/login.ts'
	export default {
		data() {
			return {
				url: '',
				bgImg: ''
			}
		},
		onLoad() {
			this.setBgImg()
		},
		methods: {
			setBgImg() {
				this.bgImg = uni.getStorageSync('auth-bg')
			},
			getUserInfo(e) {
				let that = this
				uni.showModal({
					title: '登录',
					content: '确定微信授权登录',
					success: function(res) {
						if (!res.confirm) {
							return false
						}
						uni.showLoading({
							title: '处理中',
							mask: true
						})
						uni.login({
							"provider": "weixin",
							"onlyAuthorize": true, // 微信登录仅请求授权认证
							success: async function(event) {
								//获取openid
								
								uni.showLoading({
									title: '处理中',
									mask: true
								})
								
								const openList = await GetOpenIDByCodeAjax({
									code: event.code,
									userData: e.detail.encryptedData,
									iv: e.detail.iv
								})
								
								console.log(JSON.stringify(openList))
								
								//注册登录
								// const loginlist = await PostAuthLoginAjax({
								// 	OpenID: openList.Result.openid,
								// 	NickName: e.detail.userInfo.nickName,
								// 	Image: e.detail.userInfo.avatarUrl,
								// 	InviteCode: "",
								// 	UnionId: ""
								// })
								// token.setValue(openList.Result.token)
								
								// console.log('loginlist.Result', loginlist.Result)
								
								if (openList.Result.isGetPhone) {
									token.setValue(openList.Result.token)
									uni.reLaunch({
										url: '/pages/index/index'
									})
								} else {
									uni.redirectTo({
										url: `/pages/login/personal-Information?session_key=${encodeURIComponent(openList.Result.session_key)}&openid=${openList.Result.openid}`
									})
								}
								
								// return false
								
								// //注册登录
								// const loginlist = await PostAuthLoginAjax({
								// 	OpenID: openList.Result.openid,
								// 	NickName: e.detail.userInfo.nickName,
								// 	Image: e.detail.userInfo.avatarUrl,
								// 	InviteCode: "",
								// 	UnionId: ""
								// })
								// //登录成功设置token  
								// if (loginlist.Status === 50001) {
								// 	setTimeout(() => {
								// 		uni.navigateTo({
								// 			url: `/pages/login/personal-Information?session_key=${encodeURIComponent(openList.Result.session_key)}&openid=${openList.Result.openid}`
								// 		})
								// 	}, 200)
								// 	return false
								// }
								// token.setValue(loginlist.Result)
								// const user = await that.$store.dispatch(
								// 	'user/getUserData')
								// uni.navigateBack({
								// 	delta: 1
								// })
							},
							fail: function(err) {
								uni.showToast({
									title: '登录授权失败！',
									icon: 'error'
								})
							},
							complete: res => {
								uni.hideLoading()
							}
						})
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	image {
		width: 100%;
		height: 100%;
	}

	.box {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		
		image {
			width: 100%;
			height: 100%;
		}
	}

	.btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 80upx;
		right: 80upx;
		text-align: center;
		line-height: 88rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0px -1rpx 10rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 88rpx;
		justify-content: center;
		align-items: center;
		color: #000;
		font-weight: 500;
		font-size: 28upx;
	}

	button {
		border-style: none;
		border-radius: 0rpx;
		margin: 0rpx;
	}
</style>

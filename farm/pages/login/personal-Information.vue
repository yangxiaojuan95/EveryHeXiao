<template>
	<view class="box">
		<view class="user">
			<text>头像</text>
			<view class="img">
				<button class="text" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image :src="image?image:img" mode=""></image>
				</button>
				<image src="@/static/imgs/icon_go@3x.png" mode=""></image>
			</view>

		</view>
		<view class="user">
			<text>昵称</text>
			<input type="nickname" @change="handleName" v-model="name" class="text" placeholder="请输入昵称" />
		</view>
		<view class="user">
			<text>注册手机号</text>
			<button class="text" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" plain="true">
				<input type="text" v-model="phonedata" placeholder="请获取注册电话号">
			</button>
		</view>
		<view class="wanshan" @click="wanshan">完善资料</view>
	</view>
</template>

<script>
	import {
		GetDecryptPhoneAjax,
		PostUpdateForImageAjax,
		GetUpdateForNameAjax,
		GetImageUrlAjax,
		PostAuthLoginAjax
	} from '@/apis/api/modules/login'
	import {
		token
	} from '@/apis/api/index.ts'
	export default {
		data() {
			return {
				phone: {
					openid: '',
					session_key: ''
				},
				image: "",
				img: '',
				name: '',
				phonedata: null,
			}
		},
		onLoad(e) {
			this.phone.openid = e.openid
			this.phone.session_key = decodeURIComponent(e.session_key)
			// this.setUserData()
		},
		methods: {
			async setUserData() {
				const userData = await this.$store.dispatch('user/getUserData')
				this.name = userData.NickName
				this.image = userData.Image
			},
			onChooseAvatar(e) {
				this.img = e.detail.avatarUrl
				const time = (new Date()).getTime()
				console.log(this.img)
				uni.uploadFile({
					url: `https://approvalsale.nbxuanma.com/api/User/UpdateForImage?code=${time}`,
					filePath: this.img,
					file: this.img,
					name: 'file',
					header: {
						Authorization: token.value
					},
					success: async (uploadFileRes) => {
						const result = await GetImageUrlAjax({
							code: time,
							token: true
						})
						this.image = `https://approvalsale.nbxuanma.com${result.Result}`
						this.img = result.Result
					},
					fail(res) {
						console.log('错误', res)
					}
				});
			},
			handleName(e) {
				this.name = e.detail.value
			},
			async getPhoneNumber(e) {
				console.log(e.detail)
				const result = await GetDecryptPhoneAjax({
					openid: this.phone.openid,
					sessionKey: this.phone.session_key,
					phoneData: e.detail.encryptedData,
					iv: e.detail.iv
				})
				this.phonedata = result.Result
			},
			async wanshan() {
				if (!this.img) {
					uni.showToast({
						title: '请上传照片',
						icon: 'none'
					})
				}
				if (!this.name) {
					uni.showToast({
						title: '请填写昵称',
						icon: 'none'
					});
					return false
				}
				if (!this.phonedata) {
					uni.showToast({
						title: '请填写手机号',
						icon: 'none'
					});
					return false
				}
				//注册登录
				const loginlist = await PostAuthLoginAjax({
					OpenID: this.phone.openid,
					NickName: this.name,
					Image: this.img,
					InviteCode: "",
					UnionId: ""
				});
				token.setValue(loginlist.Result)
				uni.showToast({
					title: '授权成功！',
					icon: 'none'
				})
				await this.$store.dispatch('user/getUserData')
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 20)
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 20rpx 30rpx;
	}

	button {
		// width: 25%;
		border: none;
		padding: 0;
		margin: 0;
		//行距，这个很重要，决定了ICON和下面标题间的距离！
		line-height: normal;
		background-color: #fff;
		font-size: 14px
	}

	button::after {
		border: none;
		border-radius: 0;
	}

	.user {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #efefef;
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;

		.img {
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
			}
			
			.text {
				image {
					background-color: #f5f5f5;
				}
			}
		}

		.text {
			text-align: right;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		button {
			border-style: none;
			border-radius: 0rpx;
			margin: 0rpx;
			background-color: transparent;
		}
	}

	.wanshan {
		margin-top: 30upx;
		width: 690upx;
		height: 104upx;
		background: #00D08F;
		border-radius: 52upx;
		backdrop-filter: blur(20upx);
		font-size: 32upx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 104upx;
		text-align: center;
	}
</style>

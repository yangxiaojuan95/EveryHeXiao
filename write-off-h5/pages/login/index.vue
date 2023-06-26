<template>
	<view class="login">
		<view class="img">
			<!-- <image src="/static/img/logo.png" mode=""></image> -->
		</view>
		<!-- <view class="title">
			<text :class="{'name-active': type === 0}" @click="handleLogin(0)">账号登录</text>
			<text :class="{'name-active': type === 1}" @click="handleLogin(1)">扫码登录</text>
		</view> -->
		<view class="login-input">
			<input type="test" v-model="Key" class="input" name="" id="" placeholder="请点击右侧扫码登录"
				placeholder-class="placeholder">
			<view class="imgs" @click="headleSweep">
				<image src="/static/img/icon_add-edit.png"></image>
			</view>
		</view>
		<!-- <view class="login-name" v-if="type === 0">
			<view class="name">
				<text for="">账号：</text>
				<input type="test" v-model="name" class="input" name="" id="" placeholder="请输入账号"
					placeholder-class="placeholder">
			</view>
			<view class="name">
				<text for="">密码：</text>
				<input type="password" v-model="password" class="input" name="" id="" placeholder="请输入密码"
					placeholder-class="placeholder">
			</view>
		</view> -->
		<button @click="login" class="btn">登录</button>

		<view class="banben">(V-1.0.1)</view>
	</view>
</template>

<script>
	import {
		token
	} from '@/apis/api';
	import {
		LoginAjax
	} from '@/apis/api/modules/user'
	import * as QrCode from './qrcodeSearch'
	import md5 from 'blueimp-md5'

	export default {
		name: 'login',
		data() {
			return {
				formData: {
					username: ''
				},
				Key: null,
				isShow: false,
				queryParams: {
					vin: null
				},
				isUploadBarCode: true,
				type: 1,
				name: null,
				password: ''
			}
		},
		onLoad(e) {},
		onShow() {
			var bgKey = uni.getStorageSync("bgKey");
			var bgKeys = JSON.parse(bgKey);
			this.Key = bgKeys
		},
		methods: {
			/**
			 * 扫码
			 */
			async headleSweep() {
				uni.navigateTo({
					url: '/pages/mumu-one-code/index?type=1'
				})
			},
			handleLogin(e) {
				this.type = e
				this.Key = null
				this.name = null
				this.password = null
			},
			/* *
			 * 执行登录
			 */
			async login() {
				const formData = this.formData

				// if (!this.validForm(formData, [
				// 	{
				// 		key: 'Key',
				// 		text: '请扫码'
				// 	}
				// ])) {
				// 	return false
				// }
				if (this.type === 0) {
					if (!this.name) {
						uni.showToast({
							title: '请输入账号!',
							icon: 'none'
						})
						return false
					}
					if (!this.password) {
						uni.showToast({
							title: '请输入密码!',
							icon: 'none'
						})
						return false
					}
				}
				// if (this.type === 1) {
				// 	if (!this.Key) {
				// 		uni.showToast({
				// 			title: '请扫码登录!',
				// 			icon: 'none'
				// 		})
				// 		return false
				// 	}
				// }
				try {
					uni.showLoading({
						title: '登录中',
						mask: true
					})
					// let Keys = this.Key
					const loginResult = await LoginAjax({
						KeyCode: this.Key,
						Type: this.type,
						Name: this.name,
						Password: md5(this.password),
						// KeyCode: '360DA812C9143A31F551999E52AC99000F74651B2AD41F20F5A3797E27AD8BF2F2F4CB5A88C7F4BDBEA4D1A3D6645759'
					}, {
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
					})

					uni.showToast({
						title: '登录成功!',
						mask: true
					})
					// console.log('登录成功!', loginResult)
					// 登录成功设置token
					token.setValue(loginResult.Token)
					// 获取用户信息存储到vuex
					// console.log(loginResult)
					// await this.$store.dispatch('user/getUserData')

					uni.setStorageSync("ShopName", loginResult.ShopName);

					// console.log('juwse',this.$store.state.user.IsLeader)
					setTimeout(() => {
						// 执行登录后逻辑，跳转到对应的页面
						// this.$store.dispatch('user/toBusinessCenterPage')
						uni.reLaunch({
							url: '/pages/index/index'
						})
						// uni.navigateBack({
						// 	delta: 1
						// })
					}, 1000)
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep body.pages-login-index {
		background-color: aliceblue !important;
	}

	.title {
		display: flex;
		justify-content: center;
		font-size: 32rpx;

		text {
			padding: 20rpx 60rpx 20rpx;
		}

		.name-active {
			border-bottom: 3px solid #1747B2;
			border-radius: 20rpx;
		}
	}

	.banben {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: #d0d0d0;
		text-align: center;
	}

	.mumu-one-code {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
	}

	.login {
		height: 100%;
		overflow: hidden;
	}

	.img {
		width: 510upx;
		height: 240upx;
		margin: 60upx auto 60upx;
		text-align: center;

		image {
			width: 240upx;
			height: 200upx;
		}
	}

	.input {
		// width: 60upx;
		// height: 60upx;
		margin-right: 20upx;
		// border: 2upx solid #bfbfbf;
		// border-radius: 10upx;
	}

	.identity {
		padding: 0 15upx;
	}

	.identitys {
		padding: 0 0 18upx 18upx;
		width: 48upx;
		height: 34upx;
		font-size: 24upx;
		font-weight: 500;
		color: #333333;
		line-height: 34upx;
	}

	.active {
		width: 210upx;
		height: 64upx;
		background: rgba(23, 71, 178, 0.1);
		border-radius: 8upx;
		border: 2upx solid #1747B2;
		text-align: center;
		line-height: 64upx;
	}

	.identity-name {
		display: flex;
		justify-content: space-around;

		.views {
			width: 210upx;
			height: 64upx;
			background: #FFFFFF;
			border-radius: 8upx;
			border: 2upx solid #E5E6ED;
			text-align: center;
			line-height: 64upx;
		}
	}

	label {
		display: block;
		padding: 30upx 0 0;
		font-size: 24upx;
		font-weight: 500;
		color: #333333;
		line-height: 34upx;
	}

	.login-input {
		padding: 0 30upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.test {
			width: 500upx;
			height: 60upx;
			border: 4upx solid #EFEFEF;
			margin-right: 30upx;
		}

		.imgs {
			width: 60upx;
			height: 60upx;

			image {
				width: 60upx;
				height: 60upx;
				filter: grayscale(1) brightness(2);
			}

		}
	}

	.login-name {
		padding: 0 130upx;

		.name {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 34upx;
		}
	}

	input {
		padding: 20upx 0 30upx;
		border-bottom: 2upx solid #EFEFEF;
		font-size: 32upx;
		font-weight: 400;
	}

	.btn {
		margin-top: 40upx;
		width: 690upx;
		height: 100upx;
		background: #1747B2;
		border-radius: 50upx;
		font-size: 32upx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 100upx;
		letter-spacing: 1px;
	}
</style>
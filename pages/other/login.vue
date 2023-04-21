<template>
	<view>
		<view class="image-View">
			<u-avatar id="headImg-Avatar" :src="image_url" shape="square" size="350rpx"></u-avatar>
		</view>
		<view class="input-View">
			<text id="uid-Text">请输入你的帐号:</text>
			<input id="uid-Input" v-model="userInfo.uid" maxlength="11"/>
			<view class="upassword-View">
				<text id="upassword-Text">请输入你的密码:</text>
			</view>
			<view id="upassword-Input-View">
				<input id="upassword-Input" v-model="userInfo.upassword" :password="show_Flag" />
				<view id="upassword-icon">
					<u-icon :name="show_Text" size=30 @click="changeShow()" />
				</view>
			</view>
			<button id="login-Button" @click="login()">登录</button>

		</view>
	</view>
</template>

<script>
	import icon from '../../uni_modules/uview-ui/libs/config/props/icon'
	export default {
		data() {
			return {
				image_url: "/static/other-img/login-top-img.jpg",
				userInfo: {
					uid: "19401190212",
					upassword: "123456",
				},
				show_Flag: true,
				show_Text: "eye",
				code:0,
			}
		},
		methods: {
			// 此方法用于控制密码的"显示"和"隐藏"
			changeShow() {
				if (this.show_Flag) {
					this.show_Text = "eye-off"
					this.show_Flag = false
				} else {
					this.show_Text = "eye"
					this.show_Flag = true
				}
			},
			// 此方法用于登录
			login() {
				uni.clearStorage()
				let that = this
				uni.request({
					url: that.base_url + "/user/login",
					method: "POST",
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					data: this.userInfo,
					sslVerify: false,
					success: (res) => {
						if (res.data.code == 20000 || res.data.code == 20010) {
							uni.setStorage({
								key: "user",
								data: res.data.data.user,
								success: (resStorage) => {
									console.log("user信息存入缓存成功")
								}
							})
							uni.setStorage({
								key: "token",
								data: res.data.data.token,
								success: (resStorage) => {
									console.log("token信息存入缓存成功")
								}
							})
							if (res.data.code == 20010) {
								uni.setStorage({
									key: "corp",
									data: res.data.data.corp_info,
									success: (resStorage) => {
										console.log("corp信息存入缓存成功")
									}
								})
							}
							uni.setStorage({
								key: "code",
								data: res.data.code,
								success: (resStorage) => {
									console.log("code信息存入缓存成功")
								}
							})
							uni.reLaunch({
								url: "/pages/home/home",
							})
						} else {
							console.log(res.data),
								uni.showToast({
									title: res.data.message,
									icon: "error",
									duration: 2000,
								})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.image-View {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 450rpx;
	}

	.input-View {
		height: 200rpx;
		width: 100%;
	}

	.upassword-View {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#uid-Text {
		height: 100rpx;
		min-width: 100%;
		padding-left: 20rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	#upassword-Text {
		height: 100rpx;
		padding-left: 20rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	#uid-Input {
		height: 100rpx;
		border: 2rpx solid #ff6699;
		padding-left: 20rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	#upassword-Input-View {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100rpx;
		width: 750rpx;
		border: 2rpx solid #ff6699;

	}

	#upassword-Input {
		height: 100rpx;
		width: 600rpx;
		padding-left: 20rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	#upassword-icon {
		padding-top: 20rpx;
		height: 100rpx;
		width: 50rpx;
		padding-right: 20rpx;
	}

	#login-Button {
		height: 80rpx;
		width: 400rpx;
		margin-top: 150rpx;
		background-color: #ff6699;
		font-size: 40rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
	}
</style>

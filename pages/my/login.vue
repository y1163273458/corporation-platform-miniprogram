<template>
	<view>
		<view class="image-View">
			<u-avatar id="headImg-Avatar" :src="image_url" shape="square" size="350rpx"></u-avatar>
		</view>
		<view class="input-View">
			<text id="uid-Text">请输入你的帐号:</text>
			<input id="uid-Input" v-model="userInfo.uid" maxlength="11" />
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
		<view class="changePwd-View">
			<u-modal :show="areaShow" showConfirmButton="true" showCancelButton="true" title="首次登录请更新密码" confirm-text="确定" cancel-text="取消" @cancel="cancelAdd"
				@confirm="areaTxt.length>=8&areaTxt.length<=30?confirmAdd(true):confirmAdd(false)">
				<input type="text" v-model="areaTxt" placeholder="密码为大小写字母,数字,特殊字符" class="changePwd-Input" maxlength="30"/>
				<text style="color: rgba(200, 200, 200, 0.8);">{{areaTxt.length>=8&areaTxt.length<=30?"":"密码长度应为8-30"}}</text>
			</u-modal>
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
					// uid: "19401190216",
					// uid: "19401190212",
					uid: "12345678910",
					// upassword: "12345678",
					upassword: "123456",
				},
				show_Flag: true,
				show_Text: "eye",
				code: 0,
				areaShow: false,
				areaTxt: '',
			}
		},
		methods: {
			cancelAdd() {
				this.areaShow = false
			},
			confirmAdd(bool) {
				var that = this
				if (bool) {
					var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/
					var isValid = passwordreg.test(that.areaTxt);
					if(isValid != true){
						uni.showToast({
							title:"密码必须是大写字母，小写字母，数字，特殊字符组成，且长度为8到30位！",
							icon:"none",
							duration:2000
						})
						return
					}else{
					this.areaShow = false
					uni.request({
						url: that.base_url + "/user/changepassword",
						method: "POST",
						header: {
							'content-type': 'application/json;charset:utf-8'
						},
						data: {
							uid: that.userInfo.uid,
							upassword: that.areaTxt,
						},
						sslVerify: false,
						success: (res) => {
							that.userInfo.upassword = that.areaTxt
							that.login(res)
						}
					})
					}
				}
			},
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
			saveInfo(resI) {
				let that = this
				console.log(resI)
				uni.setStorage({
					key: "user",
					data: resI.data.data.user,
					success: (resStorage) => {
						console.log("user信息存入缓存成功")
					}
				})
				uni.setStorage({
					key: "token",
					data: resI.data.data.token,
					success: (resStorage) => {
						console.log("token信息存入缓存成功")
					}
				})
				if (resI.data.code == 20100) {
					uni.setStorage({
						key: "corp",
						data: resI.data.data.corp_info,
						success: (resStorage) => {
							console.log("corp信息存入缓存成功")
						}
					})
				}
				uni.setStorage({
					key: "code",
					data: resI.data.code,
					success: (resStorage) => {
						console.log("code信息存入缓存成功")
					}
				})
				uni.reLaunch({
					url: "/pages/home/home",
				})
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
					data: that.userInfo,
					sslVerify: false,
					success: (res) => {
						if (res.data.code == 20010) {
							that.areaShow = true
						} else if (res.data.code == 20000 || res.data.code == 20100) {
							that.saveInfo(res)
						} else {
							console.log(res.data),
								uni.showToast({
									title: "登陆失败",
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

	.changePwd-Input {
		height: 70rpx;
		line-height: 70rpx;
		font-size: 35rpx;
		padding: 0rpx 10rpx 0rpx 10rpx;
		border: 2rpx solid #ff6699;
	}
</style>

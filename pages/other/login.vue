<template>
	<view>
		<view class="image-View">
			<u-avatar id="headImg-Avatar" :src="image_url" shape="square" size="350rpx"></u-avatar>
		</view>
		<view class="input-View">
			<text id="uid-Text">请输入你的学号:</text>
			<input id="uid-Input" v-model="userInfo.uid" />
			<view class="upassword-View">
				<text id="upassword-Text">请输入你的密码:</text>
				<button id="showPassword-Button" @click="changeShow()">{{show_Text}}</button>
			</view>
			<input id="upassword-Input" v-model="userInfo.upassword" :password="show_Flag" password-icon="true"/>
			<button id="login-Button" @click="login()">登录</button>
		</view>
	</view>
</template>

<script>
import icon from '../../uni_modules/uview-ui/libs/config/props/icon'
	export default {
		data() {
			return {
				image_url:"/static/other-img/login-top-img.jpg",
				userInfo:{
					uid: "19401190216",
					upassword: "123456",
				},
				show_Flag: true,
				show_Text: "显示密码"
			}
		},
		methods: {
			// 此方法用于控制密码的"显示"和"隐藏"
			changeShow() {
				if (this.show_Flag) {
					this.show_Text = "隐藏密码"
					this.show_Flag = false
				} else {
					this.show_Text = "显示密码"
					this.show_Flag = true
				}
			},
			// 此方法用于登录
			login(){
				var _this = this
				uni.request({
					url: _this.base_url + "/user/login",
					method: "POST",
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					data:this.userInfo,
					sslVerify: false,
					success: (res) => {
						if(res.data.code == 20000){
							uni.switchTab({
								url:"/pages/home/home"
							})
						}else{
							console.log(res.data),
							uni.showToast({
								title:res.data.message,
								icon:"error",
								duration:2000,
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.image-View{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 450rpx;
	}
	.input-View {
		height: 200rpx;
		width: 100%;
	}
	.upassword-View{
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
		border: 2rpx solid #ff6699 ;
		padding-left: 20rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	#upassword-Input {
		height: 100rpx;
		border: 2rpx solid #ff6699 ;
		padding-left: 20rpx;
		font-size: 30rpx;
		line-height: 100rpx;
	}
	#showPassword-Button{
		height: 50rpx;
		top: 30rpx;
		left: 100rpx;
		border: 2rpx solid #ff9999 ;
		font-size: 30rpx;
		line-height: 45rpx;
	}
	#login-Button{
		height: 100rpx;
		width: 80%;
		margin-top: 150rpx;
		background-color: #ff6699;
		font-size: 40rpx;
		line-height: 100rpx;
	}
</style>

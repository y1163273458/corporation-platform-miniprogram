<template>
	<view>
		<view class="image-View">
			<u-avatar id="headImg-Avatar" :src="image_url" shape="square" size="350rpx"></u-avatar>
		</view>
		<view class="input-View">
			<text id="uid-Text">请输入你的学号:</text>
			<input id="uid-Input" v-model="uid" />
			<view class="upassword-View">
				<text id="upassword-Text">请输入你的密码:</text>
				<button id="showPassword-Button" @click="changeShow()">{{show_Text}}</button>
			</view>
			<input id="upassword-Input" v-model="uPassword" :password="show_Flag" />
			<button id="login-Button">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image_url:"/static/other-img/login-top-img.jpg",
				uid: "19401190216",
				uPassword: "1234",
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

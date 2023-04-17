<template>
	<view>
		<view>
			<!-- 用户信息 -->
			<view class="info-View">
				<u-avatar id="headImg-Avatar" :src="myDate.headImg" shape="circle" size="150rpx"></u-avatar>
				<view class="textInfo-view" @click="getMyInfo">
					<view id="myName-View">
						<text>{{myDate.name}}</text>
					</view>
					<view id="myCollege-View">
						<text>{{myDate.college}}</text>
					</view>
					<view id="myClass-View">
						<text>{{myDate.class}}</text>
					</view>
				</view>
			</view>
			<view class="account-View">
				<button id="login-Button" @click="goTologin()">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		methods
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				myDate: {
					headImg: "/static/head-img/DiDi.jpg",
					name: "万象收萝",
					college: "网络与信息安全学院",
					class: "网工191"
				}
			};
		},
		methods: {
			// 获取用户信息
			getMyInfo() {
				uni.request({
					url: "http://192.168.110.21:9001/user/info",
					method: "POST",
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					data:{
						'num':1,
					},
					sslVerify: false,
					success: (res) => {
						console.log(res.data)
					}
				})
			},
			// 前往注册页
			goTologin(){
				uni.navigateTo({
					url:"/pages/other/login",
					success: (res) => {
						console.log("前往注册页")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.info-View {
		display: flex;
		// border: 2rpx black solid;
		width: 600rpx;
		height: 150rpx;
		margin-top: 70rpx;
		margin-left: 10%;
		border-radius: 10rpx;

		#headImg-Avatar {}

		.textInfo-view {
			height: 100%;

			#myName-View {
				color: #ff6699;
				margin-left: 50rpx;
				font-size: 30rpx;
				// font-weight: bolder;
				line-height: 50rpx;
			}

			#myCollege-View {
				color: #c8c8c8;
				margin-left: 50rpx;
				font-size: 25rpx;
				// font-weight: bolder;
				line-height: 50rpx;
			}

			#myClass-View {
				color: #c8c8c8;
				margin-left: 50rpx;
				font-size: 25rpx;
				// font-weight: bolder;
				line-height: 30rpx;
			}
		}
	}
	#login-Button{
		height: 100rpx;
		width: 500rpx;
		background-color: #c8c8c8;
		font-size: 50rpx;
		line-height: 100rpx;
		border-radius: 10rpx;
	}
</style>

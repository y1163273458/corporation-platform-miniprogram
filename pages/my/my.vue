<template>
	<view>
		<view>
			<!-- 用户信息 -->
			<view class="info-View">
				<u-avatar id="headImg-Avatar" :src="user.uavatar" shape="circle" size="150rpx"></u-avatar>
				<view class="textInfo-view">
					<view id="myName-View">
						<text>{{user.uname}}</text>
					</view>
					<view id="myCollege-View">
						<text>{{user.collage==null?'':user.collage}}</text>
					</view>
					<view id="myClass-View">
						<text>{{user.uclass==null?'':user.uclass}}</text>
					</view>
				</view>
				<view id="corp_View" v-if="code==20010">
					<view id="corp_name">社团：{{corp.cname}}</view>
					<view id="corp_level">身份：{{cmlevel}}</view>
				</view>
			</view>
			<view class="operation-View" :style="{'height':windowHeight + 'px'}">
				<view class="operation-Button-View" v-if="code==20010" @click="gotoCreate()">
					<image class="operation-Image" src="/static/icon/create.png" mode="aspectFit"></image>
					<text class="operation-Text">创建活动</text>
				</view>
			</view>
			<view class="account-View">
				<icon></icon>
				<button id="logout-Button" @click="goTologin()">登出</button>
			</view>
		</view>
	</view>
</template>

<script>
	import code from '../../uni_modules/uview-ui/libs/config/props/code';
	import {
		methods
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				user: {},
				corp: {},
				code: 0,
				cmlevel: "",
				windowHeight: 0
			};
		},
		onLoad() {
			var that = this
			that.getMyInfo()
			uni.getSystemInfo({
				success: (res) => {
					that.windowHeight = res.windowHeight - 250;
					console.log(that.windowHeight)
				}
			})
		},
		methods: {
			gotoCreate(){
				var that = this
				uni.navigateTo({
					url:"/pages/activity/create?uid=" + that.user.uid + "&cid=" + that.corp.cid,
					success: (res) => {
						console.log("前往create页面" + "/pages/activity/create?uid=" + that.user.uid + "&cid=" + that.corp.cid)
					}
				})
			},
			// 获取用户信息
			getMyInfo() {
				var that = this
				uni.getStorage({
					key: "user",
					success: function(resStorage) {
						console.log(resStorage.data)
						that.user = resStorage.data
					},
					fail: (err) => {
						console.log(err)
					}
				})
				uni.getStorage({
					key: "code",
					success: function(resStorage) {
						console.log(resStorage.data)
						that.code = resStorage.data
						if (that.code == 20010) {
							uni.getStorage({
								key: "corp",
								success: function(resCorp) {
									console.log(resCorp.data)
									that.corp = resCorp.data
									that.getCropLevel()
								},
								fail: (err) => {
									console.log(err)
								}
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 前往登录页
			goTologin() {
				uni.clearStorage();
				uni.reLaunch({
					url: "/pages/other/login",
					success: (res) => {
						console.log("前往登录页")
					}
				})
			},
			getCropLevel() {
				var that = this
				var level = that.corp.cmlevel
				if (level == 1) {
					that.cmlevel = "部门人员"
				}
				if (level == 2) {
					that.cmlevel = "社长"
				}
				if (level == 3) {
					that.cmlevel = "管理员"
				}

			}
		}
	}
</script>

<style lang="scss">
	.info-View {
		display: flex;
		position: relative;
		height: 200rpx;
		width: 600rpx;
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

	#corp_View {
		width: 250rpx;
		height: 150rpx;
		line-height: 150rpx;
		text-align: right;

		#corp_name {
			height: 60rpx;
			line-height: 60rpx;
		}

		#corp_level {
			height: 60rpx;
			line-height: 60rpx;
		}
	}

	.operation-View {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.operation-Button-View {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 50rpx 0rpx 25rpx 25rpx;
		height: 200rpx;
		width: 200rpx;
		text-align: center;
		border: 5rpx #ff6699 solid;
		border-radius: 30rpx;
	}

	.operation-Image {
		padding-top: 40rpx;
		height: 80rpx;
		width: 80rpx;

	}

	.operation-Text {
		height: 80rpx;
		min-width: 200rpx;
		line-height: 80rpx;
		color: #535353;

	}

	.account-View {}

	#logout-Button {
		margin-top: 20rpx;
		height: 80rpx;
		width: 400rpx;
		background-color: #ff6699;
		font-size: 40rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
	}
</style>

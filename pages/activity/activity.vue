<template>
	<view>

		<view class="activity-View-Flex">
			<view class="activity-List-View" v-for="(item,index) in activityList" :key="index"
				@click="goToActivityPage(item.aid,item.pstatus)">
				<image class="activity-Img" :src="item.aimage" mode="aspectFit">
					<text class="activity-Status">{{item.astatus==null?item.pstatus:item.astatus}}</text>
				</image>
				<text class="activity-title">{{item.aname.length>11?item.aname.substring(0,11)+'..':item.aname}}</text>
				<text class="activity-dateTime">
					{{item.astarttime.substring(0,10).replace(new RegExp("-","g"),".") + " "}}-{{" " + item.aendtime.substring(0,10).replace(new RegExp("-","g"),".")}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				corp: {},
				code: 0,
				cmlevel: 0,
				activityList: []
			};
		},
		onLoad() {
			this.getMyInfo()
		},
		onShow() {
			this.getActivity()
		},
		methods: {
			getActivity() {
				var that = this
				uni.request({
					url: that.base_url + "/activity/myactivity",
					method: "POST",
					data: {
						uid: that.user.uid,
					},
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					sslVerify: false,
					success: (res) => {
						console.log(res)
						if (res.data.code == 20100) {
							that.activityList = res.data.data.activityList
						}
					}
				})
			},
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
						if (that.code == 20100) {
							uni.getStorage({
								key: "corp",
								success: function(resCorp) {
									console.log(resCorp.data)
									that.corp = resCorp.data
									that.getActivity()
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
			goToActivityPage(aid,status){
				var that = this
				let page =""
				console.log(status)
				if(status != "未通过"){
					page = "detail"
				}else{
					page = "create"
				}
				uni.navigateTo({
					url:"/pages/activity/" + page + "?aid=" + aid,
				})
			}
		}
	}
</script>

<style lang="scss">
	.activity-View-Flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		position: relative;
		max-width: 690rpx;
		margin-left: 30rpx;

		.activity-List-View {
			height: 310rpx;
			min-height: 310rpx;
			width: 330rpx;
			min-width: 330rpx;
			max-width: 330rpx;
			margin-top: 40rpx;
			position: relative;
		}

		.activity-Status {
			font-size: 20rpx;
			text-align: center;
			line-height: 35rpx;
			height: 35rpx;
			width: 90rpx;
			min-width: 100rpx;
			top: 20rpx;
			left: 20rpx;
			border: 1rpx solid black;
			border-radius: 5rpx;
			background: rgba(255, 255, 255, 0.7);
			position: absolute;
		}

		.activity-Img {
			display: block;
			height: 200rpx;
			min-height: 200rpx;
			width: 320rpx;
			border-radius: 20rpx;

		}

		.activity-title {
			display: block;
			height: 35rpx;
			margin-top: 10rpx;
			font-size: 30rpx;
			line-height: 35rpx;
		}

		.activity-dateTime {
			display: block;
			height: 30rpx;
			margin-top: 20rpx;
			font-size: 25rpx;
			line-height: 30rpx;
			color: #ffaa00;
		}
	}
</style>

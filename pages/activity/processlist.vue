<template>
	<view>
		<view class="empty-View" v-if="activityList.length == 0">
			<text>暂无申请</text>
		</view>
		<view class="activity-View-Flex">
			<view class="activity-List-View" v-for="(item,index) in activityList" :key="index"
				@click="goToProcessPage(item.aid)">
				<image class="activity-Img" :src="item.aimage" mode="aspectFit">
					<text class="activity-Status">{{item.pstatus}}</text>
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
				uid: "",
				activityList: []
			};
		},
		onLoad(obj) {
			var that = this
			that.uid = obj.uid
		},
		onShow() {
			this.getActivity()
		},
		methods: {
			getActivity() {
				var that = this
				uni.request({
					url: that.base_url + "/activity/processlist",
					method: "POST",
					data: {
						uid: that.uid,
					},
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					sslVerify: false,
					success: (res) => {
						console.log(res)
						if (res.data.code == 20200) {
							that.activityList = res.data.data.activityList
						}
					}
				})
			},
			goToProcessPage(aid){
				var that = this
				uni.navigateTo({
					url:"/pages/activity/process?aid=" + aid +"&uid=" + that.uid,
				})
			}
		}
	}
</script>

<style lang="scss">
	.empty-View{
		height: 500rpx;
		width: 750rpx;
		text-align: center;
		line-height: 500rpx;
	}
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

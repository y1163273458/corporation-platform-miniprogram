<template>
	<view v-if="activity.aname != undefined">
		<view class="image-View">
			<text class="image-Text">活动封面：</text>
			<image mode="widthFix" class="image-Upload-HasImg" :src="activity.aimage"></image>
		</view>
		<view class="name-View">
			<text class="name-Text">活动名称：</text>
			<text>{{activity.aname}}</text>
		</view>
		<view class="comment-View">
			<text class="comment-Text">活动介绍：</text>
			<textarea class="comment-Textarea" disabled="true">{{activity.acomment}}</textarea>
		</view>
		<view class="aaddr-View">
			<text class="aaddr-Text">活动地点：</text>
			<text>{{activity.aaddr}}</text>
		</view>
		<view class="time-View">
			<!-- 开始报名时间 -->
			<view class="sstarttime-View">
				<text>开始报名时间：</text>
				<text>{{activity.sstarttime.substring(0,16).replace("T"," ") + " "}}</text>
			</view>
			<!-- 结束报名时间 -->
			<view class="sendtime-View">
				<text>结束报名时间：</text>
				<text>{{activity.sendtime.substring(0,16).replace("T"," ") + " "}}</text>
			</view>
			<!-- 开始时间 -->
			<view class="astarttime-View">
				<text>开始时间：</text>
				<text>{{activity.astarttime.substring(0,16).replace("T"," ") + " "}}</text>
			</view>
			<!-- 结束时间 -->
			<view class="aendtime-View">
				<text>结束时间：</text>
				<text>{{activity.aendtime.substring(0,16).replace("T"," ") + " "}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activity:{}
			};
		},
		onLoad: function(obj) {
			var that = this
			that.getActivityInfo(obj.aid)
			console.log(obj)
		},
		methods: {
			getActivityInfo(aid){
				var that = this
				uni.request({
					url: that.base_url + "/activity/getone",
					method: "POST",
					data: {
						aid: aid,
					},
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					sslVerify: false,
					success: (res) => {
						console.log(res)
						if (res.data.code == 20000) {
							that.activity = res.data.data.activity
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #e8e8e8;
	}

	.name-View {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 700rpx;
		height: 50rpx;
		padding: 20rpx 25rpx 20rpx 25rpx;
		border-bottom: 1rpx #999999 solid;
	}

	.name-Text {
		width: 200rpx;
		height: 50rpx;
		font-size: 35rpx;
		line-height: 50rpx;
	}

	.name-Input {
		width: 490rpx;
		height: 50rpx;
		font-size: 35rpx;
		line-height: 50rpx;
	}

	.image-View {
		padding: 20rpx 25rpx 20rpx 25rpx;
		border-bottom: 1rpx #999999 solid;
	}

	.image-Text {
		font-size: 35rpx;
	}

	.image-Upload-HasImg{
		max-width: 600rpx;
	}
	.comment-View {
		width: 700rpx;
		height: 340rpx;
		padding: 20rpx 25rpx 20rpx 25rpx;
		border-bottom: 1rpx #999999 solid;
	}

	.comment-Text {
		width: 170rpx;
		height: 50rpx;
		font-size: 35rpx;
		line-height: 50rpx;
	}

	.comment-Textarea {
		width: 700rpx;
		height: 250rpx;
		font-size: 35rpx;
		line-height: 50rpx;
		margin-top: 20rpx;
		padding: 10rpx;
		border: 2rpx #999999 solid;
	}

	.aaddr-View {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 700rpx;
		height: 50rpx;
		padding: 20rpx 25rpx 20rpx 25rpx;
		border-bottom: 1rpx #999999 solid;
	}

	.aaddr-Text {
		width: 200rpx;
		height: 50rpx;
		font-size: 35rpx;
		line-height: 50rpx;
	}

	.aaddr-Input {
		width: 490rpx;
		height: 50rpx;
		font-size: 35rpx;
		line-height: 50rpx;
	}
</style>

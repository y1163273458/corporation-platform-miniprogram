<template>
	<view>
		<view class="message-Box" v-for="(item,index) in messageContentList" :key="index">
			<view class="message-Box-Top">
				<text class="message-Sender">发送人：{{item.sender}}</text>
				<text class="message-Status">{{item.status}}</text>
			</view>
			<view class="message-Box-Center">
				<text class="message-Content">{{item.content}}</text>
			</view>
			<view class="message-Box-Bottom">
				<text class="message-Date">{{item.date}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageContentList:[{
					sender: "1号",
					date: "2023-4-7",
					status:"未读",
					content: "1号活动即将开始"
				}, {
					sender: "2号",
					date: "2023-4-7",
					status:"未读",
					content: "2号活动即将开始"
				}, {
					sender: "3号",
					date: "2023-4-7",
					status:"未读",
					content: "3号活动即将开始"
				}, {
					sender: "4号",
					date: "2023-4-7",
					status:"未读",
					content: "4号活动即将开始"
				}, {
					sender: "5号",
					date: "2023-4-7",
					status:"未读",
					content: "5号活动即将开始"
				}]
			};
		}
	}
</script>

<style lang="scss">
	.message-Box {
		width: 90%;
		height: 200rpx;
		margin-top: 5%;
		margin-left: 5%;
		border: 2rpx #000000 solid;
		border-radius: 15rpx;
		.message-Box-Top{
			display: flex;
			height: 50rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
			.message-Sender{
				width: 90%;
				font-size: 30rpx;
				line-height: 50rpx;
			}
			.message-Status{
				width: 10%;
				font-size: 20rpx;
				line-height: 50rpx;
				text-align: right;
			}
		}
		.message-Box-Center{
			height: 100rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
			.message-Content{
				font-size: 25rpx;
			}
		}
		.message-Box-Bottom{
			height: 50rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
			.message-Date{
				font-size: 20rpx;
				line-height: 50rpx;
			}
		}
	}
</style>

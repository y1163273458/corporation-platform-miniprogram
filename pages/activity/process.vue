<template>
	<view v-if="activity.aname != undefined">
		<view class="image-View">
			<text class="image-Text">活动封面：</text>
			<image mode="widthFix" class="image-Upload-HasImg" :src="activity.aimage"></image>
		</view>
		<view class="corpM-View">
			<text class="corpM-Text">负责人学号：</text>
			<text>{{activity.cmid}}</text>
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
			<!-- 同意按钮 -->
			<view class="aendtime-View">
				<u-button type="primary" @click="agree">同意</u-button>
			</view>
			<!-- 不同意按钮 -->
			<view class="aendtime-View">
				<u-button type="warning" @click="refuse">不同意</u-button>
			</view>
		</view>
		<modal v-if="areaShow" title="请输入理由" confirm-text="确认" cancel-text="取消" @cancel="cancelAdd"
			@confirm="confirmAdd">
			<input type="text" v-model="reason" placeholder="限填30个字" class="intxt" maxlength="30" />
		</modal>
			<u-modal :show="areaShow" showConfirmButton="true" showCancelButton="true" title="请输入理由" confirm-text="确定" cancel-text="取消" @cancel="cancelAdd"
				@confirm="reason.length>=8&reason.length<=30?confirmAdd(true):confirmAdd(false)">
				<input type="text" v-model="reason" placeholder="限填30个字" maxlength="30"/>
			</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: "",
				activity: {},
				areaShow:false,
				reason:'',
			};
		},
		onLoad(obj) {
			var that = this
			that.uid = obj.uid
			that.getActivityInfo(obj.aid)
		},
		methods: {
			cancelAdd() {
				this.areaShow = false
			},
			confirmAdd() {
				this.areaShow = false
				var that = this
				uni.request({
					url: that.base_url + "/activity/refuse",
					method: "GET",
					data: {
						aid: that.activity.aid,
						pid: that.uid,
						reason: that.reason
					},
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					sslVerify: false,
					success: (res) => {
						console.log(res)
						if (res.data.code == 20202) {
							uni.navigateBack()
						}
					}
				})
			},
			getActivityInfo(aid) {
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
			},
			agree() {
				var that = this
				uni.request({
					url: that.base_url + "/activity/agree",
					method: "POST",
					data: {
						aid: that.activity.aid,
						pid: that.uid,
						aname:that.activity.aname,
						cmid:that.activity.cmid
					},
					header: {
						'content-type': 'application/json;charset:utf-8'
					},
					sslVerify: false,
					success: (res) => {
						console.log(res)
						if (res.data.code == 20201) {
							uni.navigateBack()
						}
					}
				})
			},
			refuse() {
				this.areaShow = true
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #e8e8e8;
	}
	.corpM-View{
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 700rpx;
		height: 50rpx;
		padding: 20rpx 25rpx 20rpx 25rpx;
		border-bottom: 1rpx #999999 solid;
	}
	.corpM-Text {
		width: 250rpx;
		height: 50rpx;
		font-size: 35rpx;
		line-height: 50rpx;
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

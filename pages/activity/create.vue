<template>
	<view>
		<view class="name-View">
			<text class="name-Text">活动名称：</text>
			<input class="name-Input" placeholder="请输入活动名称" v-model="aname" />
		</view>
		<view class="image-View">
			<text class="image-Text">请放入活动封面：</text>
			<image mode="widthFix" :class="aimage.length>0?'image-Upload-HasImg':'image-Upload-NoImg'" @click="chooseImage" :src="aimage.length>0?aimage[0]:'/static/icon/upload.png'"></image>
		</view>
		<view class="comment-View">
			<text class="comment-Text">活动介绍：</text>
			<textarea class="comment-Textarea" placeholder="请输入活动介绍" v-model="acomment" />
		</view>
		<view class="aaddr-View">
			<text class="aaddr-Text">活动地点：</text>
			<input class="aaddr-Input" placeholder="请输入活动地点" v-model="aaddr" />
		</view>
		<view class="time-View">
			<!-- 开始报名时间 -->
			<view class="sstarttime-View" @click="showDatetimePicker('sstarttime')">
				<text>开始报名时间：</text>
				<text>{{result(sstarttime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="sstarttime" :show="sstarttimeShow" :minDate="nowsTime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel" @change="change" :formatter="formatter">
			</u-datetime-picker>
			<!-- 结束报名时间 -->
			<view class="sendtime-View" @click="showDatetimePicker('sendtime')">
				<text>结束报名时间：</text>
				<text>{{result(sendtime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="sendtime" :show="sendtimeShow" :minDate="nowsTime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel" :formatter="formatter">
			</u-datetime-picker>
			<!-- 开始时间 -->
			<view class="astarttime-View" @click="showDatetimePicker('astarttime')">
				<text>开始时间：</text>
				<text>{{result(astarttime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="astarttime" :show="astarttimeShow" :minDate="nowsTime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel" :formatter="formatter">
			</u-datetime-picker>
			<!-- 结束时间 -->
			<view class="aendtime-View" @click="showDatetimePicker('aendtime')">
				<text>结束时间：</text>
				<text>{{result(aendtime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="aendtime" :show="aendtimeShow" :minDate="nowsTime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel" :formatter="formatter">
			</u-datetime-picker>
		</view>
		<view class="commit-View">
			<button class="commit-Botton" :disabled="canCommit()" @click="commit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const d = new Date()
			const year = d.getFullYear()
			let month = uni.$u.padZero(d.getMonth() + 1)
			const date = d.getDate()
			return {
				prefix: "",
				aid: 0,
				cmid: 0,
				cid: 0,
				nowsTime: 0,
				sstarttimeShow: false,
				sstarttime: 0,
				sendtimeShow: false,
				sendtime: 0,
				astarttimeShow: false,
				astarttime: 0,
				aendtimeShow: false,
				aendtime: 0,
				aname: "",
				aimage: [],
				pstatus: "",
				astatus: "",
				acomment: "",
				aaddr: ""
			};
		},
		onLoad: function(obj) {
			var that = this
			that.cmid = obj.uid
			that.cid = obj.cid
			that.nowsTime = parseInt(Number(new Date()) / 10000) * 10000
			if (obj.aid != undefined) {
				that.aid = obj.aid
				that.getActivityInfo(that.aid)
			}
			console.log(that.nowsTime)
		},
		methods: {
			//添加图片
			chooseImage(){
				var that = this
				uni.chooseImage({
					count:1,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: that.base_url + '/activity/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'activityImage',
							formData: {
								'aid': that.aid
							},
							header:{
								"content-type":"multipart/form-data"
							},
							success: (uploadFileRes) => {
								console.log("=================")
								console.log(JSON.parse(uploadFileRes.data))
								setTimeout(function(){
									that.aimage = [JSON.parse(uploadFileRes.data).data.filePath]
								},2000)
								
								
							}
						});
					}
				});
			},
			showDatetimePicker(prefix) {
				this.prefix = prefix
				this[`${this.prefix}Show`] = true
			},
			cancel() {
				this[`${this.prefix}Show`] = false
			},
			confirm(e) {
				this[`${this.prefix}Show`] = false
				this[`${this.prefix}`] = e.value
				console.log(`${this.prefix}` + "--------" + "e--------" + e.value)
			},
			change(e) {
				console.log("change:" + "=" * 10 + e.value)
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			result(time) {
				const timeFormat = uni.$u.timeFormat
				return timeFormat(time, 'yyyy-mm-dd hh:MM')
			},
			canCommit() {
				var that = this
				if (parseInt(Number(new Date()) / 10000) * 10000 >= that.sstarttime || that.sstarttime >= that.sendtime ||
					that.sendtime >= that
					.astarttime || that.astarttime >= that.aendtime || that.aname.length == 0 || that.acomment.length ==
					0 || that.aaddr.length == 0) {
					return true
				} else {
					return false
				}
			},
			commit() {
				var that = this
				//创建一个新活动
				if (that.aid == 0) {
					uni.request({
						url: that.base_url + "/activity/create",
						method: "POST",
						data: {
							"cmid": that.cmid,
							"cid": that.cid,
							"sstarttime": that.result(that.sstarttime) + ":00",
							"sendtime": that.result(that.sendtime) + ":00",
							"astarttime": that.result(that.astarttime) + ":00",
							"aendtime": that.result(that.aendtime) + ":00",
							"aname": that.aname,
							"aimage": that.aimage.length == 0 ? '/static/swiper-img/1.jpg' : that.aimage[0],
							"acomment": that.acomment,
							"aaddr": that.acomment,
						},
						header: {
							'content-type': 'application/json;charset:utf-8'
						},
						sslVerify: false,
						success: (res) => {
							console.log(res)
							if (res.data.code == 20000) {
								uni.showToast({
									title: "创建成功",
									icon: "none",
									duration: 2000
								})
								uni.navigateBack()
							}
						}
					})
				//更改一个活动
				} else {
					uni.request({
						url: that.base_url + "/activity/create",
						method: "POST",
						data: {
							"aid": that.aid,
							"cmid": that.cmid,
							"cid": that.cid,
							"sstarttime": that.result(that.sstarttime) + ":00",
							"sendtime": that.result(that.sendtime) + ":00",
							"astarttime": that.result(that.astarttime) + ":00",
							"aendtime": that.result(that.aendtime) + ":00",
							"aname": that.aname,
							"aimage": that.aimage.length == 0 ? '/static/swiper-img/1.jpg' : that.aimage[0],
							"acomment": that.acomment,
							"aaddr": that.acomment,
						},
						header: {
							'content-type': 'application/json;charset:utf-8'
						},
						sslVerify: false,
						success: (res) => {
							console.log(res)
							if (res.data.code == 20000) {
								uni.showToast({
									title: "创建成功",
									icon: "none",
									duration: 2000
								})
								uni.navigateBack()
							}
						}
					})
				}
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
							that.setActivity(res.data.data.activity)
						}
					}
				})
			},
			setActivity(activity) {
				var that = this
				that.aid = activity.aid
				that.cmid = activity.cmid
				that.cid = activity.cid
				that.sstarttime = Number(new Date(activity.sstarttime))
				that.sendtime = Number(new Date(activity.sendtime))
				that.astarttime = Number(new Date(activity.astarttime))
				that.aendtime = Number(new Date(activity.aendtime))
				that.aname = activity.aname
				that.aimage = activity.aimage
				that.pstatus = activity.pstatus
				that.astatus = activity.astatus
				that.acomment = activity.acomment
				that.aaddr = activity.aaddr
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
		display: flex;
		flex-direction: column;
		padding: 20rpx 25rpx 20rpx 25rpx;
		border-bottom: 1rpx #999999 solid;
	}

	.image-Text {
		font-size: 35rpx;
	}
	.image-Upload-HasImg{
		max-width: 600rpx;
	}
	.image-Upload-NoImg{
		max-height: 200rpx;
		max-width: 200rpx;
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

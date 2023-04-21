<template>
	<view>
		<view class="name-View">
			<text class="name-Text">活动名称：</text>
			<input class="name-Input" placeholder="请输入活动名称" v-model="aname" />
		</view>
		<view class="image-View">
			<text class="image-Text">请放入活动封面：</text>
		</view>
		<view class="comment-View">
			<text class="comment-Text">活动介绍：</text>
			<textarea class="comment-Textarea" placeholder="请输入活动介绍" v-model="acomment" />
		</view>
		<view class="aaddr-View">
			<text class="aaddr-Text">活动地点：</text>
			<input class="aaddr-Input" placeholder="请输入活动地点" />
		</view>
		<view class="time-View">
			<!-- 开始报名时间 -->
			<view class="sstarttime-View" @click="showDatetimePicker('sstarttime')">
				<text>开始报名时间：</text>
				<text>{{result(sstarttime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="sstarttime" :show="sstarttimeShow" :minDate="nowsTime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel('sstarttime')" :formatter="formatter">
			</u-datetime-picker>
			<!-- 结束报名时间 -->
			<view class="sendtime-View" @click="showDatetimePicker('sendtime')">
				<text>结束报名时间：</text>
				<text>{{result(sendtime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="sendtime" :show="sendtimeShow" :minDate="sstarttime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel('sendtime')" :formatter="formatter">
			</u-datetime-picker>
			<!-- 开始时间 -->
			<view class="astarttime-View" @click="showDatetimePicker('astarttime')">
				<text>开始时间：</text>
				<text>{{result(astarttime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="astarttime" :show="astarttimeShow" :minDate="sendtime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel('astarttime')" :formatter="formatter">
			</u-datetime-picker>
			<!-- 结束时间 -->
			<view class="aendtime-View" @click="showDatetimePicker('aendtime')">
				<text>结束时间：</text>
				<text>{{result(aendtime)}}</text>
			</view>
			<u-datetime-picker mode="datetime" v-model="aendtime" :show="aendtimeShow" :minDate="astarttime"
				confirmColor="#ff6699" @confirm="confirm" @cancel="cancel('aendtime')" :formatter="formatter">
			</u-datetime-picker>
		</view>
		<view class="commit-View">
			<button class="commit-Botton" :disabled="canCommit()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prefix: "",
				cmid: 0,
				cid: 0,
				nowsTime: Number(new Date()),
				sstarttimeShow: false,
				sstarttime: Number(new Date()),
				sendtimeShow: false,
				sendtime: Number(new Date()),
				astarttimeShow: false,
				astarttime: Number(new Date()),
				aendtimeShow: false,
				aendtime: Number(new Date()),
				aname: "",
				aimage: "",
				pstatus: "",
				astatus: "",
				acomment: "",
				aaddr: "",
			};
		},
		onLoad: function(obj) {
			var that = this
			that.cmid = obj.uid
			that.cid = obj.cid
			console.log(obj)
		},
		methods: {
			showDatetimePicker(prefix) {
				this.prefix = prefix
				this[`${this.prefix}Show`] = true
			},
			cancel(prefix) {
				this[`${this.prefix}Show`] = false
			},
			confirm(e) {
				if (this.prefix == "sstarttime" & e.value <= Number(new Date())) {
					uni.showToast({
						title: "开始报名时间不应小于当前时间",
						icon: "none",
						duration: 2000,
					})
				}else{
					this[`${this.prefix}Show`] = false
					this[`${this.prefix}`] = e.value
					console.log(`${this.prefix}` + "--------" + "e--------" + e.value)
				}
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
				return timeFormat(time, 'yyyy-mm-dd hh:MM:ss')
			},
			canCommit() {
				var that = this
				if (this.sstarttime >= this.sendtime || this.sendtime >= this.astarttime || this.astarttime >= this
					.aendtime) {
					return true
				} else {
					return false
				}
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

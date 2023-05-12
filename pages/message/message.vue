<template>
	<view>
		<view class="switch-View">
			<u-subsection :list="switchList" mode="subsection" :current="curindex" @change="sectionChange"
				fontSize="28rpx" activeColor="#ffaaaa" bold="false" />
		</view>
		<view>
			<scroll-view class="scroll-View" scroll-y="true" :style="{'height': scrollHeight *2 + 'rpx'}">
				<view :class="item.nstatus=='未读'?'message-Box-Not-Read':'message-Box-Read'" v-if="showWhat(curindex,item.nstatus)"
					v-for="(item,index) in messageContentList" :key="index" @click="goToDetail(item.nid)">
					<view class="message-Box-Top">
						<text class="message-Sender">发送人：{{item.suname}}</text>
						<text class="message-Status" v-show="item.nstatus=='未读'"></text>
					</view>
					<view :class="item.nstatus=='未读'?'message-Box-Center-Not-Read':'message-Box-Center-Read'">
						<text class="message-Content">{{item.ncontent}}</text>
					</view>
					<view class="message-Box-Bottom">
						<text class="message-Date">{{item.createTime.substring(0,10)}}</text>
					</view>
				</view>
			</scroll-view>
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
				uid: "0",
				messageContentList: [],
				switchList: ["全部", "未读", "已读"],
				curindex: 0,
				scrollHeight: 0
			};
		},
		onShow() {
			// 加载界面时获取消息
			this.getMessage()
		},
		onLoad() {
			
			var that = this
			uni.getSystemInfo({
				success: (res) => {
					that.scrollHeight = res.windowHeight - 30;
					console.log(that.scrollHeight)
				}
			})
		},
		methods: {
			showWhat(type,status){
				if(type == 0){
					return true
				}else if(type == 1){
					if(status=="未读"){
						return true
					}
					else{
						return false
					}
				}else{
					if(status=="已读"){
						return true
					}
					else{
						return false
					}
				}
					
			},
			sectionChange(index) {
				this.curindex = index;
			},
			// 获取完整的Notice消息
			getMessage() {
				var that = this
				that.messageContentList = []
				uni.getStorage({
					key: "user",
					success: function(resStorage) {
						console.log(resStorage.data.uid)
						that.uid = resStorage.data.uid
						uni.request({
							url: that.base_url + "/notice/load",
							method: "POST",
							data: {
								uid: that.uid
							},
							header: {
								'content-type': 'application/json;charset:utf-8'
							},
							sslVerify: false,
							success: (res) => {
								if (res.data.code == 20000) {
									that.messageContentList = res.data.data
								}
							}
						})
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			goToDetail(nid) {
				var that = this
				uni.navigateTo({
					url: "/pages/message/detail?nid=" + nid,
					events: {
						someEvent: function(res) {
								console.log(res.data)
								console.log(res.data == "successOpen")
							if(res.data == "successOpen"){
								that.getMessage()
							}
						}
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-View {}

	.switch-View {
		// height: 30rpx;
		width: 100%;
		bottom: 0rpx;
	}

	.message-Box-Not-Read {
		width: 680rpx;
		height: 250rpx;
		margin-top: 35rpx;
		margin-left: 35rpx;
		border-radius: 15rpx;
		border: 2rpx #ff6699 solid;
		background-color: #fff4f4;
	}

	.message-Box-Read {
		width: 680rpx;
		height: 250rpx;
		margin-top: 35rpx;
		margin-left: 35rpx;
		border-radius: 15rpx;
		border: 2rpx #a5a5a5 solid;
		background-color: #e5e5e5;
		color: #a5a5a5;
	}

	.message-Box-Top {
		display: flex;
		height: 50rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 10rpx;

		.message-Sender {
			width: 630rpx;
			font-size: 30rpx;
			line-height: 40rpx;
		}

		.message-Status {
			width: 20rpx;
			height: 20rpx;
			margin-top: 10rpx;
			background-color: red;
			border-radius: 10rpx;
		}
	}

	.message-Box-Center-Not-Read {
		height: 140rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		border-top: 2rpx #ff6699 solid;
	}

	.message-Box-Center-Read {
		height: 140rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		border-top: 2rpx #a5a5a5 solid;
	}

	.message-Content {
		font-size: 30rpx;
	}

	.message-Box-Bottom {
		height: 50rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;

		.message-Date {
			font-size: 20rpx;
			line-height: 50rpx;
		}
	}
</style>

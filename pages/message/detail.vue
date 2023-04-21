<template>
	<view>
		<view class="body-View">
			<view class="top-View">
				<view class="sender-View">{{notice.suname}}</view>
				<view class="status-View" v-show="notice.nstatus == '已读'">{{notice.nstatus}}</view>
			</view>
			<view class="time-View" v-if="isEmpty()">
				<text>发送时间：</text>
				{{notice.createTime.replace(new RegExp("T","g")," ")}}
			</view>
			<view class="content-View">
				<text selectable="true">
					{{notice.ncontent}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import empty from '../../uni_modules/uview-ui/libs/config/props/empty';
	export default {
		data() {
			return {
				nid: 0,
				notice: {}
			};
		},
		onLoad: function(obj) {
			uni.showLoading({
				title: "加载中..",
				mask: true
			})
			var that = this
			console.log(obj.nid)
			that.nid = obj.nid
			that.getDetail()

		},
		methods: {
			isEmpty() {
				var that = this
				return that.notice.createTime != undefined
			},
			async getDetail() {
				var that = this
				await uni.request({
					url: that.base_url + "/notice/detail",
					method: 'POST',
					data: {
						nid: that.nid
					},
					success: (res) => {
						that.notice = res.data.data.notice;
						const eventChannel = this.getOpenerEventChannel();
						eventChannel.emit('someEvent', {
							data: 'successOpen'
						});
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #e5e5e5;
	}

	.body-View {}

	.top-View {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 60rpx;
		line-height: 60rpx;
		padding: 20rpx 0rpx 20rpx 20rpx;
	}
	.status-View{
		width: 100rpx;
		text-align: center;
		border-left: 2rpx #000000 solid
	}
	.time-View{
		height: 80rpx;
		text-align: right;
		line-height: 60rpx;
	}
	.content-View {
		font-size: 35rpx;
		line-height: 50rpx;
		padding: 20rpx 20rpx 20rpx 20rpx;
		border-top: 2rpx #000000 solid;
		border-bottom: 2rpx #000000 solid;
		min-height: 800rpx;
	}
</style>

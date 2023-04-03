<template>
	<view>
		<u-list>
			<!-- 搜索框 -->
			<view class="search-Box-View">
				搜索框占位
			</view>
			<view class="swiper-View">
				<u-swiper :list="swiperList" indicator="true" indicatorMode="dot" circular="true" radius="true"
					previousMargin="70rpx" nextMargin="70rpx"></u-swiper>
			</view>
			<view>
				<view class="infoPage-View-Flex">
					<view class="infoPage-View" v-for="(item,index) in infoPageList" :key="index">
						<image class="infoPage-img" :src="item.img_url" mode="aspectFit"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<!-- 此处为校内活动段落 -->
			<view class="section-Title-View">
				热门活动
			</view>
			<view class="activity-View-Flex">
				<view class="activity-List-View" v-for="(item,index) in activityList" :key="index">
					<image class="activity-Img" :src="item.img_url" mode="aspectFit">
						<text class="activity-Status">{{item.status}}</text>
					</image>
					<text class="activity-title">{{item.title}}</text>
					<text class="activity-dateTime">{{item.date_Time}}</text>
					<text class="activity-type">{{item.type}}</text>
				</view>
			</view>
		</u-list>
	</view>
</template>

<script>
	import {
		methods
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				swiperList: [
					"/static/swiper-img/1.jpg",
					"/static/swiper-img/2.png",
					"/static/swiper-img/3.jpeg",
					"/static/swiper-img/4.png"
				],
				infoPageList: [{
					title: "最新资讯",
					url: "",
					img_url: "/static/infoPage-img/news.png"
				}, {
					title: "院校活动",
					url: "",
					img_url: "/static/infoPage-img/activity-info.png"
				}, {
					title: "热门活动",
					url: "",
					img_url: "/static/infoPage-img/hot.png"
				}, {
					title: "院校活动",
					url: "",
					img_url: "/static/infoPage-img/activity-info.png"
				}],
				activityList: [{
					title: "活动1",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/1.jpg"
				}, {
					title: "活动2",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/2.png"
				}, {
					title: "活动3",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/3.jpeg"
				}, {
					title: "活动4",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/4.png"
				}, {
					title: "活动1",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/1.jpg"
				}, {
					title: "活动2",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/2.png"
				}, {
					title: "活动3",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/3.jpeg"
				}, {
					title: "活动4",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/4.png"
				}, {
					title: "活动1",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					url: "#",
					img_url: "/static/swiper-img/1.jpg"
				}, {
					title: "活动2",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/2.png"
				}, {
					title: "活动3",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/3.jpeg"
				}, {
					title: "活动4",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "#",
					img_url: "/static/swiper-img/4.png"
				}]
			};
		}
	}
</script>

<style lang="scss">
	.search-Box-View {
		height: 100rpx;
		width: 750rpx;
		margin-top: 25rpx;
		border: 1px solid red;
		text-align: center;
		line-height: 100rpx;
	}

	.swiper-View {
		margin-top: 20rpx;
	}

	.infoPage-View-Flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 60rpx;

		.infoPage-View {
			height: 180rpx;
			width: 150rpx;
			margin-left: 15rpx;
			text-align: center;
		}

		.infoPage-img {
			display: block;
			height: 120rpx;
			width: 120rpx;
			margin-left: 15rpx;
		}
	}

	.section-Title-View {
		font-size: 40rpx;
		font-weight: bold;
		margin-top: 40rpx;
	}

	.activity-View-Flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-left: 10rpx;
		position: relative;

		.activity-List-View {
			height: 300rpx;
			min-height: 300rpx;
			width: 330rpx;
			min-width: 330rpx;
			margin-top: 40rpx;
			margin-left: 10px;
			margin-left: 10px;
			margin-right: 10px;
			position: relative;
		}

		.activity-Status {
			font-size: 20rpx;
			text-align: center;
			line-height: 30rpx;
			height: 30rpx;
			width: 100rpx;
			min-width: 100rpx;
			top: 20rpx;
			left: 20rpx;
			border: 1rpx solid black ;
			border-radius: 5rpx;
			background: rgba(255, 255, 255, 0.7);
			position: absolute;
		}

		.activity-Img {
			display: block;
			height: 200rpx;
			min-height: 200rpx;
			width: 330rpx;
			margin-left: 10rpx;
			border-radius: 20rpx;

		}

		.activity-title {
			display: block;
			font-size: 25rpx;
			line-height: 25rpx;
			height: 30rpx;
			margin-left: 10rpx;
		}

		.activity-dateTime {
			display: block;
			font-size: 20rpx;
			line-height: 20rpx;
			height: 30rpx;
			margin-left: 10rpx;
		}

		.activity-type {
			display: block;
			font-size: 23rpx;
			line-height: 23rpx;
			height: 25rpx;
			margin-left: 10rpx;
		}
	}
</style>

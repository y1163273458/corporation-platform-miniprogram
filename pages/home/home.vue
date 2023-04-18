<template>
	<view>
		<u-list class="uList">
			<!-- 搜索框 -->
			<view class="search-Box-View">
				搜索框占位
			</view>
			<view class="swiper-View">
				<u-swiper :list="swiperList" keyName="img" indicator="true" indicatorMode="dot" circular="true"
					radius="true" previousMargin="70rpx" nextMargin="70rpx" @click="goToSwiperPage"
					@change="swiperChange"></u-swiper>
			</view>
			<view>
				<view class="infoPage-View-Flex">
					<view class="infoPage-View" v-for="(item,index) in infoPageList" :key="index">
						<image class="infoPage-img" :src="item.img_url" mode="aspectFit"
							@click="goToInfoPage(item.url)"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<!-- 此处为最新活动段落 -->
			<view class="section-Title-View">最新活动</view>
			<view class="activity-View-Flex">
				<view class="activity-List-View" v-for="(item,index) in activityList" :key="index"
					@click="goToActivityPage(item.url)">
					<image class="activity-Img" :src="item.img_url" mode="aspectFit">
						<text class="activity-Status">{{item.status}}</text>
					</image>
					<text class="activity-title">{{item.title}}</text>
					<text class="activity-dateTime">{{item.date_Time}}</text>
					<text class="activity-type">{{item.type}}</text>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</u-list>
	</view>
</template>

<script>
	import link from '../../uni_modules/uview-ui/libs/config/props/link';
	import {
		methods
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				swiperList: [{
						img: "/static/swiper-img/1.jpg",
						url: "swiperPage1"
					},
					{
						img: "/static/swiper-img/2.png",
						url: "swiperPage2"
					},
					{
						img: "/static/swiper-img/3.jpg",
						url: "swiperPage3"
					},
					{
						img: "/static/swiper-img/4.png",
						url: "swiperPage4"
					}
				],
				swiperIndex: 0,
				infoPageList: [{
					title: "最新资讯",
					url: "infoPage1",
					img_url: "/static/infoPage-img/news.png"
				}, {
					title: "院校活动",
					url: "infoPage2",
					img_url: "/static/infoPage-img/activity-info.png"
				}, {
					title: "热门活动",
					url: "infoPage3",
					img_url: "/static/infoPage-img/hot.png"
				}, {
					title: "探索",
					url: "infoPage4",
					img_url: "/static/infoPage-img/explore.png"
				}],
				activityList: [{
					title: "活动1",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动1",
					img_url: "/static/swiper-img/1.jpg"
				}, {
					title: "活动2",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动2",
					img_url: "/static/swiper-img/2.png"
				}, {
					title: "活动3",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动3",
					img_url: "/static/swiper-img/3.jpg"
				}, {
					title: "活动4",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动4",
					img_url: "/static/swiper-img/4.png"
				}, {
					title: "活动1",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动1",
					img_url: "/static/swiper-img/1.jpg"
				}, {
					title: "活动2",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动2",
					img_url: "/static/swiper-img/2.png"
				}, {
					title: "活动3",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动3",
					img_url: "/static/swiper-img/3.jpg"
				}, {
					title: "活动4",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动4",
					img_url: "/static/swiper-img/4.png"
				}, {
					title: "活动1",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动1",
					img_url: "/static/swiper-img/1.jpg"
				}, {
					title: "活动2",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动2",
					img_url: "/static/swiper-img/2.png"
				}, {
					title: "活动3",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动3",
					img_url: "/static/swiper-img/3.jpg"
				}, {
					title: "活动4",
					date_Time: "0000.00.00 - 0000.00.00",
					type: "文体",
					status: "报名中",
					url: "活动4",
					img_url: "/static/swiper-img/4.png"
				}]
			};
		},
		methods: {
			// 点击轮播图时的页面跳转函数
			goToSwiperPage() {
				const page_url = this.swiperList[this.swiperIndex].url;
				console.log("goToSwiperPage" + this.swiperList[this.swiperIndex].url);
				uni.navigateTo({
					url: page_url,
					success: (res) => {
						console.log("前往失败")
					},
					fail: (res) => {
						console.log("前往失败")
					}
				})
			},
			swiperChange(e) {
				this.swiperIndex = e.current
				console.log(this.swiperIndex)
			},
			goToInfoPage(page_url) {
				console.log("goToInfoPage" + page_url);
				uni.navigateTo({
					url: page_url,
					success: (res) => {
						console.log("前往失败")
					},
					fail: (res) => {
						console.log("前往失败")
					}
				})
			},
			goToActivityPage(page_url) {
				console.log("goToActivityPage" + page_url);
				uni.navigateTo({
					url: page_url,
					success: (res) => {
						console.log("前往失败")
					},
					fail: (res) => {
						console.log("前往失败")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-Box-View {
		height: 100rpx;
		width: 750rpx;
		margin-top: 35rpx;
		margin-bottom: 35rpx;
		border: 1px solid red;
		text-align: center;
		line-height: 100rpx;
		position: relative;
		background: white;
	}

	.uList {
		position: relative;
		margin-top: 170rpx;
		padding-bottom: 200rpx;
	}

	.swiper-View {
		margin-top: 20rpx;
	}

	.infoPage-View-Flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 40rpx;

		.infoPage-View {
			height: 180rpx;
			width: 149rpx;
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
		margin-left: 30rpx;
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
			height: 300rpx;
			min-height: 300rpx;
			width: 330rpx;
			min-width: 330rpx;
			max-width: 330rpx;
			margin-top: 40rpx;
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
			font-size: 25rpx;
			line-height: 25rpx;
			height: 30rpx;
		}

		.activity-dateTime {
			display: block;
			font-size: 20rpx;
			line-height: 20rpx;
			height: 30rpx;
		}

		.activity-type {
			display: block;
			font-size: 23rpx;
			line-height: 23rpx;
			height: 25rpx;
		}
	}
	.savepadding{
	    padding-bottom: constant(safe-area-inset-bottom);  
	    padding-bottom: env(safe-area-inset-bottom); 
	    box-sizing: content-box;
	}
</style>

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
					@click="goToActivityPage(item.aid)">
					<image class="activity-Img" :src="item.aimage" mode="aspectFit">
						<text class="activity-Status">{{item.astatus}}</text>
					</image>
					<text class="activity-title">{{item.aname.length>11?item.aname.substring(0,11)+'..':item.aname}}</text>
					<text class="activity-dateTime">
						{{item.astarttime.substring(0,10).replace(new RegExp("-","g"),".") + " "}}-{{" " + item.aendtime.substring(0,10).replace(new RegExp("-","g"),".")}}
					</text>
				</view>
			</view>
			<view class="bottom-View">
				到底啦！！！
			</view>
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
				activityList: []
			};
		},
		onLoad() {
			var that = this
			uni.request({
				url: that.base_url + "/activity/some",
				method: "POST",
				header: {
					'content-type': 'application/json;charset:utf-8'
				},
				sslVerify: false,
				success: (res) => {
					if (res.data.code == 20000) {
						that.activityList = res.data.data
					}
				}
			})
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
			// 跳转至活动详情页
			goToActivityPage(aid) {
				console.log("goToActivityPage" + aid);
				uni.navigateTo({
					url: aid,
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

	.bottom-View {
		min-height: 150rpx;
		font-size: 35rpx;
		line-height: 150rpx;
		text-align: center;
		color: #cbc4d4;
	}
</style>

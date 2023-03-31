<template>
	<view>
		<u-list>
			<view>
				<u-swiper :list="swiperList" indicator="true" indicatorMode="dot" circular="true" radius="true"
					previousMargin="70rpx" nextMargin="70rpx"></u-swiper>
			</view>
			<view>
				<view>
					<image></image>
					<text></text>
				</view>
				<view></view>
				<view></view>
				<view></view>
			</view>
			<view class="viewFlex">
				<u-list-item class="listItem" v-for="(item,index) in itemList" :key="index">
					<image class="listItem.imgItem" :src="item" mode="aspectFit"></image>
				</u-list-item>
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
				itemList: [
					"/static/swiper-img/1.jpg",
					"/static/swiper-img/2.png",
					"/static/swiper-img/3.jpeg",
					"/static/swiper-img/4.png",
					"/static/swiper-img/1.jpg",
					"/static/swiper-img/2.png",
					"/static/swiper-img/3.jpeg",
					"/static/swiper-img/4.png",
					"/static/swiper-img/1.jpg",
					"/static/swiper-img/2.png",
					"/static/swiper-img/3.jpeg",
					"/static/swiper-img/4.png",
					"/static/swiper-img/1.jpg",
					"/static/swiper-img/2.png",
					"/static/swiper-img/3.jpeg",
					"/static/swiper-img/4.png",
					"/static/swiper-img/1.jpg",
					"/static/swiper-img/2.png",
					"/static/swiper-img/3.jpeg",
					"/static/swiper-img/4.png"
				]
			};
		}
	}
</script>

<style lang="scss">
	.viewFlex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.listItem {
		height: 400rpx;
		min-height: 400rpx;
		width: 330rpx;
		min-width: 330rpx;
		margin-top: 50rpx;
		margin-left: 10px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.imgItem {
		height: 200rpx;
		min-height: 200rpx;
		width: 330rpx;
	}
</style>

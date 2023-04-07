<template>
	<view>
		<view>
			<!-- 用户信息 -->
			<view class="info-View">
				<u-avatar id="headImg-Avatar" :src="myDate.headImg" shape="circle" size="150rpx"></u-avatar>
				<view class="textInfo-view">
					<view id="myName-View">
						<text>{{myDate.name}}</text>
					</view>
					<view id="myCollege-View">
						<text>{{myDate.college}}</text>
					</view>
					<view id="myClass-View">
						<text>{{myDate.class}}</text>
					</view>
				</view>	
			</view>
			<view class></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myDate:{
					headImg:"/static/head-img/DiDi.jpg",
					name:"万象收萝",
					college:"网络与信息安全学院",
					class:"网工191"
				}
			};
		}
	}
</script>

<style lang="scss">
	.info-View{
		display: flex;
		// border: 2rpx black solid;
		width: 600rpx;
		height: 150rpx;
		margin-top: 70rpx;
		margin-left: 10%;
		border-radius: 10rpx;
		
		#headImg-Avatar{
		}
		.textInfo-view{
			height: 100%;
			#myName-View{
				color: #ff6699;
				margin-left: 50rpx;
				font-size: 30rpx;
				// font-weight: bolder;
				line-height: 50rpx;
			}
			#myCollege-View{
				color: #c8c8c8;
				margin-left: 50rpx;
				font-size: 25rpx;
				// font-weight: bolder;
				line-height: 50rpx;
			}
			#myClass-View{
				color: #c8c8c8;
				margin-left: 50rpx;
				font-size: 25rpx;
				// font-weight: bolder;
				line-height: 30rpx;
			}
		}
	}
</style>

<template>
	<view>
		<view class="user-View">
			<text class="useID-View">需要更改密码的用户ID</text>
			<input type="text" class="useID-Input"/>
			<text class="usePassword-View">新密码</text>
			<input type="text" class="usePassword-Input"/>
			<button class="confirm-Button" @click="confirmChange()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			confirmChange(){
				uni.showToast({
					title:"修改成功",
					duration:2000,
					icon:'none'
				})
			}
		}
	}
</script>
<style lang="scss">
	.user-View{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 30rpx;
	}
	.useID-View{
		margin-top: 30rpx;
	}
	.usePassword-View{
		margin-top: 30rpx;
	}
	.useID-Input{
		margin-top: 30rpx;
		border: 1px solid #ff6699;
	}
	.usePassword-Input{
		margin-top: 30rpx;
		border: 1px solid #ff6699;
	}
	.confirm-Button{
		width: 400rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		margin-top: 200rpx;
		background-color: #ff6699;
	}
</style>

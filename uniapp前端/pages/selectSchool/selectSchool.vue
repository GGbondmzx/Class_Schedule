<template>
	<view>
		<view class="school_list">
			<view class="school_item" v-for="(item,index) in schoolList" :key="index" @click="item.ways==1?goToSelectWay(item.id):stopJump()">
				<view class="left">
					<view>
						<image src="../../static/select_icon.png" mode="aspectFill"
							style="width: 27rpx;height: 34rpx;margin-left: 70rpx;margin-top: 45rpx;"></image>
						<text
							style="margin-top: 37rpx;margin-left: 21rpx;font-size: 32rpx;color: #fff;">{{item.name}}</text>

					</view>
					<view>
						<text
							style="margin-left: 111rpx;margin-top: 97rpx;font-size: 18rpx;color: #fff;">{{item.nickname}}</text>
					</view>
				</view>
				<view class="right">
					<image :src="item.ways==1?isOkUrl.is:isOkUrl.onOk" mode="aspectFill"
						style="width: 19rpx;height: 19rpx;"></image>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOkUrl: {
					is: "../../static/isOk.png",
					onOk: "../../static/noOk.png"
				},
				schoolList: [
				]

			}
		},
		methods: {
			goToSelectWay(number){
				uni.navigateTo({
					url: '../selectway/selectway?number=' + number
				})
			},
			goToImport(number) {
				uni.navigateTo({
					url: '../import/import?number=' + number
				})
			},
			stopJump() {
				uni.showToast({
					title: '该学校正在测试阶段！',
					icon: "error",
				})
			}

		},
		onLoad() {
			let that = this
			uni.getStorage({
				key:"school_list",
				success(res) {
					console.log(res)
					that.schoolList=res.data
				}
			})
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}

	.school_list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
		font-size: 22rpx;

		.school_item {
			margin-top: 31rpx;
			width: 692rpx;
			height: 156rpx;
			background-color: #59ADFB;
			border-radius: 16rpx;
			display: flex;
			flex-direction: row;

			.left {
				width: 576rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
			}

			.right {
				width: 116rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>

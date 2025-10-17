<template>
	<view style="width: 100%;height: 100%;
    overflow: hidden;">
		<view>
			<view class="header">
				<image :src="applogo"
					style="width: 132rpx;height: 130rpx;margin-left: 168.73rpx;margin-top: 32rpx;border-radius: 100%;" mode='scaleToFill'>
				</image>
				<view class="statu">
					<text
						style="margin-top: 50rpx;font-size: 32rpx;font-family: Microsoft YaHei;margin-left: 20rpx;">{{school}}</text>
					<text style="margin-top: 8rpx;font-size: 24rpx;margin-left: 20rpx;">{{appname}}-大学生助手</text>
				</view>
			</view>
			<view class="body">
				<view class="import">
					<view class="text">
						<text>身份选择</text>
					</view>
					<view class="select_from">
						<view class="s_item" @click="jumpTo('selectSchool')">
							<image src="../../static/oldstudent.png" style="height: 75rpx;width: 62.62rpx;"></image>
							<text style="font-size: 27rpx;padding-top: 10rpx;">在校生入口</text>
							<text style="font-size: 23rpx;padding-top: 10rpx;">导入个人课表</text>
						</view>
					</view>
				</view>
				<view class="guodu">

				</view>
				<view class="text">
					<text>全部功能</text>
				</view>
				<view class="all">
					<view class="all_item" @click="jumpTo('selectSchool')">
						<image class="img_left" src="../../static/gn1.png" style="width: 36rpx;height: 36rpx;">
						</image>
						<text>更新课表</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
					</view>
					<view class="line">

					</view>
					<view class="all_item" @click="jumpTo('localclass')">
						<image class="img_left" src="../../static/gn5.png" style="width: 26rpx;height: 31rpx;">
						</image>
						<text>课程管理</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
					</view>
					<view class="line">
					
					</view>
					<view class="all_item" @click="goToPush()">
						<image class="img_left" src="../../static/gn2.png" style="width: 32rpx;height: 31rpx;">
						</image>
						<text>课表推送</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
<!-- 						<switch style="position: absolute;right: 30rpx;transform:scale(0.8)" @change="switchChange"
							:checked="checked" /> -->
					</view>
					<view class="line">

					</view>
					<view class="all_item" @click="unOk">
						<image class="img_left" src="../../static/gn4.png" style="width: 31rpx;height: 31rpx;">
						</image>
						<text>成绩查询</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
					</view>
					<view class="line">

					</view>

					<view class="all_item">
						<image class="img_left" src="../../static/gn3.png" style="width: 33rpx;height: 29rpx;">
						</image>
						<text>校历作息</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
					</view>
					<view class="guodu">

					</view>
					<view class="other"
						style="font-size: 27rpx;font-weight: bold;width: 750rpx;height:36rpx;padding-top: 19rpx;">
						<text style="position: absolute;left: 33rpx;">其他</text>
					</view>
					<view class="all_item" @click="jumpTo('shouze')">
						<image class="img_left" src="../../static/shouze.png" style="width: 36.87rpx;height: 39.27rpx;">
						</image>
						<text>用户协议</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
					</view>
					<view class="line">

					</view>
					<button open-type="share" class="all_item">
						<image class="img_left" src="../../static/share.png" style="width: 36.87rpx;height: 39.27rpx;">
						</image>
						<text style="font-size: 27rpx;">分享给好友</text>
						<image class="img_next" src="../../static/next.png" style="width: 9.25rpx;height: 15.86rpx;">
						</image>
					</button>
				</view>
				<!-- 			<view class="bodyitem" @click="gotoImport()">
					<text>导入课表</text>				
				</view> -->
			</view>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				appname:"",
				applogo:"",
				checked: false,
				school: "未选择学校",
				schoolList: []


			}
		},
		methods: {
			goToPush(){
				uni.getStorage({
					key:"school_id",
					success(res) {
						uni.navigateTo({
							url:"/pages/push/push"
						})
					},
					fail(error) {
						uni.showModal({
							title: '提示',
							content: '您还未导入课表,是否立即前往?',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url:"/pages/selectSchool/selectSchool"
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				})
			},
			unOk(){
				uni.showToast({
					title:'暂未开放！' ,
					icon: "error"
				})
			},
			openPush() {
				let that = this
				uni.getStorage({
					key: 'token',
					success(res) {
						that.$http({
							url: 'openPush',
							method: 'POST',
							data: {
								token: res.data
							}
						}).then(res1 => {
							uni.showToast({
								title: '订阅成功！',
								icon: "success"
							})
						}).catch(res2 => {
							uni.showToast({
								title: '订阅成功！',
								icon: "success"
							})
						})
					}
				})
			},
			wxshare() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用盐小助微信小程序，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			},
			gotoImport() {
				uni.navigateTo({
					url: '../import/import'
				})
			},
			jumpTo(url) {
				uni.navigateTo({
					url: '../' + url + '/' + url
				})
			}

		},
		onLoad() {
			let that = this
			uni.getStorage({
				key:"setting",
				success(res) {
					that.appname=res.data.appname
					that.applogo=res.data.applogo
				}
			})
			uni.getStorage({
				key:"school_list",
				success(res) {
					that.schoolList=res.data
				}
			})
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"]
			})

		},
		onShow() {
			let that = this
			uni.getStorage({
				key:"school_list",
				success(res) {
					that.schoolList=res.data
					uni.getStorage({
						key: "school_id",
						success(res) {
							that.school = that.schoolList[res.data - 1].name
						},
						fail(res) {
					
						}
					})
				}
			})

			uni.getStorage({
				key:"setting",
				success(res) {
					that.appname=res.data.appname
					that.applogo=res.data.applogo
				}
			})

		}
	}
</script>

<style lang="less">
	page {
		background-color: #F3F5F7;
	}

	button::after {
		border: none;
	}

	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 1.35;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}

	.header {
		width: 750rpx;
		height: 399rpx;
		background-color: #3A80F0;
		font-family: "Microsoft YaHei";
		font-size: 23rpx;
		color: #FFF;
		display: flex;
		flex-direction: row;
	}

	.body {
		width: 100vw;
		height: 1060rpx;
		border-radius: 35rpx;
		background-color: #fff;
		margin-top: -200rpx;
	}

	.statu {
		display: flex;
		flex-direction: column;
	}

	.text {
		font-family: "Microsoft YaHei";
		font-weight: bold;
		font-size: 27rpx;
		margin-left: 33rpx;
		padding-top: 19rpx;
		height: 36rpx;
		width: 750rpx;
	}

	.select_from {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 750rpx;
		height: 214rpx;
	}

	.s_item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 375rpx;
		height: 214rpx;
	}

	.guodu {
		width: 750rpx;
		height: 24rpx;
		background-color: #F3F5F7;
	}

	.all {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 700rpx;

		.all_item {
			font-size: 27rpx;
			width: 750rpx;
			height: 96rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.img_left {
				margin-left: 44rpx;
			}

			text {
				position: absolute;
				left: 111rpx;
			}


			.img_next {
				position: absolute;
				right: 47.75rpx;
			}
		}

		.line {
			width: 672.5rpx;
			border-bottom: 1px solid rgba(200, 200, 200, 0.2);
		}
	}

	.footer {
		width: 750rpx;
		height: 230rpx;
		background-color: #fff;
		border-radius: 35rpx;

		.footer_all {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 200rpx;

			.all_item {
				position: relative;
				width: 750rpx;
				height: 96rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.img_left {
					margin-left: 44rpx;
				}

				text {
					position: absolute;
					left: 111rpx;

				}


				.img_next {
					position: absolute;
					right: 47.75rpx;
				}
			}

			.line {
				width: 672.5rpx;
				border-bottom: 1px solid rgba(200, 200, 200, 0.2);
			}
		}
	}
</style>

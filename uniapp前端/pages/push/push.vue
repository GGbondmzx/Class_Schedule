<template>
	<view>
		<view style="text-align: center;width: 750rpx;font-size: 27rpx;font-weight: bold;margin-top: 59rpx;">
			{{appname}}用户
		</view>
		<view style="text-align: center;width: 750rpx;font-size: 27rpx;font-weight: bold;margin-top: 8rpx;">
			请关注公众号【{{wxname}}】
		</view>
		<view style="text-align: center;width: 750rpx;font-size: 27rpx;font-weight: bold;margin-top: 8rpx;">
			<text>即可使用</text> <text style="color:#597CE4;">课表提醒功能</text>
		</view>

		<view style="text-align: center;width: 750rpx;font-size: 27rpx;font-weight: bold;margin-top: 28rpx;">
			每天晚上8:00 准时推送第二天课程安排</view>
		<view style="text-align: center;width: 750rpx;font-size: 27rpx;font-weight: bold;margin-top: 8rpx;">
			（课程名称+上课时间+上课地点）</view>
		<view class="img">
			<image show-menu-by-longpress="true" :src="wxlogo" mode="aspectFill" style="height: 194rpx;width: 194rpx;">
			</image>
		</view>
		<!-- 长按扫描二维码 即可关注公众号 -->
		<view style="text-align: center;width: 750rpx;font-size: 27rpx;font-weight: bold;margin-top: 8rpx;">
			长按扫描二维码 即可关注公众号</view>

		<view style="display: flex;justify-content: center;align-items: center;width: 750rpx;height: 79rpx;margin-top: 68rpx;">
			<view class="switch_bar">
				<view>
					<text style="color: #fff;">打开/关闭推送功能</text>
					<switch style="transform:scale(0.8);margin-left: 80rpx;" @change="switchChange"
						:checked="checked" />
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				appname:"",
				wxname:"",
				wxlogo:"",
				school_id: "1",
				schoolList: [],
				name: "",
				url: "",
				checked: false
			}
		},
		methods: {
			switchChange(e) {
				console.log(e)
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
							if(res1.data.code==201){
								uni.showToast({
									title:'未导入课表！' ,
									icon: "error"
								})
								that.checked=false
							}else{
								uni.showToast({
									title:res1.data.data ,
									icon: "success"
								})
							}
			
			
						}).catch(res2 => {
							console.log(res2)
			
						})
					}
				})
			},

		},
		onLoad() {
			let that = this
			uni.getStorage({
				key:"setting",
				success(res) {
					that.appname=res.data.appname
					that.wxname=res.data.wxname
					that.wxlogo=res.data.wxlogo
				}
			})
			uni.getStorage({
				key: 'token',
				success(res) {
					that.$http({
						url: 'getPush',
						method: 'POST',
						data: {
							token: res.data
						}
					}).then(res1 => {
						console.log(res1)
						if (res1.data.data == '已经开启订阅') {
							that.checked = true
						}
					}).catch(res2 => {
			
					})
				}
			})
		}
	}
</script>

<style>
	.img {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 70rpx;
	}

	.switch_bar {
		width: 522rpx;
		position: relative;
		height: 79rpx;
		background-color: #597CE4;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60rpx;
	}
</style>

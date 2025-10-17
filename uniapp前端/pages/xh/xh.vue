<template>
	<view>
		<view class="back_bar">
			<view style="height: 100rpx;width: 750rpx;">
			</view>
			<image @click="goMine()" src="../../static/back_bar.png" mode="aspectFill"
				style="width: 60rpx;height: 60rpx;"></image>
		</view>
		<view class="top">
			<view class="top_text">
				学号导入个人课表
			</view>
			<view class="switch_bar">
				<image src="../../static/switch_location.png" mode="aspectFill" style="width: 30rpx;height: 40rpx;">
				</image>
				<text style="font-size: 26rpx;font-weight: normal;color: #A8A2A2;margin-left: 10rpx;">{{school}}</text>
				<text style="font-size: 27;color: #53A6F5;margin-left: 10rpx;" @click="backToSelect()">切换</text>
			</view>
			<view class="tipss">
				<view class="tips">
					<uni-notice-bar showIcon scrollable single text="温馨提示：本次导入不涉及密码即可导入个人专属课表,安全放心。"></uni-notice-bar>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="body_item">
				<text>学号</text>
				<view class="input_item">
					<input v-model="from.username" type="text">
				</view>

			</view>
			<view class="body_item" v-if="from.school_id==2">
				<text>请输入验证码</text>
				<view class="vccode">
					<view style="background-color: #F4F3F8;height: 88rpx;border-radius: 16rpx;display: flex;justify-content: center;align-items: center;">
						<input v-model="from.vccode" type="text" >
					</view>
					<image v-if="showvccode" :src="base64code" mode="aspectFill" style="height: 86rpx;width: 160rpx;margin-left: 40rpx;" @click="getvccode()"></image>
					<view v-if="!showvccode" @click="getvccode()" style="color:#53A6F5;display: flex;justify-content: center;align-items: center;margin-left: 40rpx;">  <text>点击查看</text></view>
				</view>
				
			</view>
			<view class="line">
				<checkbox-group style="width: 50rpx;" @click.stop="checkboxChange()">
					<label>
						<checkbox value="cb" :checked="check" />
					</label>
				</checkbox-group>
				<text style="color: #777777;font-size: 24rpx;">我已阅读并同意</text>
				<label style="color:#3A81D4;font-size: 24rpx;" @click="jumpTo(e)">《用户协议》</label>
			</view>
			<button class="button" @click="submit" :disabled="buttonban">立即导入
				<image src="../../static/import_buttom.png" mode="aspectFill"
					style="width: 34rpx;height: 38rpx;margin-left: 34rpx;"></image>
			</button>


		</view>
		<view class="footer">
			<text>Copyright @ 2018-2022 All Rights Reserved.</text>
			<text>课知道 版权所有</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showvccode:false,
				buttonban: false,
				from: {
					username: '',
					school_id: '',
				},
				schoolList: [
				],
				school: "",
				check: false,
				base64code:""
			}
		},
		methods: {
			getvccode(){
				let that = this
				if(this.showvccode==false){
					this.showvccode=true;
				}
				console.log('获取vccode')
				let token=uni.getStorageSync('token')
				uni.request({
					url:'https://schoolpro.apiicu.com/api/getVccode',
					data:{
						token
					},
					method:"POST",
					success(res) {
						console.log(res)
						that.base64code=res.data.data
					},
					fail(error) {
						console.log(error)
					}
				})
			},
			goMine() {
				uni.switchTab({
					url: '../mine/mine'
				})
			},
			checkboxChange: function(e) {
				if (this.check == true) {
					this.check = false
				} else {
					this.check = true
				}
			},
			jumpTo() {
				uni.navigateTo({
					url: '../shouze/shouze'
				})
				
			},
			backToSelect() {
				uni.navigateTo({
					url: '../selectSchool/selectSchool'
				})
			},
			submit(e) {
				let that = this

				console.log(this.check)
				console.log(e)
				if (this.check) {
					that.buttonban = true
					uni.showLoading({
						title: '加载中'
					});
					uni.getStorage({
						key: 'token',
						success(res) {
							that.$http({
								url: 'ImportByXH',
								method: 'POST',
								data: {
									school_id: that.from.school_id,
									xh:that.from.username,
									token: res.data,
								}
							}).then(res1 => {
								console.log('then' + JSON.stringify(res1) )
								if (res1.data.code == 200) {
									that.getTable(res.data)
								}else{
									if (res1.data.code == 205) {
										that.buttonban = false
										uni.hideLoading();
									
										uni.showToast({
											title: '请检查账户密码是否正确',
											icon: "error",
											success(res) {
												console.log("fuckme")
											},
											fail(res) {
												console.log("wtf")
											}
										})
									}else{
										if(res1.data.code == 206){
											that.buttonban = false
											uni.hideLoading();
																				
											uni.showToast({
												title: '教务系统异常！',
												icon: "error",
												success(res) {
													console.log("fuckme")
												},
												fail(res) {
													console.log("wtf")
												}
											})
										}else{
											that.buttonban = false
											uni.hideLoading();
											uni.request({
												url:"https://schoolpro.apiicu.com/api/logerror",
												data:{
													token:res.data,
													error:res1.data
												},
												method:"POST"
											})
											uni.showToast({
												title: '未知错误请联系管理员',
												icon: "error",
												success(res) {
													console.log("fuckme")
												},
												fail(res) {
													console.log("wtf")
												}
											})
										}

									}
								}

							}).catch(error => {
								uni.request({
									url:"https://schoolpro.apiicu.com/api/logerror",
									data:{
										token:res.data,
										error
									},
									method:"POST"
								})
								that.buttonban = false
								uni.hideLoading();
								console.log('fff' + error)
							})

						},
						fail() {
							that.buttonban=false
							uni.hideLoading();
							uni.showToast({
								title: '没有token',
								icon: "error",
								success(res) {
									console.log("fuckme")
								},
								fail(res) {
									console.log("wtf")
								}
							})
						}
					})
				} else {
					uni.showToast({
						title: '请阅读用户协议！',
						icon: 'error'
					})
				}
				console.log('submit' + this.from.username)
			},
			getTable(token) {
				let that = this
				this.$http({
					url: 'getTable',
					method: 'POST',
					data: {
						token
					}
				}).then(res => {
					that.buttonban = false
					uni.hideLoading();
					if (res.data.code == 200) {
						uni.setStorage({
							key: 'table',
							data: res.data.data,
							success() {

								uni.setStorage({
									data: that.from.school_id,
									key: 'school_id'
								})
								uni.showModal({
									title: '导入成功！',
									content: '课表导入成功！',
									success(res) {
										if (res.confirm) {
											uni.switchTab({
												url: '../timetable/timetable'
											})
										} else if (res.cancel) {
											console.log(res)
										}

									}
								})

							}
						})
					}
					else if(res.data.code == 201){
						that.buttonban = false
						uni.hideLoading();
						uni.showModal({
							title:'未导入数据'
						})
					}else{
						let error=res
						uni.request({
							url:"https://schoolpro.apiicu.com/api/logerror",
							data:{
								token,
								error
							},
							method:"POST"
						})
					}
					console.log(res)
				}).catch(error => {
					uni.request({
						url:"https://schoolpro.apiicu.com/api/logerror",
						data:{
							token,
							error
						},
						method:"POST"
					})
					that.buttonban = false
					uni.hideLoading();
					console.log(error)
					uni.showToast({
						title: '出现未知错误！请联系管理员！',
						icon: "error"
					})
				})
			}

		},
		onLoad(res) {
			let that = this
			if(res.number==null){
				//从mine页面进入
				uni.getStorage({
					key:"school_id",
					success(res1) {
						that.from.school_id = Number(res1.data)
						uni.getStorage({
							key:"school_list",
							success(sl) {
								for (let i = 0; i < sl.data.length; i++) {
									if(sl.data[i].id==that.from.school_id){
										that.school = sl.data[i].name
										console.log(that.selectWay)
									}
								}
							}
						})
						// that.school = that.schoolList[res1.data - 1].name
					},
					fail() {
						uni.navigateTo({
							url:"/pages/selectSchool/selectSchool"
						})
					}
				})
			}else{
				that.from.school_id = Number(res.number)
				
				
				
				uni.getStorage({
					key:"school_list",
					success(sl) {
						for (let i = 0; i < sl.data.length; i++) {
							if(sl.data[i].id==that.from.school_id){
								that.school = sl.data[i].name
								console.log(that.selectWay)
							}
						}
					}
				})
				//从select页面进入
				// that.from.school_id = Number(res.number)
				// that.school = that.schoolList[Number(res.number) - 1].name
				
			}
			console.log(Number(res.number))
		}
	}
</script>

<style lang="less">
	.vccode{
		display: flex;
		flex-direction: row;
		margin-top: 8rpx;
		input{
			margin-left: 30rpx;
		}
	}
	.top {
		.top_text {
			width: 714rpx;
			height: 66rpx;
			font-size: 50rpx;
			font-weight: bold;
			margin-left: 36rpx;
		}

		.switch_bar {
			width: 714rpx;
			height: 35rpx;
			margin-left: 36rpx;
			margin-top: 14rpx;
		}

		.tips {
			//678
			width: 662rpx;
			margin-left: 8rpx;


			uni-notice-bar {
				border-radius: 8px;
			}
		}
	}

	.body {
		margin-left: 38rpx;
		margin-right: 38rpx;

		.input_item {
			margin-top: 8rpx;
			background-color: #F4F3F8;
			width: 678rpx;
			height: 88rpx;
			border-radius: 16rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			input {
				width: 670rpx;
				margin-left: 30rpx;
			}
		}


		.body_item {
			margin-top: 25rpx;
		}

		.line {
			margin-top: 43rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}

		.button {
			height: 86rpx;
			margin-top: 65rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			background-color: #539FFC;
			border-radius: 16rpx;
			font-size: 29rpx;
			color: #fff;
		}
	}

	.footer {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 19rpx;
		color: #707070;
	}

	.back_bar {
		height: 250rpx;
		width: 750rpx;
		margin-left: 19rpx;
	}

	.tipss {
		width: 678rpx;
		margin-left: 36rpx;
		margin-top: 43rpx;
		background-color: #fff9ea;
		border-radius: 16rpx;
	}
</style>

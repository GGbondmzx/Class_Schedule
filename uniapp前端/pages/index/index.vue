<template>
	<view style="width: 100%;height: 100%;
    overflow-x: hidden;">
		<view class="weather">
			<div>{{date}}</div>
			<div>{{weather}}</div>
		</view>
		<view class="swiper">
			<uni-swiper-dot class='swiperdot' :info="swiperList" :current="swiperCurrent" field="img"
				:mode="swipermode" :dotsStyles="dotsStyles" @clickItem='clickItem'>
				<swiper style="height: 300rpx;width: 100%;overflow-x: hidden;" :autoplay="true" :interval="3000"
					:duration="1000" @change="change" :current="swiperDotIndex">
					<swiper-item v-for="(item ,index) in swiperList" :key="index"
						style="width: 100%;overflow-x: hidden;">
						<view class="swiper-item" @click="swiperTo(item)">
							<img :src="item.img" mode="aspectFill"
								style="width: 100%;height: 260rpx;position: absolute;top: 0;border-radius: 10px;overflow-x: hidden;">
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="todayCourse">
			<view class="week">
				<image src="../../static/tdkb.png" style="width: 32rpx;height: 32rpx;margin-left: 36rpx;"></image>
				<text style="margin-left: 15rpx;">今日课程</text>
				<text style="position: absolute;right: 62rpx;">第 {{week}} / 19 周</text>
			</view>
			<view class="course">
				<view class="mcourse" v-if="morningCourse.length!=0">
					<view class="time-axis" :style="{height:(morningCourse.length*119)+morningCourse.length*20+'rpx'}">
						<span class="circle-top"></span>
						<span class="circle-bottom"></span>
					</view>
					<view class="forc">
						<view class="Mcourse" v-for="(item,index) in morningCourse" :key="index"
							:style="'background-color:'+colorarr[((item.enum +item.day)*item.name.length) % 7]+';'"
							@click="goTotimetabble">
							<view class="Mcourseitem"><text
									style="margin-left:25rpx;margin-top: 20rpx;">{{tableText(item.name)}}</text></view>
							<view class="Mcourseitem">
								<image src="../../static/class.png"
									style="width: 21rpx;height: 26rpx;margin-right: 13.75rpx;margin-top: 20rpx;;margin-left: 30rpx;">
								</image>
								<text style="margin-top: 20rpx;">{{item.room}}</text>
							</view>
							<view class="Mcourseitem"><text
									style="margin-left:25rpx;margin-bottom: 12rpx;">周次:{{item.attend_str}}</text></view>
							<view class="Mcourseitem">
								<image src="../../static/time.png"
									style="width: 23rpx;height: 23rpx;margin-right: 13.75rpx;margin-bottom: 12rpx;margin-left: 30rpx;">
								</image>
								<text
									style="margin-bottom: 12rpx;">{{timemap[Number(item.nums)-1].start}}~{{timemap[Number(item.enum)-1].end}}</text>
							</view>
						</view>
					</view>

				</view>
				<view class="acourse" v-if="afternoonCourse.length!=0">
					<view class="time-axis"
						:style="{height:(afternoonCourse.length*119)+afternoonCourse.length*20+'rpx'}">
						<span class="circle-top"></span>
						<span class="circle-bottom"></span>
					</view>
					<view class="forc">
						<view class="Mcourse" v-for="(item,index) in afternoonCourse" :key="index"
							:style="'background-color:'+colorarr[((item.enum +item.day)*item.name.length) % 7]+';'"
							@click="goTotimetabble">
							<view class="Mcourseitem"><text
									style="margin-left:25rpx;overflow: hidden;margin-top: 20rpx;">{{tableText(item.name)}}</text>
							</view>
							<view class="Mcourseitem">
								<image src="../../static/class.png"
									style="width: 20.71rpx;height: 26.35rpx;margin-right: 13.75rpx;margin-top: 20rpx;;margin-left: 30rpx;">
								</image>
								<text style="margin-top: 20rpx;">{{item.room}}</text>
							</view>
							<view class="Mcourseitem"><text
									style="margin-left:25rpx;margin-bottom: 12rpx;">周次:{{item.attend_str}}</text></view>
							<view class="Mcourseitem">
								<image src="../../static/time.png"
									style="width: 25.85rpx;height: 25.85rpx;margin-right: 13.75rpx;margin-bottom: 12rpx;;margin-left: 30rpx;">
								</image>
								<text
									style="margin-bottom: 12rpx;">{{timemap[Number(item.nums)-1].start}}~{{timemap[Number(item.enum)-1].end}}</text>
							</view>
						</view>
					</view>

				</view>
				<view v-if="isTable==true&&afternoonCourse.length==0&&morningCourse.length==0" class="noLession">
					今日没有课程，好好休息一下吧
				</view>
				<view v-if="isTable==false" class="noAuth">
					<image src="../../static/notable.png" style="width: 133rpx;height: 100rpx;" mode="aspectFill">
					</image>
					<text style="font-weight: normal;margin-top: 20rpx;color:#616161;">您还没有导入课表，请导入后查看~</text>
					<button size="mini" @click="goImport()">立即前往</button>
				</view>


			</view>
			<view class="infobar">

			</view>
			<view class="info" v-if="afternoonCourse.length!==0||morningCourse.length!==0">
				<text>今天共有{{morningCourse.length+afternoonCourse.length}}门课，请注意上课时间</text>
			</view>
		</view>
		<view class="school_hot">
			<view class="hot">
				<image src="../../static/hot.png" mode="aspectFill"
					style="width: 23rpx;height:30rpx;margin-left: 36rpx;margin-top: 20rpx;"></image>
				<text style="margin-left: 20rpx;font-size: 27rpx;color: #4b4b4b;">校园头条</text>
				<text style="color:#4b4b4b ;position: absolute;right: 90rpx;top:20rpx;font-size: 27rpx;"
					@click="geToMore()">查看更多</text>
				<image src="../../static/hot_more.png" mode="aspectFill"
					style="width:18rpx ;height: 18rpx;position: absolute;top:30rpx;right: 62rpx;"></image>
			</view>

			<view class="hot_item" v-for="(item,index) in school_hot" :key="index" @click="gotowebView(item)">
				<view style="margin-top: 26rpx;border-bottom: 1px;font-size: 26rpx;color:#5D5D5D ;">
					{{item.title}}
				</view>
				<view style="font-size: 22rpx;color: #757575;position: absolute;right: 15rpx;bottom: 15rpx;">
					{{item.time}}
				</view>
				<view class="hot_line">
				</view>
			</view>

		</view>


		<uni-popup ref="message" type="message">
			<uni-popup-message type="success" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				showCount: 0,
				allDataCount: 0,
				school_id: 1,
				school_hot: [],
				colorarr: [
					'#f2791c',
					'#fabc07',
					'#8cc63e',
					'#1bbbb3',
					'#f0be43',
					"#da786b", "#5297f6", "#e89859", "#7ac077", "#6ec8bf"
				],
				title: 'Hello',
				message: '',
				isTable: false,
				isCourse: false,
				swiperList: [],
				swiperCurrent: 0,
				swiperDotIndex: 0,
				dotsStyles: {
					backgroundColor: '#FFF',
					border: '1px #707070 solid',
					color: '#fff',
					selectedBackgroundColor: '#FFF',
					selectedBorder: '1px rgba(225, 225, 225,0.9) solid',
				},
				swipermode: "round",
				date: "",
				weather: "",
				startday: {
					y: '',
					m: '',
					d: ''
				},
				week: '',
				morningCourse: [],
				afternoonCourse: [],
				allTable: [],
				timemap: [{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					},
					{
						start: '',
						end: ''
					}
				]
			}
		},
		onLoad() {
			uni.showLoading({
				title: "正在登录"
			})
			console.log('热更新')
			if (wx.canIUse("getUpdateManager")) {
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					console.log("onCheckForUpdate====11111", res);
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						console.log("res.hasUpdate====");
					}
				});
				updateManager.onUpdateReady(function(res) {
					console.log(111, res);
					wx.showModal({
						title: "版本更新",
						content: "新版本已经准备好，确定重启应用？",
						showCancel: false,
						success: function(res) {
							console.log("success====", res);
							// res: {errMsg: "showModal: ok", cancel: false, confirm: true}
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
				updateManager.onUpdateFailed(function() {
					// 新的版本下载失败
					wx.showModal({
						title: "已经有新版本了哟~",
						content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
					});
				});
			}

			// console.log(JSON.stringify(this.timemap))
			// console.log(JSON.stringify(this.startday))
			this.checkToken()
			this.getWeatherInfo();
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"]
			})
		},
		methods: {
			getAllData(school_id) {
				//初始化所有数据
				let that = this
				this.$http({
					url: "init",
					method: "post",
					data: {
						school_id
					}
				}).then(res => {
					console.log(res)
					let start_time = JSON.parse(res.data.data.startday[0].start_time)
					that.startday = start_time
					console.log(start_time)
					console.log(that.startday)
					uni.setStorage({
						key: 'StartDay',
						data: start_time
					})
					let timemap = JSON.parse(res.data.data.timemap[0].time)
					that.timemap = timemap
					uni.setStorage({
						key: 'timemap',
						data: timemap
					})
					console.log(that.timemap)
					that.school_hot = res.data.data.info.sort(function(a, b) {
						return b.id - a.id;
					}).slice(0, 3);
					that.swiperList = res.data.data.swiper
					that.allDataCount=4
					let schoollist= res.data.data.schoollist
					uni.setStorage({
						key:"school_list",
						data:schoollist
					})
					let setting=res.data.data.setting
					uni.setStorage({
						key:"setting",
						data:setting
					})
					

				})
			},
			geToMore() {
				uni.navigateTo({
					url: "/pages/moreInfo/moreInfo"
				})
			},
			getSchoolId(token) {
				let that = this
				this.$http({
					url: "getSchoolId",
					method: 'POST',
					data: {
						token
					}
				}).then(res => {
					console.log('getSchool_id' + res.data.data)
					if (res.data.data != null) {
						//已经导入课表确定了学校,确认学校
						that.getAllData(res.data.data)
						uni.setStorage({
							key: 'school_id',
							data: res.data.data,
							success() {
								console.log('checkschoolidsucess' + that.school_id)
							}
						})
						//加载课表
						// that.getTable(token)

						console.log('getschoolid' + that.school_id)
					} else {
						that.getAllData(1)
						//未导入课表默认加载第一个学校数据
					}
				}).catch(error => {
					console.log(error)
				})
			},
			swiperTo(item) {
				uni.navigateTo({
					url: "../webview/webview?url=" + item.url
				})
				console.log(item)
			},
			goImport() {
				uni.navigateTo({
					url: "../selectSchool/selectSchool"
				})
			},
			goTotimetabble() {
				uni.switchTab({
					url: '../timetable/timetable'
				})
			},
			gotowebView(i) {
				uni.navigateTo({
					url: "../webview/webview?url=" + i.url
				})
			},
			tableText(str) {
				if (str.length >= 9) {
					return str.substring(0, 9) + '...'
				} else {
					return str
				}
			},
			wxLogin() {
				let that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.$http({
							url: 'login',
							method: 'POST',
							data: {
								code: loginRes.code
							}
						}).then(res => {
							//获取token
							uni.setStorage({
								key: 'token',
								data: res.data.data,
								success() {
									that.message = `登陆成功！`
									that.$refs.message.open()
								}
							}) //存token后获取school_id
							that.getSchoolId(res.data.data)
							// that.getTable(res.data.data)

							// console.log(res.data.data)
						}).catch(error => {
							console.log('error:' + error)
						})
						// 获取用户信息
					},
					fail: function(res) {
						console.log('fail:' + res)
					}
				});
			},
			checkToken() {
				let that = this
				uni.getStorage({
					key: 'token',
					success(ress) {
						that.$http({
							url: 'checkToken',
							method: 'POST',
							data: {
								token: ress.data
							}
						}).then(res => {
							if (res.data.code == 200) {
								that.getSchoolId(ress.data)
								//token有效获取school_id
							} else {
								that.wxLogin()
							}
						}).catch(error => {
							console.log('error' + error)
						})
					},
					fail() {
						that.wxLogin()
					}
				})

			},
			getTable(token) {
				let that = this
				// let i= token
				uni.getStorage({
					key: 'table',
					success(res) {
						that.isTable = true
						that.allTable = res.data
						that.getweek()
						// uni.hideLoading()
					},
					fail() {
						that.$http({
							url: 'getTable',
							method: 'POST',
							data: {
								token
							}
						}).then(res => {
							if (res.data.code == 200) {
								uni.setStorage({
									key: 'table',
									data: res.data.data,
									success() {
										that.allTable = res.data.data
										that.getweek()
										that.isTable = true //如果
									}
								})

							}
							console.log(res)
						}).catch(error => {
							console.log(error)
						})
					}
				})
			},
			change(e) {
				this.swiperCurrent = e.detail.current
			},
			clickItem(e) {
				console.log('这是轮播图点击事件：' + e)
				this.swiperDotIndex = e
			},
			getWeatherInfo() {
				let that = this
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=4f2800a0d5029905b0bf8e2df6e745e6&city=321003&extensions=all',
					method: "GET",
					success(res) {
						console.log(res.data.forecasts[0].casts[0])
						let min = Math.trunc(res.data.forecasts[0].casts[0].nighttemp)
						let max = Math.trunc(res.data.forecasts[0].casts[0].daytemp)
						that.weather = '扬州市 ' + min + '~' + max + '℃ ' + res.data.forecasts[0].casts[0].dayweather
					}
				})

			},
			getWeeks(y, m, d, y1, m1, d1) {
				let dayArray = [1, 2, 3, 4, 5, 6, 0]; //构建天数数组
				let sd = new Date(y, m - 1, d); //初始化数据
				let ed = new Date(y1, m1 - 1, d1);
				let sdNowDay = sd.getDay(); //获取数据是周几
				let sdNNowDay = dayArray.indexOf(sdNowDay); //利用数组重置成1234567
				let edNowDay = ed.getDay();
				let edNNowDay = dayArray.indexOf(edNowDay);
				let edL = 7 - edNNowDay;
				let sdF = new Date(y, m - 1, d - sdNNowDay); //开始日期定位到本周周一
				let enF = new Date(y1, m1 - 1, d1 + edL); //结束日期定位到下周周一
				var dt1 = sdF.getTime();
				var dt2 = enF.getTime();
				let week = (Math.abs(dt2 - dt1) / 1000 / 60 / 60 / 24 / 7)
				return week
			},
			getweek() {
				let day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				let date = new Date();
				let y = date.getFullYear(); //获取完整的年份(4位)
				let m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let d = date.getDate(); //获取当前日(1-31)
				let xqj = day[date.getDay()]
				console.log(y, m, d)
				console.log(this.startday)
				let week = this.getWeeks(this.startday.y, this.startday.m, this.startday.d, y, m, d)
				this.week = week
				let da = m + '月' + d + '日' + ' ' + xqj
				this.date = da
				console.log(this.allTable.length)
				let that = this
				if (this.allTable.length > 0) {
					that.init_table()
				}
				console.log(week)
			},
			init_table() {
				// console.log(this.allTable);
				let table = JSON.parse(this.allTable)
				// console.log(table)
				let week = this.week
				console.log(week)
				let now = new Date();
				let day = now.getDay(); //获取日期
				let course = table.filter(item => {
					let attend = item.attend.map(Number)
					if (attend.indexOf(week) != -1) {
						if (parseInt(item.day) == day) {
							return item
						}
					}
				})
				if (course.length > 0) {
					this.isCourse = true
					let mCourse = course.filter(item => {
						if (item.nums < 5) {
							return item
						}
					})
					this.morningCourse = mCourse
					let aCourse = course.filter(item => {
						if (item.nums >= 5) {
							return item
						}
					})
					this.afternoonCourse = aCourse
					console.log(mCourse, aCourse)
				}else{
					this.isCourse=false
					this.morningCourse=[]
					this.afternoonCourse=[]
				}

			}
		},
		onShow() {
			let that = this
			console.log('onShow:' + this.showCount)
			if (that.showCount != 0) {
				uni.getStorage({
					key: "school_id",
					success(res) {
						that.getAllData(res.data)
						that.isTable = true

					}
				})
				uni.getStorage({
					key: 'table',
					success(res) {
						that.allTable = res.data
						that.getweek()
					}
				})
			}
			this.showCount++
		},
		watch: {
			allDataCount(newval, oldval) {
				let that = this
				console.log(newval, oldval)
				if (newval == 4) {
					console.log('getAlldata done')
					uni.hideLoading()
					uni.getStorage({
						key: "school_id",
						success() {
							//加载数据完毕后查看是否绑定学校 ，绑定学校后获取课表数据
							let token = uni.getStorageSync('token')
							that.getTable(token)
						},
						fail() {
							let token = uni.getStorageSync('token')
							that.getTable(token)
							//未导入数据，不做操作.
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		background-color: #597CE4;
	}

	.title_image {
		position: absolute;
		width: 750rpx;
		height: 503rpx;
		top: -100rpx;
	}

	.swiper {
		view {
			width: 100%;
			overflow-x: hidden;
		}

		overflow-x: hidden;
		width: 692rpx;
		height: 400rpx;
		background-color: #597CE4;
		padding-top: 13rpx;
		margin: auto;
		border-radius: 10px;

		.swiper-item {
			width: 100%;
			overflow-x: hidden;
			border-radius: 10px;
		}
	}

	.swiperdot {
		overflow-x: hidden;
		z-index: 999;
	}

	.weather {
		position: relative;
		margin-top: 104rpx;
		height: 72rpx;
		width: 750rpx;
		z-index: 999;
		font-size: 27rpx;
		font-family: Segoe UI Regular;
		padding-left: 46rpx;
		color: #fff;
	}

	.todayCourse {
		position: relative;
		min-height: 300rpx;
		width: 692rpx;
		background-color: #fff;
		margin-top: -100rpx;
		margin-left: 29rpx;
		border-radius: 10px;
		padding-bottom: 20rpx;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// overflow: hidden;

		.week {
			height: 40rpx;
			width: 100%;
			background-color: #FFF;
			font-family: "Microsoft YaHei";
			font-size: 27rpx;
			color: #4b4b4b;
			display: flex;
			align-items: center;
			border-radius: 10px;
			padding-top: 20rpx;
		}

		.info {
			width: 100%;
			position: absolute;
			bottom: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: "Microsoft YaHei";
			font-size: 27rpx;
			color: #5e5e5e;
		}

		.mcourse,
		.acourse {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 30rpx;
		}

		.course {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.Mcourse {
				width: 549rpx;
				height: 132rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				border-radius: 10px;
				font-family: "Microsoft YaHei";
				font-size: 27rpx;
				color: #F5F5F5;
				// margin-top: 30rpx;
				position: relative;

				.Mcourseitem {
					height: 59.5rpx;
					width: 274.5rpx;
					display: flex;
					align-items: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					-o-text-overflow: ellipsis;
				}
			}
		}

		.circle-top {
			position: absolute;
			width: 8rpx;
			height: 8rpx;
			border-radius: 50%;
			border: 4rpx solid #5599ee;
			top: -12rpx;
		}

		.circle-bottom {
			position: absolute;

			width: 8rpx;
			height: 8rpx;
			border-radius: 50%;
			border: 4rpx solid #5599ee;
			bottom: -12rpx;
		}


		.time-axis {
			margin-right: 34rpx;
			position: relative;
			width: 4rpx;
			background-color: #cfcfcf;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.forc {
			display: flex;
			flex-direction: column;
			justify-content: center;

			align-items: center;
			gap: 20rpx;

		}

		.infobar {
			height: 90rpx;
			width: 100%;
		}

		.noLession {
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.noAuth {
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-top: 90rpx;

			button {
				background-color: #766AFF;
				color: #FFF;
				margin-top: 20rpx;
			}
		}
	}

	.school_hot {
		width: 692rpx;
		height: 520rpx;
		background-color: #fff;
		margin-left: 29rpx;
		margin-top: 28rpx;
		margin-bottom: 20rpx;
		border-radius: 10px;

		.hot {
			position: relative;
			height: 70rpx;
			width: 100%;
		}
	}

	.hot_item {
		position: relative;
		margin-left: 34rpx;
		width: 624rpx;
		height: 125rpx;
	}

	.hot_line {
		width: 624rpx;
		border-bottom: 1px solid rgba(200, 200, 200, 0.2);
		position: absolute;
		bottom: 0;
	}
</style>
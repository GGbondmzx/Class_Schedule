<template>
	<!-- 	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta> -->
	<uni-popup ref="popup" background-color='none' @change="change">
		<view class="popupcontext">
			<view class="class_info">
				<view style="padding: 10rpx 20rpx;">
					<view class="class_name" style="color: #303133;font-size: 18px;font-weight: bold;">
						{{selceted.name}}
					</view>
					<view class="class_less">
						<view class="class_info_item">
							<image src="../../static/week.png"
								style="width: 30.3rpx;height: 30.3rpx;margin-right: 40rpx;"></image>
							<text style="font-size: 16px;">周次</text> <text
								style="color:#aeb0b4;margin-left: 30rpx;">{{selceted.attend_str}}</text>
						</view>
						<view class="class_info_item">
							<image src="../../static/arrtime.png"
								style="width: 30rpx;height: 30rpx;margin-right: 40rpx;"></image>
							<text style="font-size: 16px;">节次</text> <text
								style="color:#aeb0b4;margin-left: 30rpx;">{{selceted.nums}}-{{selceted.enum}}节</text>
						</view>
						<view class="class_info_item">
							<image src="../../static/teacher.png"
								style="width: 36rpx;height: 38rpx;margin-right: 40rpx;"></image>
							<text style="font-size: 16px;">老师</text> <text
								style="color:#aeb0b4;margin-left: 30rpx;">{{selceted.teacher}}</text>
						</view>
						<view class="class_info_item">
							<image src="../../static/whereroom.png"
								style="width: 30rpx;height: 36rpx;margin-right: 40rpx;"></image>
							<text style="font-size: 16px;">教室</text> <text
								style="color:#aeb0b4;margin-left: 30rpx;">{{selceted.room}}</text>
						</view>

					</view>
					<view
						style="position: absolute;bottom: 0rpx;display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<!-- 						<text style="width:281rpx;height: 40rpx;text-align: center;margin-bottom: 10rpx;color: #68d179;"
							@click="goEdit">编辑</text>
						<text
							style="width:281rpx;height: 40rpx;text-align: center;margin-bottom: 10rpx;color: #fd8783;">删除</text> -->
						<!-- <text style="width:281rpx;height: 40rpx;text-align: center;margin-bottom: 10rpx;color: #68d179;">确定</text> -->
					</view>
				</view>

			</view>

		</view>

	</uni-popup>
	<view>

	</view>
	<view>
		<view class="bar" :style="{'height':topHeight + 'px'}">
			
		</view>
		<view class="top" :style="{'height':statusBar + 'px'}">
			<!-- 普通弹窗 -->
			<picker class="week" style="height: 100%;" @change="bindPickerChange" :value="index" :range="array">
				<view>
					<text>第{{week}}周</text>
					<image src="../../static/exchange.png" style="width: 30rpx;height: 27rpx;margin-left: 20rpx;">
					</image>
				</view>
			</picker>
			<!-- 			<view class="classforecast">
				课表预览+选择周数
			</view> -->

		</view>
		<view style="display: flex;flex-direction: row;">
			<view
				style="font-size:18px;width:35px ;text-align: center;display: flex;justify-content: center;align-items: center;font-size: 18px;font-weight: 600;color:#32c2bb;">
				{{mouth}}
			</view>
			<view class="day">
				<view v-for="(item,index) in dayList" :key="index" class="day-text">
					<view style="margin-top: 5px;">周{{item.day}}</view>
					<view style="margin-top: 2.5px;color:#909399;font-size: 10px;">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>

		<view class="scroll">
			<view style="width:750rpx;display:flex;">
				<view style="color:#32c2bb;">
					<view v-for="(item,index) in howjc" :key="index" class="left">
						<view style="display: flex;flex-direction:column;justify-content: center;align-items: center;">
							<view>
								{{item}}
							</view>
							<view style="color: #909399;font-size: 10px;">
								<view class="">
									{{timemap[item-1].start}}
								</view>
								<view class="">
									{{timemap[item-1].end}}
								</view>
							</view>
						</view>

					</view>
				</view>

				<view v-for="(wtf,wtff) in howjc" :key="wtff">
					<view
						style="width:750rpx;margin-top:{{(index+1)*120}}rpx;  position: absolute;border-bottom:1px solid rgba(200, 200, 200, 0.1);left:0;">
					</view>
				</view>
				<view style="width: calc(100% - 70rpx);position: relative;">

					<view v-for="(item,index) in nowtbale" :key="index" @click="openDio(item)">
						<view class="flex-item kcb-item" :style="
                                            'margin-right:5rpx;margin-left:calc(' +
                                            (item.day - 1) +
                                            ' * 100% / 7 + 5rpx);margin-top:' +
                                            ((item.nums - 1) * 60 + 2.5)*2 +
                                            'rpx;margin-bottom:5rpx;height:' +
                                            (((item.enum - item.nums + 1)) * 60 - 5)*2 +
                                            'rpx;background-color:'+colorarr[((item.enum +item.day)*item.name.length) % 7]+';'
                                        ">
							<view class="text">
								<view style="padding-left: 4rpx;margin-right: 4rpx;">
									{{tableText(item)}}@{{item.room}}@{{item.attend_str}}
								</view>
								
							</view>
						</view>
					</view>
				</view>


			</view>

		</view>
		<uni-fab :pattern="pattern" horizontal="right" direction="horizontal" :content="content" @trigger="trigger">
		</uni-fab>

	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				howjc:[],
				topHeight:"",
				statusBar:"",
				content: [{
					iconPath: '/static/import_scheme.png',
					selectedIconPath: '/static/import_scheme.png',
					text: '导入课表',
					active: false
				},{
					iconPath: '/static/editimport.png',
					selectedIconPath: '/static/editimport.png',
					text: '添加课程',
					active: false
				}
				 
				 ],
				pattern: {
					color: '#FFF',
					backgroundColor: '#32c2bb',
					selectedColor: '#007AFF',
					buttonColor: '#32c2bb',
					iconColor: '#fff'
				},
				selceted: '',
				firsetweek: "",
				MondayTime: "",
				dayList: [],
				mouth: "",
				show: false,
				alltable: [],
				nowtbale: [],
				isTable: false,
				timemap: [{
						start: '8:00',
						end: '8:45'
					},
					{
						start: '8:55',
						end: '9:40'
					},
					{
						start: '10:00',
						end: '10:45'
					},
					{
						start: '10:55',
						end: '11:40'
					},
					{
						start: '14:20',
						end: '15:15'
					},
					{
						start: '15:25',
						end: '16:10'
					},
					{
						start: '16:30',
						end: '17:15'
					},
					{
						start: '17:25',
						end: '18:10'
					},
					{
						start: '19:00',
						end: '19:45'
					},
					{
						start: '19:55',
						end: '20:40'
					},{start: '20:50',end: '20:35'},{start: '20:45',end: '21:20'}
				],
				week: "",
				startday: {
					y: 2022,
					m: 8,
					d: 29
				},
				colorarr: ['#f2791c',
					'#fabc07',
					'#8cc63e',
					'#1bbbb3',
					'#f0be43',
					"#da786b", "#5297f6", "#e89859", "#7ac077", "#6ec8bf"

				],
				array: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周',
					'第十四周', '第十五周', '第十六周'
				]

			}
		},
		methods: {
			trigger(e) {
				console.log(e)
				
				if(e.index==0){
					uni.navigateTo({
						url: "../selectSchool/selectSchool"
					})
				}else{
					uni.navigateTo({
						url: "../localclass/localclass"
					})
				}
				// if(e.index==0){
				// 	uni.navigateTo({
				// 		url:'../edit/edit'
				// 	})
				// }
				// if(e.index==1){
				// 	uni.navigateTo({
				// 		url:"../selectSchool/selectSchool"
				// 	})
				// }
			},
			goEdit() {
				let item = this.selceted
				uni.navigateTo({
					url: '../edit/edit?item=' + JSON.stringify(item)
				})
			},
			openDio(res) {
				this.selceted = res
				console.log(res)
				this.$refs.popup.open('center')
			},
			getDayInfo() {
				let dayarr = [7, 1, 2, 3, 4, 5, 6]
				let date = new Date();
				let m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let d = date.getDate(); //获取当前日(1-31)
				this.mouth = this.fix(m, 2);
				let now = new Date();
				let nowTime = now.getTime();
				let day = dayarr[now.getDay()];
				let oneDayTime = 24 * 60 * 60 * 1000;
				let MondayTime = nowTime - (day - 1) * oneDayTime;
				this.MondayTime = MondayTime
				let xqy = this.fix((dayjs(MondayTime).$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).$D))
				let xqe = this.fix((dayjs(MondayTime).add(1, 'day').$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).add(1,
					'day').$D))
				let xqs = this.fix((dayjs(MondayTime).add(2, 'day').$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).add(2,
					'day').$D))
				let xqsi = this.fix((dayjs(MondayTime).add(3, 'day').$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).add(3,
					'day').$D))
				let xqw = this.fix((dayjs(MondayTime).add(4, 'day').$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).add(4,
					'day').$D))
				let xql = this.fix((dayjs(MondayTime).add(5, 'day').$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).add(5,
					'day').$D))
				let xqq = this.fix((dayjs(MondayTime).add(6, 'day').$M + 1), 2) + '/' + this.fix((dayjs(MondayTime).add(6,
					'day').$D))
				let list = [{
					day: '一',
					time: xqy
				}, {
					day: '二',
					time: xqe
				}, {
					day: '三',
					time: xqs
				}, {
					day: '四',
					time: xqsi
				}, {
					day: '五',
					time: xqw
				}, {
					day: '六',
					time: xql
				}, {
					day: '日',
					time: xqq
				}]
				this.dayList = list
				console.log(list)
				console.log(dayjs(MondayTime))
			},
			bindPickerChange(e) {
				let item = parseInt(e.detail.value) + 1
				console.log(e)
				this.week = item
				console.log(this.week)
				let first = this.firsetweek
				let MondayTime = this.MondayTime
				if (item == first) {
					console.log('nochange')
				}
				if (item > first) {
					let bewtten = item - first
					let xqy = this.fix((dayjs(MondayTime).add(0 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(0 + (bewtten * 7), 'day').$D))
					let xqe = this.fix((dayjs(MondayTime).add(1 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(1 + (bewtten * 7), 'day').$D))
					let xqs = this.fix((dayjs(MondayTime).add(2 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(2 + (bewtten * 7), 'day').$D))
					let xqsi = this.fix((dayjs(MondayTime).add(3 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(3 + (bewtten * 7), 'day').$D))
					let xqw = this.fix((dayjs(MondayTime).add(4 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(4 + (bewtten * 7), 'day').$D))
					let xql = this.fix((dayjs(MondayTime).add(5 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(5 + (bewtten * 7), 'day').$D))
					let xqq = this.fix((dayjs(MondayTime).add(6 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).add(6 + (bewtten * 7), 'day').$D))
					let list = [{
						day: '一',
						time: xqy
					}, {
						day: '二',
						time: xqe
					}, {
						day: '三',
						time: xqs
					}, {
						day: '四',
						time: xqsi
					}, {
						day: '五',
						time: xqw
					}, {
						day: '六',
						time: xql
					}, {
						day: '日',
						time: xqq
					}]
					this.dayList = list

				}
				if (item < first) {
					let bewtten = first - item
					let xqy = this.fix((dayjs(MondayTime).subtract(0 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).subtract(0 + (bewtten * 7), 'day').$D))
					let xqe = this.fix((dayjs(MondayTime).subtract(1 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).subtract(1 + (bewtten * 7), 'day').$D))
					let xqs = this.fix((dayjs(MondayTime).subtract(2 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).subtract(2 + (bewtten * 7), 'day').$D))
					let xqsi = this.fix((dayjs(MondayTime).subtract(3 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix(
						(dayjs(MondayTime).subtract(3 + (bewtten * 7), 'day').$D))
					let xqw = this.fix((dayjs(MondayTime).subtract(4 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).subtract(4 + (bewtten * 7), 'day').$D))
					let xql = this.fix((dayjs(MondayTime).subtract(5 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).subtract(5 + (bewtten * 7), 'day').$D))
					let xqq = this.fix((dayjs(MondayTime).subtract(6 + (bewtten * 7), 'day').$M + 1), 2) + '/' + this.fix((
						dayjs(MondayTime).subtract(6 + (bewtten * 7), 'day').$D))
					let list = [{
						day: '一',
						time: xqy
					}, {
						day: '二',
						time: xqe
					}, {
						day: '三',
						time: xqs
					}, {
						day: '四',
						time: xqsi
					}, {
						day: '五',
						time: xqw
					}, {
						day: '六',
						time: xql
					}, {
						day: '日',
						time: xqq
					}]
					this.dayList = list
				}
				this.selectweek()
				// this.$refs.popup.close()
			},
			showpopup() {
				// this.show=true
				console.log('wtf')
				this.$refs.popup.open('top')
			},
			change(e) {
				this.show = e.show
				console.log(e)
			},
			tableText(item) {
				let str = item.name
				if (item.enum == item.nums) {

					if (str.length >= 5) {
						return str.substring(0, 5) + '...'
					} else {
						return str
					}
				} else {
					if (str.length >= 15) {
						return str.substring(0, 15) + '...'
					} else {
						return str
					}
				}

			},
			selectweek() {
				let week = this.week


				console.log(this.week)
				let all = JSON.parse(JSON.stringify(this.alltable))
				let now = all.filter(item => {
					if (item.attend.indexOf(week) !== -1) {
						console.log(item.attend.indexOf(parseInt(week)))
						return item
					}
				})
				console.log(now)
				this.nowtbale = now

			},
			getStyle(item) {
				let color = this.colorarr[(item.enum + +item.day) % 9]
				return {
					'margin-left': (item.day - 1) * 340 / 7 + 2 + 'px',
					'margin-top': ((item.nums - 1) * 60 + 2.5) + 'px',
					'height': ((item.enum - item.nums + 1) * 60 - 5) + 'px',
					'background-color': color
				}

			},
			getTable() {
				this.getweek()
				let that = this
				uni.getStorage({
					key: 'table',
					success(res) {
						console.log(res)
						that.alltable = JSON.parse(res.data)
						that.isTable = true
						that.selectweek()
						console.log(JSON.parse(res.data))
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			getweek() {
				let day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				let date = new Date();
				let y = date.getFullYear(); //获取完整的年份(4位)
				let m = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let d = date.getDate(); //获取当前日(1-31)
				let xqj = day[date.getDay()]
				console.log(y, m, d)
				let week = this.getWeeks(this.startday.y, this.startday.m, this.startday.d, y, m, d)
				this.firsetweek = week
				this.week = week
				// let da = m + '月' + d + '日' + ' ' + xqj
				// this.date = da
				console.log(week)
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
			fix(num, length) {
				return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' +
					num;
			}


		},
		onLoad() {
			//获取状态栏+导航栏的高度
			let that = this
			uni.getSystemInfo({
				success(e) {
					that.topHeight = uni.upx2px(e.statusBarHeight * 750 / wx.getSystemInfoSync().windowWidth  )
					console.log(e.statusBarHeight)
					if (e.platform == "ios" || e.platform == "devtools") {
						that.statusBar = 45;
					} else {
						that.statusBar =50;
					}
				}
			})
			
			uni.getStorage({
				key: 'StartDay',
				success(res) {
					that.startday = res.data
					res.data
					console.log(res)
					uni.getStorage({
						key: 'timemap',
						success(time) {
							that.timemap = time.data
							let arr = new Array();
							for(let i=0;i<time.data.length;i++){
							  arr.push(i+1);
							}
							that.howjc=arr
							console.log(arr)
							that.getTable()
							that.getDayInfo()
							console.log(time)
						}
					})
				}
			})
			console.log(that.topHeight)



		},
		onShow() {
			let that = this
			uni.getSystemInfo({
				success(e) {
					that.topHeight = uni.upx2px(e.statusBarHeight * 750 / wx.getSystemInfoSync().windowWidth  )
					console.log(e.statusBarHeight)
					if (e.platform == "ios" || e.platform == "devtools") {
						that.statusBar = 45;
					} else {
						that.statusBar =50;
					}
				}
			})
			uni.getStorage({
				key: 'StartDay',
				success(res) {
					that.startday = res.data
					res.data
					console.log(res)
					uni.getStorage({
						key: 'timemap',
						success(time) {
							that.timemap = time.data
							let arr = new Array();
							for(let i=0;i<time.data.length;i++){
							  arr.push(i+1);
							}
							that.howjc=arr
							that.getTable()
							that.getDayInfo()
							console.log(time)
							console.log(arr)
						}
					})
				}
			})
		}
	}
</script>

<style lang="less">
	.top {
		position: relative;
		width: 750rpx;
		background-color: #fff;

		.week {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 750rpx;
			position: absolute;
			text-align: center;
			color: #32c2bb;
		}
	}

	.day {
		display: flex;
		height: 70rpx;
		flex-direction: row;
	}

	.day-text {
		width: calc((750rpx - 70rpx) / 7);
		// margin-right: 4rpx;
		height: 62rpx;
		font-weight: 600;
		font-size: 26rpx;
		color: #32c2bb;
		justify-content: center;
		flex-direction: column;
		display: flex;
		align-items: center;
	}

	.scroll {
		height: 1170rpx;
		z-index: 101;
	}

	.left {
		width: 70rpx;
		height: 120rpx;
		font-size: 26rpx;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.flex-item {}

	.kcb-item {
		width: calc(100% / 7 - 10rpx);
		position: absolute;
		box-sizing: border-box;
		display: flex;
		border-radius: 16rpx;
		font-size: 20rpx;
		color: #fff;
		overflow: hidden;
	}

	.text {
		width: calc(680rpx / 7 - 10rpx);
		padding-top: 10rpx;
		// padding-left: 4rpx;

	}

	.popupcontext {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		padding: 15rpx;
		height: 300rpx;
		width: 750rpx;
	}

	.p_item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
	}

	page {
		background-image: url(https://image.origin-tec.com/img/13a47609758d6e8a0401810afa9bba09.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.class_info {
		position: relative;
		width: 562rpx;
		height: 400rpx;
		background-color: #fff;
		border-radius: 4px;
	}

	.class_less {
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.class_info_item {
		width: 100%;
		height: 60rpx;
	}
</style>

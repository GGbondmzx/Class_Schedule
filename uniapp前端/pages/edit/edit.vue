<template>
	<view style="padding: 75rpx;">
		<view class="title">
			<text style="font-weight: 600;margin-top: 40rpx;margin-left: 20rpx;">课程名称</text>
			<input style="margin-top: 40rpx;margin-left: 20rpx;" type="text" v-model="classitem.name"
				placeholder="请输入课程名称">
			<image src="../../static/courseBG.png" mode="aspectFill" style="width: 200rpx;height: 150rpx;"></image>
		</view>
		<view style="padding: 30rpx;font-weight: 600;">
			<text>周次选择</text>
		</view>

		<uni-grid :column="5" :showBorder="false">
			<uni-grid-item v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] " :key="index">
				<view style="display: flex;justify-content: center;align-items: center;">
					<view
						style="width: 60rpx;height: 60rpx;border-radius: 50%;border: 4rpx solid #000;display: flex;justify-content: center;align-items: center;"
						:style="{'background-color': classitem.attend.indexOf(item)==-1?'':'red'}"
						@click="change(item)">
						{{item}}
					</view>
				</view>

			</uni-grid-item>
		</uni-grid>
		<!-- 	文本信息开始 -->
		<view class="body">
			<image src="../../static/courseBG.png" mode="aspectFill" style="width: 200rpx;height: 150rpx;"></image>
			<!-- 老师姓名 -->
			<view class="uni-title uni-common-pl" style="font-weight: 600;">老师姓名</view>
			<input style="margin-left: 20rpx;" type="text" v-model="classitem.teacher" placeholder="请输入教师姓名">

			<view class="uni-list">
				<view class="uni-list-cell"  style="background-color: #F1F1F1;">
					<view class="uni-list-cell-left" style="font-weight: 600;">
						开始节次
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="start">
							<view class="uni-input" style="background-color: #F1F1F1;">{{start[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" style="background-color: #F1F1F1;">
					<view class="uni-list-cell-left" style="font-weight: 600;">
						结束节次
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange2" :value="index2" :range="start">
							<view class="uni-input" style="background-color: #F1F1F1;">{{start[index2]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell"  style="background-color: #F1F1F1;">
					<view class="uni-list-cell-left" style="font-weight: 600;">
						星期几??
					</view>
					<view class="uni-list-cell-db" >
						<picker @change="bindPickerChange3" :value="index3" :range="weeks">
							<view class="uni-input" style="background-color: #F1F1F1;">{{start[index3]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 开始节次 -->
			<!-- 结束节次 -->


		</view>

		<button class="button" @click="add" :disabled="isshow">添加课程
			<image src="../../static/import_buttom.png" mode="aspectFill"
				style="width: 34rpx;height: 38rpx;margin-left: 34rpx;"></image>
		</button>
		<!-- 班级课表的id -->
		<!-- 本地保存的课表 -->
	</view>
</template>

<script>
	import Base64 from 'base-64';
	export default {
		data() {
			return {
				indexedit:null,
				isshow: false,
				allTable: [],
				classitem: {
					name: "",
					teacher: '',
					attend_str: "", //备注
					enum: '1', //结束
					nums: '1', //开始
					attend: [], //周次，
					day: 1
				},
				isChange: false,
				info: false,
				start: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				weeks: [1, 2, 3, 4, 5, 6, 7],
				index: 0,
				index2: 0,
				index3: 0
			}
		},
		methods: {
			upupup(data){
				let token =uni.getStorageSync('token')
				this.$http({
					url:"editTable",
					method:"post",
					data:{
						table:JSON.stringify(data),
						token:token
					}
				}).then(res=>{
					console.log(res)
					uni.showToast({
						title:"编辑成功！",
						icon:"success"
					})
					uni.navigateTo({
						url:"/pages/localclass/localclass"
					})
				})
			},
			addclassitembyinfo(res){
				let that = this
				uni.getStorage({
					key:"table",
					success(successres) {
			
						console.log(successres.data)
						let newitem= JSON.parse(successres.data)
						newitem.splice(that.indexedit,1)
						newitem=newitem.push(res)
						// console.log(allitems)
						uni.setStorage({
							key:"table",
							data:JSON.stringify(newitem),
							success() {
								console.log('添加成功')
								that.upupup(newitem)
							},
							fail(fail) {
								console.log('获取到旧数据但是添加新数据失败',fail)
							}
						})
					},fail() {
						//第一次直接存
						uni.setStorage({
							key:"table",
							data:JSON.stringify([res]),
							success() {
								console.log('添加成功')
								that.upupup([res])
							},
							fail(fail) {
								console.log('首次添加失败',fail)
							}
						})
					}
				})
			},
			addclassitem(res){
				let that = this
				uni.getStorage({
					key:"table",
					success(successres) {

						console.log(successres.data)
						let newitem= JSON.stringify(JSON.parse(successres.data).push(res))
						// console.log(allitems)
						uni.setStorage({
							key:"table",
							data:newitem,
							success() {
								console.log('添加成功')
								that.upupup(newitem)
							},
							fail(fail) {
								console.log('获取到旧数据但是添加新数据失败',fail)
							}
						})
					},fail() {
						//第一次直接存
						uni.setStorage({
							key:"table",
							data:JSON.stringify([res]),
							success() {
								console.log('添加成功')
								that.upupup(JSON.stringify([res]))
							},
							fail(fail) {
								console.log('首次添加失败',fail)
							}
						})
					}
				})
			},
			checkIsOK(item) {
				let result = true;
				item.name.length == 0 ? result = false : null
				item.teacher.length == 0 ? result = false : null
				item.attend.length == 0 ? result = false : null
				item.attend.day == 0 ? result = false : null
				console.log(item.name.length,item.teacher.length,item.attend.length)
		
				if (item.enum < item.nums) {
					//保证开始节次大于结束节次
					result = false
				}
				uni.getStorage({
					key: "table",
					success(success) {
						let rtable = JSON.parse(success.data)
						// console.log(success.data)
						let one = [];
						item.attend.forEach(item0 => {
							rtable.forEach(item2 => {
								// console.log(item2)
								if (item2.attend.indexOf(item0) != -1) {
									if (item.day == item2.day) {
										if (item.enum < item2.nums) {
											return false
										}
									}

								}
							})
						})


					},
					fail(fail) {
						//用户未导入或者更新课表
						// result=true
					}
				})
				return result;
			},

			add() {
				let that = this
				let result = this.checkIsOK(that.classitem)
				
				console.log(result)
				if (result) {
					if(that.info==false){
						that.addclassitem(that.classitem)
					}else{
						that.addclassitembyinfo(that.classitem)
						
					}
				} else {
					uni.showToast({
						title: '请检查数据',
						icon: "error"
					})

				}
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.classitem.nums = Number(e.detail.value) + 1
				console.log(this.classitem.nums)
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index2 = e.detail.value
				this.classitem.enum = Number(e.detail.value) + 1
				console.log(this.classitem.enum)
			},
			bindPickerChange3: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index3 = e.detail.value
				this.classitem.day = Number(e.detail.value) + 1
				console.log(this.classitem.day)
			},
			change(e) {
				let that = this
				let arr = this.classitem.attend.indexOf(e)
				if (arr == -1) {
					//未点击，则新增
					that.classitem.attend.push(e)
					that.classitem.attend = that.classitem.attend.sort()
					console.log(that.classitem.attend)
				} else {
					that.classitem.attend.splice(arr, 1)
					//已点击，则删除
					console.log(that.classitem.attend)
				}


			},

		},
		onLoad(res) {
			let that = this
			console.log(res)
			if (JSON.stringify(res) == '{}') {
				console.log('add')
			} 
			
			if(res.index !=undefined){
				that.info=true
				console.log('edit')
				uni.getStorage({
					key:"table",
					success(classes) {
						let item = JSON.parse(classes.data)[res.index]
						that.classitem = item
						that.indexedit=res.index
						console.log((Number)(item.enum-1));
						that.index=(Number)(item.nums-1)
						that.index2=(Number)(item.enum-1)
						that.index3=(Number)(item.day-1)
					}
				})
			}

		}
	}
</script>

<style lang="less">
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

	page {
		background-color: #F1F1F1;
	}

	.body {
		width: 600rpx;
		height: 420rpx;
		position: relative;
		border-radius: 10px;
		box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.1);
		image {
			position: absolute;
			right: 0px;
			top: 0px;
		}
	}

	.title {
		width: 600rpx;
		height: 150rpx;
		position: relative;
		border-radius: 10px;
		box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.1);

		image {
			position: absolute;
			right: 0px;
			top: 0px;
		}
	}

	.item {
		margin-top: 60rpx;
		width: 600rpx;
		height: 320rpx;
		position: relative;
		box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.1);
	}
</style>
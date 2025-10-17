<template>
	<view>
		<view style="width: 100vw;height: 15vh;">
		</view>

		<!-- 向后台请求导入课表的方式有哪几种 -->
		<!-- 第一种爬虫导入 -->
		<view class="selectway">
			<view v-for="(item,index) in selectWay" :key="index"  @click="wayto(item)" >
				<view v-if="item.isOK" class="selectwat_item">
					<view class="title">
						{{item.name}}
					</view>
					<view class="tips">
						{{item.tips}}
					</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				school: "",
				school_id: null,
				selectWay: [{
						name: "教务系统导入",
						tips: "需要输入教务系统账号密码",
						isOK: true,
						way: '../import/import'
					},
					{
						name: "班级课表导入",
						tips: "无需输入任何账号密码",
						isOK: true,
						way: "../class/class"
					},
					{
						name:"输入学号导入课表",
						tips:"无需密码导入个人专属课表！",
						isOK:true,
						way:"../xh/xh"
					}
				]


			}
		},
		methods: {
			wayto(item){
				let that = this
				uni.navigateTo({
					url: item.way+ '?number=' + that.school_id
				})
			}

		},
		onLoad(res) {
			let that = this
			that.school_id = Number(res.number)
			uni.getStorage({
				key:"school_list",
				success(resu) {
					console.log(resu)
					
					for (let i = 0; i < resu.data.length; i++) {
						if(resu.data[i].id==that.school_id){
							that.selectWay[0].isOK = resu.data[i].waytospider==1?true:false
							that.selectWay[1].isOK = resu.data[i].waytoclass==1?true:false
							that.selectWay[2].isOK = resu.data[i].waytoxh==1?true:false
							console.log(that.selectWay)
						}
					}

					// that.schoolList=res.data
				}
			})
			// console.log(that.schoolList[0])
			console.log(Number(res.number))
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}
	.selectway{
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
		font-size: 22rpx;
		.selectwat_item{
			
			margin-top: 31rpx;
			width: 692rpx;
			height: 156rpx;
			background-color: #59ADFB;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			.title{
				color: white;
				font-size: large;
				font-weight: 900;
			}
			.tips{
				color: white;
				font-size: medium;
				font-weight: 400;
			}
		}
	}

</style>
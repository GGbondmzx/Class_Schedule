<template>
	<view>
<!-- 		<scroll-view style="width: 100vw;height: 94vh;" scroll-y="true"> -->
			<view class="svall">

				<uni-swipe-action v-for="(item,index) in alllocal" :key="index" >
					<view style="height: 30rpx;"></view>
					<uni-swipe-action-item :right-options="options"  @click="change($event, index)" :show="longpress==index?'right':'none'" 
					 >
						<view class="alllocal_item" @click="changeshow(index)">
							<view class="item_name">{{item.name}}</view>
							<view class="item_info">周{{item.day}}@{{item.nums}}~{{item.enum}}节</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<!-- 				<view v-for="(item,index) in alllocal" :key="index" class="alllocal_item">
					{{item}}
				</view> -->

			</view>

			<uni-load-more status="noMore"></uni-load-more>
<!-- 		</scroll-view> -->


		<uni-fab :pattern="pattern" horizontal="right" direction="horizontal" @fabClick="fabClick">
		</uni-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rlinfo:null,
				longpress:null,
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#007aff',
						height:'156rpx'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				alllocal: [],
				pattern: {
					color: '#FFF',
					backgroundColor: '#32c2bb',
					selectedColor: '#007AFF',
					buttonColor: '#32c2bb',
					iconColor: '#fff'
				}

			}
		},
		methods: {
			
			change(e,ee){
				let that = this
				console.log(e,ee);
				if(e.index==0){
					//编辑
					uni.navigateTo({
						url:"/pages/edit/edit?index="+ee
					})
				}
				if(e.index==1){
					//删除
					uni.getStorage({
						key:"table",
						success(res) {
							let all = JSON.parse(res.data)
							all.splice(ee,1)
							that.alllocal=all
							let token =uni.getStorageSync('token')
							that.$http({
								url:"editTable",
								method:"POST",
								data:{
									token:token,
									table:JSON.stringify(all)
								}
							}).then(res=>{
								uni.setStorage({
									key:"table",
									data:JSON.stringify(all)
								})
							})
							//发送合并请求
						}
					})
				}
			},
			
			changeshow(index){
				let that = this
				if(index==that.longpress){
					that.longpress=null
				}else{
					that.longpress=index
				}
			},
			
			fabClick() {
				uni.navigateTo({
					url: "/pages/edit/edit"
				})
			},

		},
		onShow() {
			let that = this
			// uni.getStorage({
			// 	key:"school_id",
			// 	fail() {
			// 		uni.navigateTo({
			// 			url:"/pages/selectSchool/selectSchool"
			// 		})
			// 	}
			// })
			uni.getStorage({
				key: "table",
				success(res) {
					console.log(res)
					that.alllocal = JSON.parse(res.data)
				},
				fail() {

				}
			})
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key: "table",
				success(res) {
					console.log(res)
					that.alllocal = JSON.parse(res.data)
				},
				fail() {
			
				}
			})
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}
	
	// .uni-swipe_button-group{
	// 	top:31rpx
	// }

	.plusclass {
		width: 100vw;
		height: 100rpx;
		background-color: #F1F1F1;

		image {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 10rpx;
			top: 20rpx;
		}

		text {
			position: absolute;
			top: 20rpx;
			left: 10rpx;
			font-size: small;
		}
	}

	.svall {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;

		.alllocal_item {
			// margin-top: 31rpx;
			width: 692rpx;
			height: 126rpx;
			background-color: #59ADFB;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			color: aliceblue;
			.item_name{
				font-size: large;
			}
			.item_info{
				font-size: smaller;
			}
		}
	}
</style>
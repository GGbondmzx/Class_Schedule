<template>
	<view>
		<view class="hot_item" v-for="(item,index) in allInfo" :key="index" @click="gotowebView(item)">
			<view style="margin-top: 26rpx;font-size: 26rpx;color:#5D5D5D ;margin-left: 37.5rpx;margin-right: 37.5rpx;">
				{{item.title}}
			</view>
			<view
				style="position:absolute;font-size: 22rpx;color: #757575;bottom: 10rpx;right: 33rpx;">
				{{item.time}}
			</view>
			<view style="display: flex;justify-content: center;align-items: center;width: 750rpx;position: absolute;bottom: 0;">
							<view class="hot_line">
			</view>

			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				school_id:"",
				allInfo:[]
				
			}
		},
		methods: {
			getDate(){
				let that = this
				console.log(this.school_id)
				let school_id=this.school_id
				uni.request({
					url:"https://schoolpro.apiicu.com/api/getInfoList",
					method:"POST",
					data:{
						school_id
					},
					success(res) {
						that.allInfo=res.data.data.sort(function (a,b){
					        return b.id-a.id;
					      })
						console.log(JSON.stringify(res.data))
					},
					fail(error) {
						console.log('getDate+fail:'+error)
					}
				})
			},
			gotowebView(i) {
				uni.navigateTo({
					url: "../webview/webview?url=" + i.url
				})
			}
			
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key:"school_id",
				success(res) {
					that.school_id=res.data
					that.getDate()
				},
				fail(error) {
					
					that.school_id=1
					that.getDate()
				}
			})
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F1F1F1;
	}
	.hot_item {
		position: relative;
		width:750rpx;
		height: 114rpx;
	}
	.hot_line {

		width: 712rpx;

		border-bottom: 1px solid rgba(200, 200, 200, 0.4);

	}

</style>

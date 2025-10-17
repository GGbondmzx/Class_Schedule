<template>
	<view style="display:flex;justify-content: center;align-items: center;width: 100vw;height: 70vh;">
		<view class="main">
			<view class="tips">
				<text> ● 选择学院|专业|班级 导入课表 </text>
			</view>
			<view style="margin-bottom: 100rpx;">
				<uni-data-picker :localdata="items" placeholder="选择学院|专业|班级导入课表" popup-title="选择学院|专业|班级导入课表" @change="onchange"
					@nodeclick="onnodeclick"></uni-data-picker>
			</view>
			<view class="body">
				<button class="button" @click="submit" :disabled="isshow">立即导入
					<image src="../../static/import_buttom.png" mode="aspectFill"
						style="width: 34rpx;height: 38rpx;margin-left: 34rpx;"></image>
				</button>
			</view>
			
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				isshow: false,
				school_id:'',
				items: [],
				bh_id:"",
				isok:false
			}
		},
		methods: {
			submit(){
				let token = uni.getStorageSync('token')
				let that = this
				if(this.isok){
					that.$http({
						url:"ImportByClass",
						method:"POST",
						data:{
							token:token,
							bh_id:that.bh_id
						}
					}).then(res=>{
						console.log(res);
					})
				}
			},
			onchange(e) {
				let that = this
				const value = e.detail.value
				console.log(value)
				if(value.length==3){
					let bh_id= value[2]
					console.log(bh_id);
					that.bh_id=bh_id
					that.isok=true
				}
			},
			onnodeclick(node) {
				console.log(node)
			}
		}
		,
		onLoad(res){
			let that = this
			that.school_id=res.number
			console.log(that.school_id)
			let token = uni.getStorageSync('token')
			this.$http({
				url:"getClassList",
				method:"post",
				data:{
					"school_id":that.school_id,
					token:token
				}
			}).then(res=>{
				console.log(res)
				that.items=res.data.data
				console.log(res.data.data)
			})
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F1F1F1;
	}
	.tips {
		margin-top: 50rpx;
		margin-bottom: 70rpx;
		width: 100vw;
		height: 50rpx;
		font-weight: 200;
	}
	
	
	.body{
		margin-left: 38rpx;
		margin-right: 38rpx;
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
</style>
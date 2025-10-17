<template>
	<view>
		<view class="item">
			<text class="title">协议概述</text>
			<text class="info">
				请您在使用本服务前仔细阅读以下各项使用条款(以下简称条款)。若您使用本服务，则视为您同意接受本条款的所有内容，否则请您不要使用本服务(以下用"{{appname}}"代替开发者及运营者)。「{{appname}}」尊重并保护所有使用本服务用户的个人隐私。为了给您提供更准确、更有个性化的服务，「{{appname}}」会按照本隐私权协议政策的规定使用和披露您的个人信息，并将以高度的勤勉、审慎义务对待这些信息。
				「{{appname}}」保留对本协议进行修订的权利，修订的协议一旦公布即有效代替原来的协议。'
			</text>
		</view>
		<view class="item">
			<text class="title">隐私条例</text>
			<text class="info">
				「{{appname}}」在程序过程会收集用户昵称头像作为平台内容展示，在使用平台发言功能需要进行实名认证和手机认证，认证的信息平台会保证数据的安全性。若用户的言论涉及法律问题、校规问题、产生用户纠纷或者遭遇不可抗力，「{{appname}}」会按照本协议政策的规定合法使用和披露您的个人信息。
			</text>
		</view>
		<view class="item">
			<text class="title">数据使用条例</text>
			<text class="info">
「{{appname}}」，会尽最大努力保护用户数据的安全性且绝对不会主动外泄数据。但若因如没有及时修补漏洞等非主观原因而遭受非法攻击导致用户数据泄露的情况下，我们只能表示歉意，并及时通知用户，尽最大努力减少损失。若用户的言论涉及法律问题、校规问题、产生用户纠纷或者遭遇不可抗力，「{{appname}}」会按照本协议政策的规定合法使用和披露您的个人信息。若因用户自己的过失导致密码等数据泄露，由此导致的任何损失由用户承担，「{{appname}}」不承担任何责任。
「{{appname}}」不保证服务一定会满足用户的使用要求，也不保证服务不会被中断，对服务的及时性、安全性、准确性也不作担保。部分数据同步干第三方网站及某些算法实现的差异，数据可能会出现不一致的情况。用户使用服务后，需要对数据的准确性进行一定的判断。「{{appname}}」仅提供数据参考功能，不承担由于数据准确性而造成的用户损失。用户在本平台的产生的数据所有权归本平台所有。
			</text>
		</view>
		<view class="item">
			<text class="title">终止服务</text>
			<text class="info">
				「{{appname}}」有权因主观原因而终止本服务。同时保留拒绝对部分用户提供服务的权利，而无需对终止服务后的用户承担责任。
			</text>
		</view>
		<view class="date">
			<text style="position: absolute;right:42rpx ;">「{{appname}}」对本协议享有最终解释权</text>
		</view>
		<view class="date2">
			<text style="position: absolute;right:42rpx ;">{{appname}} 2023年11月</text>
		</view>
		<view class="dangban">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appname:""
			}
		},
		methods: {
			
		},
		onLoad() {
			let that = this
			uni.getStorage({
				key:"setting",
				success(res) {
					that.appname=res.data.appname
				}
			})
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F1F1F1;
	}
	.item{
		width: 667rpx;
		margin-left: 42rpx;
		margin-top: 20rpx;
		.title{
			margin-top: 20rpx;
			font-size: 31rpx;
			font-weight: bold;
		}
		.info{
			width: 100%;
			font-size: 26rpx;
			color: #969696;
			display: block;
			margin-top: 20rpx;
		}
	}
	.jieshi{
		text-align: center;
	}
	.date{
		position: relative;
		width: 750rpx;
		height: 60rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #969696;
	}
	.dangban{
		width: 100%;
		height: 200rpx;
	}
	.info{
		width: 100%;
		font-size: 26rpx;
		color: #969696;
		margin-top: 20rpx;
	}
	.date2{
		position: relative;
		width: 750rpx;
		height: 60rpx;
		font-size: 26rpx;
		color: #969696;
	}

</style>

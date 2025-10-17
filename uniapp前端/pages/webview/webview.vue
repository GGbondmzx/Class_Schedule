<template>
	<view>
		<web-view  :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		methods: {
			
		},
		onLoad(res) {
			if(JSON.stringify(res)=='{}'){
				this.src='http://ycit2022.apiicu.com/'
				console.log('add')
			}else{
				console.log(res)
				this.src=res.url
			}
		}
	}
</script>

<style>

</style>

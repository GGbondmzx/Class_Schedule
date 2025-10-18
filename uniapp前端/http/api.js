const BASE_URL = 'http://101.43.167.131:5119/api/'; // 后端的主机名 + 端口号

export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败(可能服务器没有开)',
					icon: 'fail'
				})
				reject(err)
			}
		})
	})
}
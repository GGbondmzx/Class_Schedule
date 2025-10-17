import axios from "axios";
axios.defaults.baseURL = 'https://v1api.apiicu.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token')
    if (config.method === 'post' && config.url !== 'admin/login') {
        let data = config.data
        config.data = { token: token, ...data }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

const myAxios = {
    get(url, params) {
        return axios({
            url:url,
            method:'get',
            params:params
        })
    },
    post(url, params) {
        return axios({
            url: url,
            method: 'post',
            data: params
        })
    }
}

export default myAxios
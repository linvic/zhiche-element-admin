import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import store from '../store'
import { Loading, MessageBox } from 'element-ui'
import { getToken, setToken } from '../config/auth'

// 配置全局的axios
Vue.prototype.$https = axios;
let baseURL = process.env.NODE_ENV == 'development' ? 'https://lbsts.zhichecn.com/web' : 'https://lbsdev.zhichecn.com:9999';


const service = axios.create({
	baseURL: baseURL,
	timeout: 5000, // 请求超时时间设置
	withCredentials:true, //应许携带cookie
})

let loadingAxios; // 接口请求loading
// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
    	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 在拦截器中强制为，简单请求
        // 在发送请求之前做些什么
		if (store.getters.token) {
			config.headers['X-Authority-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
		}
        loadingAxios = Loading.service({ fullscreen: true, text: '努力加载中', spinner: 'el-icon-loading', background: 'raba(0, 0, 0, 0.3)' }); // 创建loading
        
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {

		if (response.headers['x-authority-retoken']) { // 后台返回重置的token
			setToken(response.headers['x-authority-retoken']);
		}
        loadingAxios.close(); // 关闭loading
        // 对响应数据做些什么
        return response;
    },
    (error) => {
        loadingAxios.close(); // 关闭loading
        // 对响应错误做些什么
        if (error.response) {
            if (error.response.status === 401) {
                // 401 未登陆 则需跳转登陆页
                router.replace({
                    path: '/Login'
                })
            }
        }
        return Promise.reject(error.response.data);
    }
)

export default {
	//get请求
	get (url, params) {
		return new Promise((resolve, reject) => {
			url += (url.indexOf('?') < 0 ? '?' : '&') + param(params)
			service.get(url)
				.then(response => {
					if (response.data.code === -1002 || response.data.code === -1001) {
						MessageBox.confirm('您尚未登录或登录已超时', '请重新登录系统', {
							confirmButtonText: '确定',
							showCancelButton: false,
							showClose: false,
							closeOnClickModal: false,
							type: 'warning'
						}).then(() => {
							router.replace({
			                    path: '/Login'
			                })
						}).catch(() => {

						});
					}else{
						resolve(response.data);
					}
				}, err => {
					reject(err);
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	post (url, params) {
		return new Promise((resolve, reject) => {
			service.post(url, params)
				.then(response => {
					if (response.data.code === -1002 || response.data.code === -1001) {
							MessageBox.confirm('您尚未登录或登录已超时', '请重新登录系统', {
								confirmButtonText: '确定',
								showCancelButton: false,
								showClose: false,
								closeOnClickModal: false,
								type: 'warning'
							}).then(() => {
								store.dispatch('FedLogOut').then(() => {
									location.reload(); // 为了重新实例化vue-router对象 避免bug
								});
							}).catch(() => {

							});
					}else{
						resolve(response.data);
					}
				}, err => {
					reject(err);
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	put(url, params) {
		return new Promise((resolve, reject) => {
			service.put(url, params)
				.then(response => {
					if (response.data.code === -1002 || response.data.code === -1001) {
						MessageBox.confirm('您尚未登录或登录已超时', '请重新登录系统', {
							confirmButtonText: '确定',
							showCancelButton: false,
							showClose: false,
							closeOnClickModal: false,
							type: 'warning'
						}).then(() => {
								store.dispatch('FedLogOut').then(() => {
									location.reload(); // 为了重新实例化vue-router对象 避免bug
								});
						}).catch(() => {

						});
					}else{
						resolve(response.data);
					}
				}, err => {
					reject(err);
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	delete(url, params) {
		url += (url.indexOf('?') < 0 ? '?' : '&') + param(params)
		return new Promise((resolve, reject) => {
			service.delete(url)
				.then(response => {
					if (response.data.code === -1002 || response.data.code === -1001) {
						MessageBox.confirm('您尚未登录或登录已超时', '请重新登录系统', {
							confirmButtonText: '确定',
							showCancelButton: false,
							showClose: false,
							closeOnClickModal: false,
							type: 'warning'
						}).then(() => {
								store.dispatch('FedLogOut').then(() => {
									location.reload(); // 为了重新实例化vue-router对象 避免bug
								});
						}).catch(() => {

						});
					}else{
						resolve(response.data);
					}
				}, err => {
					reject(err);
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
}

/*
 * @param {a: 1, b: 222, c: 3}
 * @return "a=1&b=222&c=3"
 */
export function param(data) { // 拼接字符串
	let url = ''
	for (var k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += '&' + k + '=' + encodeURIComponent(value)
	}
	return url ? url.substring(1) : ''  // 删掉第一个字母&
}

import { getToken, setToken, removeToken } from '@/config/auth'
import api from '@/api/base'

const user = {
	state: {
		token: getToken(),
		name: '',
		roles: []
	},
	mutations: {
		SET_TOKEN: (state, token) => {
	    	state.token = token
	    },
	    SET_NAME: (state, name) => {
	    	state.name = name
	    },
	    SET_ROLES: (state, roles) => {
	    	state.roles = roles
	    }
	},
	actions: {
		// 用户名登录
		LoginByUsername({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				const params = 'acct=' + userInfo.acct + '&pwd=' + userInfo.pwd
				api.login(params).then(response => {
					if(response.code === 0) {
						const data = response.data;
						// 存储 token
						commit('SET_TOKEN', response.data.token);
						
						setToken(response.data.token);
					}
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		//获取用户登录信息详情
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				api.getUserInfo().then(response => {
					if (!response.data) { 
						reject('error')
					}
					const data = response.data
					let arr = []
					if (data.menuList) { // 验证返回的roles是否是一个非空数组
						if (data.menuList.length > 0) {
							for (let i=0;i < data.menuList.length; i++) {
								arr.push(data.menuList[i].menuCode)
							}
							commit('SET_ROLES', arr)
						}
					}
					commit('SET_NAME', data.employeeAcct)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登出
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeToken()
				resolve()
			})
		},
		// 前端 登出
		FedLogOut({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeToken()
				resolve()
			})
		},
	}
}

export default user

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

// state为状态数据
// 触发异步逻辑函数 action，
// mutations会去改变state的状态值，
// getters对外提拱state的值

// ① Vue Components 是我们的 vue 组件，组件会触发（dispatch）一些事件或动作，也就是图中的 Actions；
// ② 我们在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex 中，数据是集中管理的，我们不能直接去更改数据，所以会把这个动作提交（Commit）到 Mutations 中；
// ③ 然后 Mutations 就去改变（Mutate）State 中的数据；
// ④ 当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue Components 中去，组件展示更新后的数据，完成一个流程。
export default new Vuex.Store({
	state: {
		// 状态
	},
	mutations: {
		// 变化
	},
	actions: {
		//
	},
	modules: {
		user,
		permission
	},
	getters: {
		token: state => state.user.token,
		status: state => state.user.status,
		roles: state => state.user.roles,
		addRouters: state => state.permission.addRouters
	}
})
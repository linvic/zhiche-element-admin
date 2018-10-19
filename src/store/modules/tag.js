import {
	getTagList,
	setTagList,
	routeEqual,
	getRouteTitleHandled,
	routeHasExist,getHomeRoute
} from '@/config/auth'
import routers from '@/router'
import Cookies from 'js-cookie'
const closePage = (state, route) => {
	const nextRoute = getNextRoute(state.tagNavList, route)
	state.tagNavList = state.tagNavList.filter(item => {
		return !routeEqual(item, route)
	})
	router.push(nextRoute)
}

const user = {
	state: {
		taglist: [],
		sidebar: {
			opened: !+Cookies.get('sidebarStatus'),
			withoutAnimation: false
		},
		device: 'desktop',
		homeRoute: getHomeRoute(routers.options.routes, 'Home'),
	},
	mutations: {
		TOGGLE_SIDEBAR: state => {
			if (state.sidebar.opened) {
				Cookies.set('sidebarStatus', 1)
			} else {
				Cookies.set('sidebarStatus', 0)
			}
			state.sidebar.opened = !state.sidebar.opened
			state.sidebar.withoutAnimation = false
		},
		CLOSE_SIDEBAR: (state, withoutAnimation) => {
			Cookies.set('sidebarStatus', 1)
			state.sidebar.opened = false
			state.sidebar.withoutAnimation = withoutAnimation
		},
		TOGGLE_DEVICE: (state, device) => {
			state.device = device
		},
		SET_TAGLIST: (state, list) => {
			// 设置tag-list值
			let tagList = []
			if (list) {
				tagList = [...list]
			} else if (getTagList().length>0) {
				tagList = getTagList()
			} else {
				// 如果第一次取空值，就return，防止报错
				return;
			}
			if (tagList[0].name !== 'Home') tagList.shift()
				let homeTagIndex = tagList.findIndex(item => item.name === 'Home')
				if (homeTagIndex !== 0) {
				let homeTag = tagList.splice(homeTagIndex, 1)[0]
				tagList.unshift(homeTag)
			}
			state.taglist = tagList
			setTagList([...tagList])
		},
		CLOSE_TAG: (state, route) => {
			// 关闭一个tag
			let tag = state.taglist.filter(item => routeEqual(item, route))
			route = tag[0] ? tag[0] : null
			if (!route) return
					closePage(state, route)
		},
		ADD_TAG: (state, { route, type = 'unshift' }) => {
			// 新增一个tag
			let router = getRouteTitleHandled(route)
			if (!routeHasExist(state.taglist, router)) {
				if (type === 'push') state.taglist.push(router)
				else {
					if (router.name === 'Home') state.taglist.unshift(router)
					else state.taglist.splice(1, 0, router)
				}
				setTagList([...state.taglist])
			}
		}, 
	},
	actions: {
		toggleSideBar({ commit }) {
			commit('TOGGLE_SIDEBAR')
		},
		closeSideBar({ commit }, { withoutAnimation }) {
			commit('CLOSE_SIDEBAR', withoutAnimation)
		},
		toggleDevice({ commit }, device) {
			commit('TOGGLE_DEVICE', device)
		},
	}
}

export default user

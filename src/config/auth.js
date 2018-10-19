//获得用户的cookie，export出去
import Cookies from 'js-cookie';
import { objEqual } from '@/config/tools'

const TokenKey = 'Admin-Token';
const userName='userName';
const pwd='pwd';
const tagNavList = 'tagNavList';

// Token
export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token)
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}

//记住用户名

export function getUserName() {
	return Cookies.get(userName)
}

export function setUserName(name) {
	return Cookies.set(userName, name)
}

export function removeUserName() {
	return Cookies.remove(userName)
}

//记住密码

export function getPwd() {
	return Cookies.get(pwd)
}

export function setPwd(name) {
	return Cookies.set(pwd, name)
}

export function removePwd() {
	return Cookies.remove(pwd)
}

// tag-nav-list

export function getTagList() {
	let lists = localStorage.getItem(tagNavList)
	return lists ? JSON.parse(lists) : [];
}
export function setTagList(list) {
	return localStorage.setItem(tagNavList, JSON.stringify(list));
}
export function removeTagList() {
	return localStorage.removeItem(tagNavList);
}



/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'Home') => {
	let i = -1
	let len = routers.length
	let homeRoute = {}
	while (++i < len) {
		let item = routers[i]
		if (item.children && item.children.length) {
			let res = getHomeRoute(item.children, homeName)
			if (res.name) return res
		} else {
			if (item.name === homeName) {
				homeRoute = item
			}
		}
	}
	return homeRoute
}
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
	const params1 = route1.params || {}
	const params2 = route2.params || {}
	const query1 = route1.query || {}
	const query2 = route2.query || {}
	// return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)  -- 编辑时可打开多个窗口
	return (route1.name === route2.name)
}


export const getRouteTitleHandled = route => {
	let router = {...route}
	let meta = {...route.meta}
	if (meta.title && typeof meta.title === 'function') meta.title = meta.title(router)
	router.meta = meta
	return router
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
	let i = -1
	while (++i < times) {
		callback(i)
	}
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
	let len = tagNavList.length
	let res = false
	doCustomTimes(len, (index) => {
		if (routeEqual(tagNavList[index], routeItem)) res = true
	})
	return res
}


/**
 * 对比要添加的route，返回新的list
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
	const { name, path, meta } = newRoute
	let newList = [...list]
	if (newList.findIndex(item => item.name === name) >= 0) return newList
	else newList.push({ name, path, meta })
	return newList
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
	let res = {}
	if (list.length === 2) {
		res = getHomeRoute(list)
	} else {
		const index = list.findIndex(item => routeEqual(item, route))
		if (index === list.length - 1) res = list[list.length - 2]
		else res = list[index + 1]
	}
	return res
}
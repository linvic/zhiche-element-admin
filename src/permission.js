import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/config/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
	if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
	if (!permissionRoles) return true
	return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/Login'] // 免登录白名单

router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar
	if (getToken()) { // 判断token是否有
		/* has token*/
		if (to.path === '/Login') {
			next({ path: '/' })
			NProgress.done()
		} else {
			if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
				store.dispatch('GetUserInfo').then(res => { // 拉取user_info
					let menuList = res.data.menuList;
          if (menuList && menuList.length > 0) {
						
						let roles = [];
						for (let i=0;i < menuList.length; i++) {
							roles.push(menuList[i].menuCode)
						}
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
							next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
						})

					} else {
						store.dispatch('FedLogOut').then(() => {
							Message.error( '对不起，您没有可访问的菜单权限,请联系管理员')
							next({ path: '/' })
						})
					}

				}).catch((err) => {
					store.dispatch('FedLogOut').then(() => {
						Message.error( '验证失败，请重新登录')
						next({ path: '/' })
					})
				})
			} else { 
				// 动态改变权限的需求
				if (hasPermission(store.getters.roles, to.meta.roles)) { // 判断目标路由的权限是否有某一个权限存在路由表中
					next()
				} else {
					next({ path: '/401', replace: true }) // 目标路由权限列表中，在动态路由表中没有配置项。  即无权限访问
				}
			}
		}
	} else {
		/* has no token*/
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			next('/Login') // 否则全部重定向到登录页
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done() // finish progress bar
})

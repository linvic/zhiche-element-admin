import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//所有权限通用路由表 constantRouterMap
export const constantRouterMap = [
	{
		path: '/',
		name: 'Layout',
        redirect: '../Home',
        component: resolve => require(['../components/common/Layout'], resolve),
        children:[
        	{
				path: '/Home',
				name: 'Home',
				component: resolve => require(['../pages/Home/Home'], resolve)
        	}
        ]
    },
	{
		path: '/Login',
		name: 'Login',
		component: resolve => require(['../pages/Login'], resolve)
	}
]
 //        	// 车辆管理
 //        	{
	// 			path: '/carManager/carInfo',
	// 			name: 'carInfo',
	// 			component: resolve => require(['../pages/carManager/carInfo'], resolve)
 //        	},
 //        	// 系统管理-店铺管理
 //        	{
	// 			path: '/sysManager/shopsManager',
	// 			name: 'shopsManager',
	// 			component: resolve => require(['../pages/sysManager/shopsManager'], resolve)
 //        	},
 //        	// 系统管理-角色管理
 //        	{
	// 			path: '/sysManager/roleManager',
	// 			name: 'roleManager',
	// 			component: resolve => require(['../pages/sysManager/roleManager'], resolve)
 //        	},
 //        	// 系统管理-日志
 //        	{
	// 			path: '/sysManager/log',
	// 			name: 'log',
	// 			component: resolve => require(['../pages/sysManager/log'], resolve)
 //        	}
 //        ]
	// },
// hash
// history
export default new Router({
	mode: 'history',
	routes: constantRouterMap
})


//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
	{
		path: '/',
		name: 'Layout',
        redirect: '../Home',
		meta: {
			icon: 'small',
			roles: ['INDEX','CARINFO'] // you can set roles in root nav
		},
        component: resolve => require(['../components/common/Layout'], resolve),
        children:[
        	{
				path: '/Home',
				name: 'Home',
				component: resolve => require(['../pages/Home/Home'], resolve),
				meta: {
					title: '首页',
					roles: ['INDEX']
				}
        	},
        	{
				path: '/carManager/carInfo',
				name: 'carInfo',
				component: resolve => require(['../pages/carManager/carInfo'], resolve),
				meta: {
					title: '车辆信息',
					roles: ['CARINFO']
				}
        	},
        	// 系统管理-店铺管理
        	{
				path: '/sysManager/shopsManager',
				name: 'shopsManager',
				component: resolve => require(['../pages/sysManager/shopsManager'], resolve),
				meta: {
					title: '店铺管理',
					roles: ['XTGL-DPGL']
				}
        	},
        	// 系统管理-角色管理
        	{
				path: '/sysManager/roleManager',
				name: 'roleManager',
				component: resolve => require(['../pages/sysManager/roleManager'], resolve),
				meta: {
					title: '角色管理',
					roles: ['XTGL-JSGL']
				}
        	},
        	// 系统管理-日志
        	{
				path: '/sysManager/log',
				name: 'log',
				component: resolve => require(['../pages/sysManager/log'], resolve),
				meta: {
					title: '日志',
					roles: ['XTGL-RZ']
				}
        	}
		]
	},
	{ path: '/401', component: resolve => require(['../pages/401'], resolve) },
	{ path: '/404', component: resolve => require(['../pages/404'], resolve) },
	{ path: '*', component: resolve => require(['../pages/404'], resolve) }
];
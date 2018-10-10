<template>
	<div :class="{'sidebar': true,'isCollapse': isCollapse}">
		<div class="toggle-menu" @click="isCollapse = !isCollapse"><i class="el-icon-web-menu"></i></div>
		<el-menu class="site-menu" text-color="#a3afb7" active-text-color="#ffffff" background-color="#263238" :default-active="$route.path" router unique-opened :collapse="isCollapse">
			<!-- <el-menu-item index="0" class="toggle-menu" @click="isCollapse = !isCollapse"><i class="el-icon-web-menu"></i></el-menu-item> -->
			<template v-for="(item,index) in treeData">

				<el-menu-item :index="item.path" v-if="!item.children"><i :class="item.icon"></i><span>{{item.name}}</span></el-menu-item>

				<el-submenu :index="'' + index" v-else>
					<template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
					
					<template v-for="itemTwo in item.children">
						
						<el-menu-item :index="itemTwo.path">
							<span>{{itemTwo.name}}</span>
						</el-menu-item>

					</template>

				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				treeData: [{
					path: '/Home',
					icon: 'el-icon-web-home',
					name: '首页',
					children: null
				},{
					path: '/',
					icon: 'el-icon-web-heart',
					name: '车辆管理',
					children: [{
						path: '/carManager/carInfo',
						icon: '',
						name: '车辆信息',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-customer',
					name: '客户管理',
					children: [{
						path: '/Home1',
						icon: '',
						name: '客户信息',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '贷款申请',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-globe',
					name: '商机管理',
					children: [{
						path: '/Home1',
						icon: '',
						name: '跟进管理',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '战败客户',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '成交客户',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-jianguanmoshi',
					name: '统计报表',
					children: [{
						path: '/Home1',
						icon: '',
						name: '销售统计',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '客户统计',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-users',
					name: '推广管理',
					children: [{
						path: '/Home1',
						icon: '',
						name: '消息推送',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '广告管理',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-setting',
					name: '系统设置',
					children: [{
						path: '/sysManager/shopsManager',
						icon: '',
						name: '门店管理',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '用户管理',
						children: null
					},{
						path: '/sysManager/roleManager',
						icon: '',
						name: '角色管理',
						children: null
					},{
						path: '/sysManager/log',
						icon: '',
						name: '系统日志',
						children: null
					}]
				}]
			}
		},
		created() {
		},
		methods: {
		}
	}
</script>
<style scoped>
	.sidebar {
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 0;
		width: 220px;
		background: #263238;
		overflow-y: auto;
		
		-webkit-transition: width 0.38s;
    	transition: width 0.38s;
	}
	.site-menu {
		border: none;
	}
	.site-menu:not(.el-menu--collapse) {
		width: 220px;
		min-height: 100px;
	}
	.toggle-menu {
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		background: #1e282d !important;
		color: #909399 !important;
	}
	.sidebar.isCollapse {
		width: 64px;
	}
	.sidebar.isCollapse .el-icon-web-menu {
    	-webkit-transform: rotate(270deg);
	    transform: rotate(270deg);
	    -webkit-transition: .38s;
	    transition: .38s;
	    -webkit-transform-origin: 50% 50%;
	    transform-origin: 50% 50%;
	}
	/*text-color="#a3afb7" active-text-color="#ffffff" background-color="#263238" */
	/*.site-menu {
		padding-bottom: 20px;
		background: none;
		border: none;
	}
	.site-menu .el-submenu__title , .el-menu-item{
		color: #a3afb7;
	}
	,/deep/ .el-submenu__title:hover{
		background: #263238;
	}
	.site-menu li:hover {
		background: #1e282d;
	}
	.site-menu /deep/ .el-menu.el-menu--inline {
		background: #1e2e2d;
	}
	.el-menu-item.is-active {
		color: #ffffff;
	}*/
	/deep/ .el-menu-item.is-active {
		background: #1e282d !important;
	}
</style>
<template>
	<div class="sidebar">
		<el-scrollbar>
			<h1 class="sidebar_logo">
				<img src="@/assets/images/logo2.png" v-if="isCollapse">
				<img src="@/assets/images/logo.png" v-else>
			</h1>
			<el-menu class="site-menu" :default-active="$route.path" router unique-opened :collapse="isCollapse">


				<template v-for="item in routes" v-if="!item.hidden&&item.children">
					<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
											 :key="item.children[0].name">
						<el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
							<i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
							<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
						</el-menu-item>
					</router-link>
					<el-submenu v-else :index="item.name||item.path" :key="item.name">
						<template slot="title">
							<i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
							<span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
						</template>

						<template v-for="child in item.children" v-if="!child.hidden">
							<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

							<router-link v-else :to="item.path+'/'+child.path" :key="child.name">
								<el-menu-item :index="item.path+'/'+child.path">
									<i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
									<span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
								</el-menu-item>
							</router-link>
						</template>
					</el-submenu>
				</template>

			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
		props: {
			isCollapse: {
				type: Boolean
			},
			isNest: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			routes() {
				return this.$store.state.permission.routers
			},
		},
		data() {
			return {}
		},
		created() {
		},
		methods: {
			hasOneShowingChildren(children) {
				const showingChildren = children.filter(item => {
					return !item.hidden
				})
				if (showingChildren.length === 1) {
					return true
				}
				return false
			},
		},
		watch: {
			'isCollapse' (val) {
				console.log(val)
				this.isCollapse = val
			},
		}
	}
</script>
<style scoped>
	/deep/ .el-scrollbar {
		height: 100%;
	}
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden !important;
	}
	.sidebar {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 208px;
		background: #001529;
		overflow: hidden;
		-webkit-transition: width 0.38s;
    	transition: width 0.38s;
    	box-shadow: 2px 0px 6px 0px rgba(0,21,41,0.35);
    	z-index: 999;
	}
    .isCollapse .sidebar {
		width: 64px;
    }
	.site-menu {
		border: none;
		background: #001529;
		color: #a3afb7;
	}
	.site-menu:not(.el-menu--collapse) {
		width: 208px;
		min-height: 100px;
	}
	.sidebar_logo {
		display: inline-block;
		width: 100%;
		text-align: center;
		height: 64px;
		background: #002140;
	}
	.sidebar_logo img {
		display: inline-block;
	    margin-top: 10px;
	}
	/deep/ .el-menu-item,/deep/ .el-submenu__title,/deep/ .el-menu-item i {
		color: rgba(255,255,255,.65);
	}
	/deep/ .el-submenu__title:hover,/deep/ .el-menu-item:hover,/deep/ .el-menu-item:focus,/deep/ .el-menu-item.is-active {
		background: #2795FF;
		color: #fff;
	}
	/deep/ .el-submenu__title:hover i,/deep/ .el-menu-item:hover i,/deep/ .el-menu-item:focus i,/deep/ .el-menu-item.is-active.el-menu-item i {
		color: #fff;
	}
	/deep/ .el-menu {
		background: #001529;
	}
	/deep/ .el-submenu .el-menu-item > span {
		padding-left: 10px;
	}
	/deep/ .el-submenu.is-opened ul.el-menu {
		background: #000C17;
	}
	/deep/ .el-menu-item,/deep/ .el-submenu__title {
		height: 50px;
		line-height: 50px;
	}
	/deep/ .el-submenu .el-menu-item {
		height: 42px;
		line-height: 42px;
	}
</style>
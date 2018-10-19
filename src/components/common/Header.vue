<template>
	<div class="header">
		<el-row>
			<div class="toggle-menu" @click="changeCollapse">
				<i class="el-icon-web-menu"></i>
			</div>

			<div class="breadcrumb">
				<el-breadcrumb separator="/" label="1">
					<el-breadcrumb-item v-for="(item,index) in breadCrumbList" v-if="item" :key="index">{{item}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="header_tool">
				<div class="header_tool_seach">
					<el-input
					    placeholder="请输入车架号/车主姓名/SN号"
					    suffix-icon="el-icon-search"
					    v-model="input1">
					</el-input>
				</div>
				<div class="header_tool_menu">
					<el-badge :value="99+'+'">
						<i class="el-icon-bell"></i>
					</el-badge>
				</div>
				
				<el-dropdown trigger="click" class="header_tool_dropdown">
					<div class="el-dropdown-link">
						<div class="header_tool_user">{{UserAccount | filtersFirstStr}}</div><i class="el-icon-caret-bottom el-icon--right"></i>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="dialogResetPwd = true">重置密码</el-dropdown-item>
						<el-dropdown-item @click.native="LogOff()">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-row>

		<el-dialog v-if="dialogResetPwd" title="重置密码" :visible.sync="dialogResetPwd" append-to-body width="600px">
			<resetPwd @closeDialog="closeDialog"></resetPwd>
		</el-dialog>
	</div>
</template>

<script>
	import resetPwd from './resetPwd'
	export default {
		components: {
			resetPwd
		},
		data () {
			return {
				input1: '',
				breadCrumbList: [],
				UserAccount: 'admin',
				dialogResetPwd: false // 重置密码弹层
			}
		},
		created(){
			this.getBreadcrumb()
		},
		methods: {
			closeDialog(name) {
				this[name] = false;
			},
			changeCollapse() {
				// 修改 sidebar 收起状态
				this.$store.dispatch('toggleSideBar')
			},
			getBreadcrumb() {
				// 获取面包屑内容
				this.breadCrumbList = []
				for(var item of this.$route.matched) {
					item.meta && item.meta.title && this.breadCrumbList.push(item.meta.title)
				}
			},
			// 退出登录
			LogOff() {
				this.$confirm('确认退出当前用户？', '退出登录', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('LogOut').then(() => {
						this.$router.replace('/Login');
						location.reload()// 为了重新实例化VUE路由器对象以避免错误
					})
				}).catch(() => {
				});
			}
		},
		watch: {
			'$route' () { // 监听路由
				this.getBreadcrumb()
			}
		},
		filters: {
			filtersFirstStr: function(txt) {
			return txt.substring(0, 1).toLocaleUpperCase();
			}
		}
	}
</script>
<style scoped>
	.header {
		position: absolute;
		top: 0;
		right: 0;
		left: 208px;
		min-height: 64px;
		background-color: #fff;
		-webkit-transition: left 0.38s;
		transition: left 0.38s;
	}
	.header .header_tool {
		display: inline-block;
		float: right;
	}
	.header .header_tool .header_tool_menu {
		display: inline-block;
		margin-right: 27px;
		color: #000;
		cursor: pointer;
		font-size: 16px;
		vertical-align: middle;
	}
	.header .header_tool .header_tool_seach {
		display: inline-block;
		margin-right: 27px;
		height: 32px;
		line-height: 32px;
	}
	.header .header_tool .header_tool_seach /deep/ input {
		width: 220px;
		height: 32px;
		line-height: 32px;
		font-size: 12px;
		border-radius: 16px;
	}
	.header .header_tool .header_tool_seach /deep/ .el-input--medium .el-input__icon {
		line-height: 32px;
	}
	.header .header_tool .header_tool_user {
		display: inline-block;
		width: 24px;
		height: 24px;
		line-height: 24px;
		background: #2D98FF;
		color: #fff;
		border-radius: 50%;
		vertical-align: middle;
		text-align: center;
	}
	.header_tool_dropdown {
		cursor: pointer;
		height: 64px;
		line-height: 64px;
		margin-right: 20px;
	}

	.isCollapse .header {
		left: 64px;
	}

	.toggle-menu {
		display: inline-block;
		width: 24px;
		line-height: 64px;
		text-align: center;
		cursor: pointer;
		font-size: 22px;
		margin-left: 20px;
	}
	.isCollapse .el-icon-web-menu {
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
		-webkit-transition: .38s;
		transition: .38s;
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
	}

	/*面包屑*/
	.breadcrumb {
		display: inline-block;
		line-height: 64px;
		margin-left: 30px;
	}
</style>
<template>
	<div class="header">
		<el-row>
			
			<h1 class="header_logo">
				<img src="@/assets/images/logo2.png">
			</h1>
			<div class="header_tool">
				<el-dropdown trigger="click" class="header_tool_dropdown">
					<div class="el-dropdown-link">
						<i class="el-icon-web-user-circle"></i> {{UserAccount}}<i class="el-icon-arrow-down el-icon--right"></i>
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
			UserAccount: '超级管理员',
			dialogResetPwd: false // 重置密码弹层
		}
	},
	created(){
		
	},
	methods: {
		closeDialog(name) {
			this[name] = false;
		},
		// 退出登录
		LogOff() {
			this.$confirm('确认退出当前用户？', '退出登录', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$router.replace('/Login');
			}).catch(() => {       
			});
		}
	}
}
</script>
<style scoped>
	.header {
		width: 100%;
		min-height: 60px;
		background-color: #4e97d9;
	}
	.header .header_logo {
		display: inline-block;
	}
	.header .header_logo img {
		display: block;
		width: 142px;
		height: 38px;
		margin-top: 11px;
		margin-left: 20px;
	}
	.header .header_tool {
		display: inline-block;
		float: right;
	}
	.header_tool_dropdown {
		cursor: pointer;
	    height: 60px;
	    color: #fff;
	    line-height: 60px;
	    margin-right: 20px;
	}
</style>
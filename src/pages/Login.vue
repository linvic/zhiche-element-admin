<template>
	<div v-loading="loading" class="login-page">
		<div class="header">
       <i class="header-logo"></i>
			 <span class="header-title">智车科技车辆风险管理系统</span>
		</div>
		<div class="login-form">
			<h2 class="login-form-title">VVMS</h2>
			<el-form label-position="right" ref="loginForm" :model="loginForm" :rules="rules" status-icon @keyup.enter.native="submitForm('loginForm')" >
				<el-form-item prop="acct" class="acct">
					<el-input v-model="loginForm.acct" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="pwd" class="pwd">
					<el-input v-model="loginForm.pwd" type="password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item class="remind-pwd">
					<el-checkbox v-model="remindPwd" class="remind-text">记住密码</el-checkbox>
				</el-form-item>
				<div class="tips">
					{{msg}}
				</div>
				<el-form-item class="text-center">
					<el-button type="primary" @click="submitForm('loginForm')" class="login-ing">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import api from '@/api/base'
export default {
	data () {
		var validateAcc = (rule, value, callback) => {
			var telmatch = /^1[0-9]{10}$/;
			if (!value) {
				return callback(new Error('请输入账号'));
			}
			// else if (!telmatch.test(value)) {
			//     return callback(new Error('请输入正确的手机号'));
			// }
			else {
				callback();
			}
		}
		var validatePwd = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入密码'));
			} else if (value.length < 6) {
				return callback(new Error('密码位数应不少于6位'));
			} else {
				callback();
			}
		}
		return {
      remindPwd:false,
      msg:"",
			loginForm: {
				acct: '',
				pwd: ''
			},
			rules: {
				acct: [
					{ validator: validateAcc, trigger: 'blur' }
				],
				pwd: [
					{ validator: validatePwd, trigger: 'blur'}
				]
			},
			loading: true
		}
	},
	mounted(){
		this.loading = false;
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$store.dispatch('LoginByUsername', this.loginForm).then((result)=>{
						if (result.code === 0) {
              this.msg=""
							this.$router.replace('/');
						} else {
						  this.msg= result.msg
						}
					})

				} else {
					return false;
				}
			});
		},
	}
}
</script>
<style lang="scss" scoped>
	.header{
		width: 100%;
		height: 64px;
		background:rgba(0,13,26,1);
		.header-logo{
			width: 28px;
			display: block;
			float: left;
			margin-top: 20px;
			height: 26px;
			margin-left: 40px;
			background: url('../assets/images/header-logo.png') no-repeat center center;
		}
		.header-title{
			color:rgba(211,191,116,1);
			font-size:26px;
			line-height: 64px;
			padding-left: 13px;
		}
	}
	.login-page {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		min-width: 1000px;
		zoom: 1;
		background-repeat: no-repeat;
		background-size: cover;
		-webkit-background-size: cover;
		-o-background-size: cover;
		background-position: center 0;
		background-image: url('../assets/images/login.jpg');
	}
	.login-form {
		position: absolute;
		background:rgba(255,255,255,1);
		border:1px solid rgba(243,243,244,1);
		top: 50%;
		left: 50%;
		padding: 36px 41px;
		width: 300px;
		margin-left: -192px;
		height: 287px;
		margin-top: -180.5px;
	}
	.login-form h2 {
		text-align: center;
		font-weight:bold;
		color:rgba(0,0,0,0.65);
		font-size:24px;
		margin-bottom: 36px;
		letter-spacing: 1px;
	}
	.login-form .copy {
		text-align: center
	}
	.login-form /deep/ .el-input__inner {
		-webkit-box-shadow: 0 0 0 1000px white inset;
		/* 去除webkit下input黄色底 */
	}
	.login-ing{
		width: 100%;
		z-index: 1;
		position: relative;
		font-size:18px;
	}
	.login-ing:after {
		content: '';
		position: absolute;
		display: block;
		height: 17px;
		background: rgba(39,149,255,1);
		opacity: 0.9893000000000001;
		-webkit-filter: blur(7px);
		filter: blur(7px);
		bottom: 0px;
		left: 20px;
		right: 20px;
		z-index: -1;
	}
	.text-center /deep/{
		text-align: center;
	}
	.remind-pwd /deep/{
		margin-bottom: 0;
	}
	.tips /deep/{
		margin-bottom: 0;
		margin-top: 0;
		height: 20px;
		line-height: 20px;
		text-align: center;
		color: red;
		padding-bottom: 5px;
	}
	@media screen and (max-width: 510px) {
		.login-form {
			box-sizing: border-box;
			width: 320px;
			margin-left: -160px;
			padding: 10px;
		}
		.login-form h2 {
			margin-bottom: 10px;
		}
		.text-center {
			margin-top: 5px;
		}
	}
	.acct{
		margin-bottom: 26px;
	}
	.pwd{
		margin-bottom: 10px;
	}
	.remind-pwd /deep/ .el-checkbox__label{
		font-size:14px;
		font-weight:400;
		color:rgba(0,0,0,0.65);
	}
</style>
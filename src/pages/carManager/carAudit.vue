<template>
	<div>
		<el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="120px">
			
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户编号">
						<p>---</p>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="创建时间">
						<p>---</p>
					</el-form-item>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="店铺名称" prop="user_account">
						<el-input v-model="form.user_account"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				</el-col>

			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="密码" prop="user_pwd">
						<el-input v-model="form.user_pwd" type="password"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="确认密码" prop="user_pwd2" required>
						<el-input v-model="form.user_pwd2" type="password"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="真实姓名" prop="user_name">
						<el-input v-model="form.user_name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="性别" required>
						<el-select v-model="form.sex" placeholder="请选择">
							<el-option label="男" :value="0"></el-option>
							<el-option label="女" :value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="手机" prop="user_telephone">
						<el-input v-model="form.user_telephone"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="店铺地址" prop="form.address" required>
						<div>
							<div style="display:inline-block;width: 96px;float: left">
								<el-select v-model="form.province" placeholder="省" @change="changeProvince">
									<el-option :label="item.areaName" :value="item.areaCode" v-for="(item,index) in provinces" :key="item.areaCode"></el-option>
								</el-select>
							</div>
							
							<div style="display:inline-block;margin-left: 10px;width: 96px;float: left">
								<el-select v-model="form.city" placeholder="市" @change="changeCity">
									<el-option :label="item.areaName" :value="item.areaCode" v-for="(item,index) in citys" :key="item.areaCode"></el-option>
								</el-select>
							</div>
							<div style="display:inline-block;margin-left: 10px;width: 96px;float: left">
								<el-select v-model="form.country" placeholder="区">
									<el-option :label="item.areaName" :value="item.areaCode" v-for="(item,index) in countrys" :key="item.areaCode"></el-option>
								</el-select>
							</div>
						</div>
	            		<el-input v-model="form.address" placeholder="请输入街道门牌号" style="margin-top: 8px;"></el-input>
	        		</el-form-item>
				</el-col>
			</el-row>
				
			<el-row>
				<el-col :span="24">
					<el-form-item label="店铺地址照片" required>
						<el-upload
							action="/"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-form-item>
				<el-button type="primary" @click="submit()">保存</el-button>
				<el-button @click="closeDialog()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			form: {
				user_account: '', // 用户账号
				user_telephone: '', // 用户手机号
				user_pwd: '', // 用户密码
				user_name: '', // 用户姓名
				job_number: '', // 用户工号
				user_img: '', // 工作照
				position_id: '', // 所属职位
				user_email: '', // 电子邮箱
				user_desc: '' // 用户备注
			},
			form_rules: {
				org_id: [
					{ required: true, message: '请选择所属组织', trigger: 'change' }
				],
				user_account: [
					{ required: true, message: '请输入用户账号', trigger: 'blur' }
				],
				user_telephone: [
					{ required: true, message: '请输入用户手机号', trigger: 'blur' }
				],
				user_pwd: [
					{ required: true, message: '请输入用户登录密码', trigger: 'blur' },
					{ min: 6, message: '长度不少于6位', trigger: 'blur' }
				],
				user_name: [
					{ required: true, message: '请输入用户姓名', trigger: 'blur' }
				],
				position_id: [
					{ required: true, message: '请选择所属职位', trigger: 'change' }
				],
				user_desc: [
					{ required: true, message: '请输入用户备注', trigger: 'blur' }
				]
			},
			positions: [] // 部门下的职位
		}
	},
	props: {
		id: {
			type: Number
		},
		pid: {
			type: [Number, String]
		}
	},
	created() {
		console.log(this.id)
		this.getDataTree();
	},
	computed: {
	},
	watch: {
		// 错误写法，箭头函数会影响作用域
		// 'form.org_id': (val) => {
		//     console.log(val);
		//     this.getPositions(val); // 监听到变化就更新职位列表
		// },
		'form.org_id': function(val) {
			this.getPositions(val); // 监听到变化就更新职位列表
		}
		// 另一种正确写法
		// 'form.org_id' (val) {
		//     console.log(val);
		//     this.getPositions(val); // 监听到变化就更新职位列表
		// }
	},
	methods: {
		getPositions(id) { // 根据组织id获取职位数据
			this.$https.get('/api/company_user_unit_position/page', {
				params: {
					currentPage: 1,
					pageSize: 999,
					unit_id: id
				}
			}).then((result) => {
				if (result.data.code == 0) {
					this.positions = result.data.data.Items;
				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.data.message
					})
				}
			})
		},
		getDataTree() { // 获取树结构
			this.$https.get('/api/company_unit/GetUnitsTree').then((result) => {
				if (result.data.code == 0) {
					this.options = result.data.data;
					
					if (this.pid && this.pid != 0) { // 新增时，取左侧已选类别
						this.form.org_id = this.pid;
						this.optionsValue = this.getTreeDeepArr(this.pid, this.options);
					}
					if (this.id) { // 编辑
						this.getOldData();
					}
				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.data.message
					})
				}
			})
			
		},
		getOldData() { // 获取编辑数据
			this.$https.get('/api/Account/get_users_details?user_id=' + this.id).then((result) => {
				if (result.data.code == 0) {
					let _data = result.data.data;
					this.form.org_id = _data.org_id;
					this.optionsValue = this.getTreeDeepArr(_data.org_id, this.options);
			
					this.form.user_account = _data.user_account;
					this.form.user_telephone = _data.user_telephone;
					this.form.user_name = _data.user_name;
					this.form.job_number = _data.job_number;
					this.form.user_img = _data.user_img;
					this.form.position_id = _data.position_id == 0 ? '' : _data.position_id.toString();
					this.form.user_email = _data.user_email;
					this.form.user_desc = _data.user_desc;
				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.data.message
					})
				}
			})
		},
		submit() { // 提交
			this.$refs.form.validate((valid) => {
				if (valid) {
					let _postData = this.form;
					if (this.id) { // 编辑
						_postData.user_id = parseInt(this.id);
						this.$https.post('/api/Account/update_users', _postData).then((result) => {
							if (result.data.code == 0) {
								this.$message({
									type: 'success',
									showClose: true,
									message: '编辑成功',
									duration: 1500,
									onClose: () => {
										// 关闭当前dialog，
										this.closeDialog();
										// 刷新列表
										this.$emit('parentGetDataList');
									}
								})
							} else {
								this.$message({
									type: 'error',
									showClose: true,
									message: result.data.message
								})
							}
						})
					} else { // 新增
						this.$https.post('/api/Account/create_users', _postData).then((result) => {
							if (result.data.code == 0) {
								this.$message({
									type: 'success',
									showClose: true,
									message: '添加成功',
									duration: 1500,
									onClose: () => {
										// 关闭当前dialog，
										this.closeDialog();
										// 刷新列表
										this.$emit('parentGetDataList');
									}
								})
							} else {
								this.$message({
									type: 'error',
									showClose: true,
									message: result.data.message
								})
							}
						})
					}
					
				} else {
					console.error('验证失败');
					return false;
				}
			});
		},
		closeDialog(name) { // 关闭当前
			// this.$refs.form.resetFields(); // 重置表单
			if (!name) {
				this.$emit('closeDialog', 'dialogCarAudit'); // 执行父组件关闭方法
			} else {
				this.$emit('closeDialog', name); // 执行父组件关闭方法
			}
		}
	}
}
</script>
<style scoped>
</style>
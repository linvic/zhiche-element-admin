<template>
	<div style="height: 100%;">
		<div class="container">
			<div class="contents">
				<div class="content-left">
					<ul>
						<li class="left-info" :class="chose?'active':''" @click="chose = !chose">基本信息</li>
						<li class="left-info" :class="!chose?'active':''" @click="chose = !chose">业务授权</li>
					</ul>
				</div>
				<div class="content-right" v-if="chose">
					<el-form class="user-form" ref="form" status-icon size="small" :rules="form_rules" :model="form" label-width="100px" label-suffix="：">
						<div class="form-title">基本信息</div>
						<el-form-item label="所属级别" prop="name">
							<el-cascader :options="options" change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="用户名" prop="name">
							<el-input v-model="form.name" placeholder="请输入用户名"></el-input>
						</el-form-item>
						<el-form-item label="" prop="name">
							<el-checkbox v-model="form.name">负责人</el-checkbox>
						</el-form-item>
						<el-form-item label="密码" prop="user_pwd">
							<el-input v-model="form.user_pwd" type="password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="再次密码" prop="user_pwd2" required>
							<el-input v-model="form.user_pwd2" type="password" placeholder="请再次输入密码"></el-input>
						</el-form-item>
						<el-form-item label="真实姓名" prop="name">
							<el-input v-model="form.name" placeholder="请输入真实姓名"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="name">
							<el-input v-model="form.name" placeholder="请输入性别"></el-input>
						</el-form-item>
						<el-form-item label="手机" prop="name">
							<el-input v-model="form.name" placeholder="请输入手机"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="name">
							<el-input v-model="form.name" placeholder="请输入邮箱"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit()">更新信息</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="content-right" v-else>
					<div class="form-title">业务授权</div>
					<div class="business">
						 <ul class="list">
							 <li class="clause">
								 <h2 class="clause-title">数据范围</h2>
								 <p class="clause-content">除所属级别的数据外，可授权其他级别数据</p>
								 <div class="switch">
									 <el-button type="text" style="margin-right: 20px" @click="dialogSet = true">设置</el-button>
								 </div>
							 </li>
						 </ul>
					</div>
				</div>

			</div>
		</div>
		<el-dialog title="数据范围" :visible.sync="dialogSet" width="482px">
			<div class="dialogSetTree">
				<el-tree
					:data="treeData"
					show-checkbox
					:expand-on-click-node="false"
					default-expand-all
					node-key="id"
					ref="tree"
					:indent="35"
					highlight-current
					@check-change="handleCheckChange"
					:props="defaultProps">
				</el-tree>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogSet = false">取 消</el-button>
				<el-button size="small" type="primary" @click="dialogSet = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
import api from '@/api/sysManager'
export default {
	data () {
		return {
			chose: true,
			dialogSet: false,
			treeData: [],
			defaultProps: {
                label: 'name',
                children: 'childs'
            },
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
			options: [{
				value: 'zhinan',
				label: '指南',
				children: [{
					value: 'shejiyuanze',
					label: '设计原则',
					children: [{
						value: 'yizhi',
						label: '一致'
					}, {
						value: 'fankui',
						label: '反馈'
					}, {
						value: 'xiaolv',
						label: '效率'
					}, {
						value: 'kekong',
						label: '可控'
					}]
				}, {
					value: 'daohang',
					label: '导航',
					children: [{
						value: 'cexiangdaohang',
						label: '侧向导航'
					}, {
						value: 'dingbudaohang',
						label: '顶部导航'
					}]
				}]
			}, {
				value: 'zujian',
				label: '组件',
				children: [{
					value: 'basic',
					label: 'Basic',
					children: [{
						value: 'layout',
						label: 'Layout 布局'
					}, {
						value: 'color',
						label: 'Color 色彩'
					}, {
						value: 'typography',
						label: 'Typography 字体'
					}, {
						value: 'icon',
						label: 'Icon 图标'
					}, {
						value: 'button',
						label: 'Button 按钮'
					}]
				}, {
					value: 'form',
					label: 'Form',
					children: [{
						value: 'radio',
						label: 'Radio 单选框'
					}, {
						value: 'checkbox',
						label: 'Checkbox 多选框'
					}, {
						value: 'input',
						label: 'Input 输入框'
					}, {
						value: 'input-number',
						label: 'InputNumber 计数器'
					}, {
						value: 'select',
						label: 'Select 选择器'
					}, {
						value: 'cascader',
						label: 'Cascader 级联选择器'
					}, {
						value: 'switch',
						label: 'Switch 开关'
					}, {
						value: 'slider',
						label: 'Slider 滑块'
					}, {
						value: 'time-picker',
						label: 'TimePicker 时间选择器'
					}, {
						value: 'date-picker',
						label: 'DatePicker 日期选择器'
					}, {
						value: 'datetime-picker',
						label: 'DateTimePicker 日期时间选择器'
					}, {
						value: 'upload',
						label: 'Upload 上传'
					}, {
						value: 'rate',
						label: 'Rate 评分'
					}, {
						value: 'form',
						label: 'Form 表单'
					}]
				}, {
					value: 'data',
					label: 'Data',
					children: [{
						value: 'table',
						label: 'Table 表格'
					}, {
						value: 'tag',
						label: 'Tag 标签'
					}, {
						value: 'progress',
						label: 'Progress 进度条'
					}, {
						value: 'tree',
						label: 'Tree 树形控件'
					}, {
						value: 'pagination',
						label: 'Pagination 分页'
					}, {
						value: 'badge',
						label: 'Badge 标记'
					}]
				}, {
					value: 'notice',
					label: 'Notice',
					children: [{
						value: 'alert',
						label: 'Alert 警告'
					}, {
						value: 'loading',
						label: 'Loading 加载'
					}, {
						value: 'message',
						label: 'Message 消息提示'
					}, {
						value: 'message-box',
						label: 'MessageBox 弹框'
					}, {
						value: 'notification',
						label: 'Notification 通知'
					}]
				}, {
					value: 'navigation',
					label: 'Navigation',
					children: [{
						value: 'menu',
						label: 'NavMenu 导航菜单'
					}, {
						value: 'tabs',
						label: 'Tabs 标签页'
					}, {
						value: 'breadcrumb',
						label: 'Breadcrumb 面包屑'
					}, {
						value: 'dropdown',
						label: 'Dropdown 下拉菜单'
					}, {
						value: 'steps',
						label: 'Steps 步骤条'
					}]
				}, {
					value: 'others',
					label: 'Others',
					children: [{
						value: 'dialog',
						label: 'Dialog 对话框'
					}, {
						value: 'tooltip',
						label: 'Tooltip 文字提示'
					}, {
						value: 'popover',
						label: 'Popover 弹出框'
					}, {
						value: 'card',
						label: 'Card 卡片'
					}, {
						value: 'carousel',
						label: 'Carousel 走马灯'
					}, {
						value: 'collapse',
						label: 'Collapse 折叠面板'
					}]
				}]
			}, {
				value: 'ziyuan',
				label: '资源',
				children: [{
					value: 'axure',
					label: 'Axure Components'
				}, {
					value: 'sketch',
					label: 'Sketch Templates'
				}, {
					value: 'jiaohu',
					label: '组件交互文档'
				}]
			}]
		}
	},
	created() {
		this.getDataTree();
		this.getDataBase();
	},
	mounted(){
		if(this.$route.query.type===1){
			this.chose=true
		}
		if(this.$route.query.type===2){
			this.chose=false
		}
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
		getDataBase() { // 获取基础数据
            api.resourcesList({roleId: this.id}).then((result) => {
                if (result.code == 0) {
                    this.treeData = result.data;
                    
                    this.getOldData();

                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.msg
                    })
                }
            })
        },
        handleCheckChange(node, checked, indeterminate) {
            let _halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
            if(_halfCheckedKeys.length != 0) {
                this.$refs.tree.setChecked(_halfCheckedKeys[0], true, false);
            }
            if (checked) {
                this.$refs.tree.setChecked(node.parentId, true, false);
            }
        },
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
			// this.$https.get('/api/company_unit/GetUnitsTree').then((result) => {
			// 	if (result.data.code == 0) {
			// 		this.options = result.data.data;
					
			// 		if (this.pid && this.pid != 0) { // 新增时，取左侧已选类别
			// 			this.form.org_id = this.pid;
			// 			this.optionsValue = this.getTreeDeepArr(this.pid, this.options);
			// 		}
			// 		if (this.id) { // 编辑
			// 			this.getOldData();
			// 		}
			// 	} else {
			// 		this.$message({
			// 			type: 'error',
			// 			showClose: true,
			// 			message: result.data.message
			// 		})
			// 	}
			// })
			
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
										this.closeDialog('dialogUserEdit');
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
										this.closeDialog('dialogUserAdd');
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
				this.$emit('closeDialog', 'dialogShopsAdd'); // 执行父组件关闭方法
			} else {
				this.$emit('closeDialog', name); // 执行父组件关闭方法
			}
		}
	}
}
</script>
<style scoped>

	.container{
		background: #ffffff;
		width: 100%;
		height: 100%;
	}
	.contents{
		display: -webkit-box;
		display: -webkit-flex;
		-webkit-flex-flow:row nowrap;
		justify-content:space-around;
		align-content:flex-start;
		align-items:flex-start;
		background: #ccc;
		height: 100%
	}
	.content-left{
		padding-top: 20px;
		width: 216px;
		height:100%;
		background:#fff;
		border-right: 1px solid rgba(240,242,245,1);
		
		
	}
	.content-left .left-info{
		height: 42px;
		line-height: 42px;
		text-indent: 30px;
		width: 211px;
		color:rgba(0,0,0,0.65);
		cursor: pointer;
		font-size: 14px;
	}
	.content-left .left-info.active{
		background:rgba(230,243,255,1);
		color:rgba(39,149,255,1);
		border-right: 5px solid rgba(39,149,255,1);
	}
	.content-right{
		flex: 1;
		background: #ffffff;
		height:100%;
	}

	.content-right {
		padding: 20px 30px;
	}
	.user-form {
		width: 360px;
	}
	.business{
		width: 100%;
	}
	.business .clause{
		width: 100%;
		height:90px;
		position: relative;
		border-bottom:1px solid rgba(218,221,223,1);
	}

	.clause-title{
		color:rgba(0,0,0,0.85);
		font-size:14px;
		padding: 10px 0;
		font-weight:500;
	}
	.clause-content{
		font-weight:400;
		color:rgba(0,0,0,0.45);
		font-size:12px;
		padding: 10px 0;
	}
	.clause .switch{
		position: absolute;
		right: 0px;
		top:28px;
	}
	.dialogSetTree {
		max-height: 200px;
		padding: 14px 10px;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
<template>
	<div>
		<el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="130px" label-suffix="：">
			<div class="car_title">车辆基本信息</div>
			<el-form-item label="车辆图片">
				<el-upload
					action="https://jsonplaceholder.typicode.com/posts/"
					list-type="picture-card"
					>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-row>
				<el-col :span="12">
					<el-form-item label="品牌车型" prop="roleNamex">
						<el-select v-model="form.roleName" filterable placeholder="请选择">
							<el-option
								v-for="item in carBrands"
								:key="item.name"
								:label="item.name"
								:value="item.name"
								>
								<span style="float: left;"><img :src="item.icon" width="20" height="20" style="vertical-align: middle;margin-right: 10px;">{{item.name}}</span>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="所在城市" prop="roleName">
						<el-input v-model="form.roleName"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="所行驶里程" prop="roleName">
						<el-input v-model="form.roleName">
							<template slot="append">万里</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="初次上牌时间" prop="roleName">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="变速箱" prop="roleName">

				<el-radio-group v-model="form.brand" class="el-radio-group__seach">
					<el-radio label="0">自动</el-radio>
					<el-radio label="1">手动</el-radio>
					<el-radio label="2">手自一体</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-row>
				<el-col :span="12">
					<el-form-item label="排放标准" prop="roleName">
						<el-select v-model="form.roleName" filterable placeholder="请选择">
							<el-option value="1" label="国一"></el-option>
							<el-option value="2" label="国二"></el-option>
							<el-option value="3" label="国三"></el-option>
							<el-option value="4" label="国四"></el-option>
							<el-option value="5" label="国五"></el-option>
							<el-option value="6" label="欧三"></el-option>
							<el-option value="7" label="欧四"></el-option>
							<el-option value="8" label="欧五"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="零售价格" prop="roleName">
						<el-input v-model="form.roleName">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="车辆颜色" prop="roleName">
				<el-radio-group v-model="form.brand" class="el-radio-group__seach">
					<el-radio label="0">红色</el-radio>
					<el-radio label="1">白色</el-radio>
					<el-radio label="2">黑色</el-radio>
					<el-radio label="3">棕色</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="车辆描述" prop="roleDesc">
				<el-input v-model="form.roleDesc" type="textarea" :row="4" placeholder="至少十个字，可填写转让原因，车辆状况等"></el-input>
			</el-form-item>
			<div class="car_title">车辆补充信息</div>
			<el-row>
				<el-col :span="12">
					<el-form-item label="车辆采集车行" prop="roleName">
						<el-input v-model="form.roleName"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="批发价" prop="roleName">
						<el-input v-model="form.roleName">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="采购价" prop="roleName">
						<el-input v-model="form.roleName">
							<template slot="append">万元</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="年检到期日" prop="roleName">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="保险到期日" prop="roleName">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="车辆是否认证">
				<el-radio-group v-model="form.resource">
					<el-radio label="是"></el-radio>
					<el-radio label="否"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submit()">保存</el-button>
				<el-button @click="closeDialog()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import api from '@/api/sysManager'
import {carBrand} from '@/config/const'
export default {
	data () {
		return {
			carBrands: carBrand,
			form: {
				brand: '0',
				roleName: '', // 角色名
				roleDesc: '', // 角色描述
				roleLev: '', // 角色等级
			},
			form_rules: {
				roleName: [
					{ required: true, message: '请输入角色名', trigger: 'blur' }
				],
				roleDesc: [
					{ required: true, message: '请输入角色描述', trigger: 'blur' }
				],
				roleLev: [
					{ required: true, message: '请选择角色等级', trigger: 'change' }
				]
			},
			treeData: [],
			defaultProps: {
                label: 'name',
                children: 'childs'
            }
		}
	},
	props: {
		id: {
			type: Number
		}
	},
	created() {
		this.getDataBase();
	},
	computed: {
	},
	watch: {
	},
	methods: {
		getDataBase() { // 获取基础数据
            api.resourcesList().then((result) => {
                if (result.code == 0) {
                    this.treeData = result.data;
                    
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.msg
                    })
                }
            })
        },
        submit() { // 提交
            this.$refs.form.validate((valid) => {
                if (valid) {

		            let checkedKeys = this.$refs.tree.getCheckedKeys();
		            if (checkedKeys.length < 1) {
		            	this.$message({
	                        type: 'error',
	                        showClose: true,
	                        message: '请勾选功能点'
	                    })
	                    return false;
		            }
		            let _postData = {
						roleDesc: this.form.roleDesc,
						roleName: this.form.roleName,
						roleLev: this.form.roleLev,
						roleState: 1,
						menus: checkedKeys
		            };
		            api.addRole(_postData).then((result) => {
		                if (result.code == 0) {
		                    this.$message({
		                        type: 'success',
		                        showClose: true,
		                        message: '新增成功',
		                        duration: 1500,
		                        onClose: () => {
		                            // 关闭当前dialog，
		                            this.closeDialog('dialogRoleAdd');
		                            // 刷新列表
		                            this.$emit('parentGetDataList');
		                        }
		                    })
		                } else {
		                    this.$message({
		                        type: 'error',
		                        showClose: true,
		                        message: result.msg
		                    })
		                }
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
		closeDialog(name) { // 关闭当前
			// this.$refs.form.resetFields(); // 重置表单
			if (!name) {
				this.$emit('closeDialog', 'dialogRoleAdd'); // 执行父组件关闭方法
			} else {
				this.$emit('closeDialog', name); // 执行父组件关闭方法
			}
		}
	}
}
</script>
<style scoped>
	.car_title {
		padding-left: 10px;
		line-height: 1.8;
		border-left: 5px solid #409EFF;
		margin-bottom: 20px;
	}

	.el-radio-group__seach /deep/ .el-radio {
		padding: 4px 15px;
	}
	.el-radio-group__seach /deep/ .el-radio .el-radio__input {
		display: none;
	}
	.el-radio-group__seach /deep/ .el-radio .el-radio__label {
		padding-left: 0;
	}
	.el-radio-group__seach /deep/ .el-radio.is-checked {
		background: #409EFF;
		border-radius: 3px;
	}
	.el-radio-group__seach /deep/ .el-radio.is-checked .el-radio__label {
		color: #fff;
	}
</style>
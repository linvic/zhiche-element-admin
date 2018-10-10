<template>
	<div>
		<el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="100px" label-suffix="：">
			<span>角色信息：</span>
			<div class="treeBox">
				
				<el-form-item label="角色ID">
					<p>{{form.id}}</p>
				</el-form-item>
				<el-form-item label="创建时间">
					<p>{{form.createTime}}</p>
				</el-form-item>
				<el-form-item label="角色名" prop="roleName">
					<el-input v-model="form.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="form.roleDesc" type="textarea" :row="4"></el-input>
				</el-form-item>
				<el-form-item label="角色等级" prop="roleLev">
					<el-select v-model="form.roleLev" placeholder="请选择">
						<el-option label="1级" :value="1"></el-option>
						<el-option label="2级" :value="2"></el-option>
						<el-option label="3级" :value="3"></el-option>
						<el-option label="4级" :value="4"></el-option>
						<el-option label="5级" :value="5"></el-option>
					</el-select>
				</el-form-item>
			
			</div>
			<span>权限列表：</span>
			<div class="treeBox">
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
			<el-form-item>
				<el-button type="primary" @click="submit()">保存</el-button>
				<el-button @click="closeDialog()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import api from '@/api/sysManager'
export default {
	data () {
		return {
			form: {
				id: '---', // ID
				createTime: '---', // 创建时间
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
        getOldData() { // 获取编辑数据

            api.editorRoles({id: this.id}).then((result) => {
                if (result.code == 0) {
                    let _data = result.data;

                    this.form.id = _data.id;
					this.form.createTime = _data.createTime; // 创建时间
					this.form.roleName = _data.roleName; // 角色名
					this.form.roleDesc = _data.roleDesc; // 角色描述
					this.form.roleLev = _data.roleLev; // 角色等级

                    // for(var item of _data) {
                    //     this.$refs.tree.setChecked(item.app_id, true, false);
                    // }

                    // 对已选的进行勾选操作
                    let _this = this;
                    function _deepFun (data) {
                    	for(var item of data) {
	                    	if (item.checked) { // 判断是否已选
	                    		_this.$refs.tree.setChecked(item.id, true, false);
	                    	}
	                    	if (item.childs) {
	                    		_deepFun(item.childs);
	                    	}
	                    }
                    }
                    _deepFun(this.treeData);
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
		            	id: this.id,
						roleDesc: this.form.roleDesc,
						roleName: this.form.roleName,
						roleLev: this.form.roleLev,
						roleState: 1,
						menus: checkedKeys
		            };
		            api.updateRoles(_postData).then((result) => {
		                if (result.code == 0) {
		                    this.$message({
		                        type: 'success',
		                        showClose: true,
		                        message: '编辑成功',
		                        duration: 1500,
		                        onClose: () => {
		                            // 关闭当前dialog，
		                            this.closeDialog('dialogRoleEditor');
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
				this.$emit('closeDialog', 'dialogRoleEditor'); // 执行父组件关闭方法
			} else {
				this.$emit('closeDialog', name); // 执行父组件关闭方法
			}
		}
	}
}
</script>
<style scoped>
	.treeBox {
		border: 1px dashed #eaeefb;
	    padding: 10px 5px;
	    max-height: 400px;
	    overflow-y: auto;
	}
</style>
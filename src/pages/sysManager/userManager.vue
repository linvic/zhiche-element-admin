<template>
	<div style="height: 100%;">
		<el-container style="min-height: 100%;height: 100%;">
			<el-aside width="256px" style="background: #fff; height: 100%;padding: 20px;">
				<el-input
				  class="m-b-10"
				  placeholder="请输入"
				  v-model="filterText">
				  <i slot="suffix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-tree :data="treeData" :props="treeProps" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree"></el-tree>
			</el-aside>
			<el-main class="main">
				<el-row class="m-b-10">
					<el-col :span="12">
						<el-input
							placeholder="用户名/真实姓名/手机号"
							v-model="filterForm.keyword" style="max-width:320px;">
							<i slot="suffix" class="el-input__icon el-icon-search"></i>
						</el-input>
					</el-col>
					<el-col :span="12" class="text-right">
							<el-button type="primary" size="small">导出</el-button>
							<el-button type="success" size="small" @click="linkUserAdd()">新增</el-button>
					</el-col>
				</el-row>
				<div class="user-type-radio m-b-10">
					<span class="user-type-radio-title">用户类别：</span>
					<el-radio-group class="user-type-radio-group" v-model="filterForm.userType" size="small">
						<el-radio-button label="0">所有</el-radio-button>
						<el-radio-button label="1">管理员</el-radio-button>
						<el-radio-button label="2">负责人</el-radio-button>
						<el-radio-button label="3">普通用户</el-radio-button>
					</el-radio-group>
				</div>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="id" label="序号" width="80"></el-table-column>
					<el-table-column prop="roleName" label="用户名"></el-table-column>
					<el-table-column prop="roleName" label="真实姓名"></el-table-column>
					<el-table-column prop="roleName" label="手机号"></el-table-column>
					<el-table-column prop="roleName" label="所属级别"></el-table-column>
					<el-table-column prop="roleName" label="用户类型"></el-table-column>
					<el-table-column prop="roleName" label="角色"></el-table-column>
					<el-table-column label="操作" width="380" class-name="operate">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="listEdit(scope.row.id, 1)" plain>编辑</el-button>
							<el-button
								size="mini"
								type="success"
								plain
								@click="listEdit(scope.row.id, 2)">业务授权</el-button>
							<el-button
								size="mini"
								type="success"
								plain
								@click="roleSet(scope.row.user_id)">角色配置</el-button>
							<el-button
								size="mini"
								type="danger"
								plain
								@click="listDel(scope.row.user_id)">删除</el-button>
								
						</template>
					</el-table-column>
				</el-table>
				<div class="text-center m-t">
					<el-pagination
						v-if="dataTotal > 10"
						background
						@size-change="pageSizeChange"
						@current-change="pageIndexChange"
						:current-page="pageIndex"
						:page-sizes="[10, 15, 20, 30]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="dataTotal">
					</el-pagination>
				</div>
			</el-main>
		</el-container>
		<el-dialog title="角色配置" :visible.sync="dialogRoleSet" width="521px">
			<div class="dialogRoleSetList">
				<el-checkbox-group v-model="checkedRoles" size="small">
					<el-checkbox border v-for="item,index in roleList" :label="item.id" :key="index">{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</div>
			<div class="dialogRoleCheckedList" v-if="checkedRolesTxt.length > 0">
				
				<dl>
					<dt>已选角色</dt>
					<dd v-for="item,index of checkedRolesTxt" :key="index">{{item}}</dd>
				</dl>

			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogRoleSet = false">取 消</el-button>
				<el-button size="small" type="primary" @click="dialogRoleSet = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import api from '@/api/sysManager'
export default {
	data () {
		return {
			pageIndex: 1, // 当前页码
			pageSize: 10, // 页码大小
			dataTotal: 0, // 数据总数
			filterForm: { // 检索条件
				keyword: '',
				userType: 0
			},
			filterText: '', // tree 检索框
			currentUserType: 0, // 当前选中的类别名称
			treeData: [],
			treeProps: {
				label: 'name',
				children: 'childs'
			},
			tableData: [],
			dialogRoleSet: false,
			roleList: [{
				name: '角色1',
				id: 1
			},{
				name: '角色2',
				id: 2
			},{
				name: '角色3',
				id: 3
			},{
				name: '角色4',
				id: 4
			},{
				name: '角色5',
				id: 5
			},{
				name: '角色6',
				id: 6
			},{
				name: '角色7',
				id: 7
			},{
				name: '角色8',
				id: 8
			},{
				name: '角色9',
				id: 9
			},{
				name: '角色10',
				id: 10
			},{
				name: '角色11',
				id: 11
			},{
				name: '角色12',
				id: 12
			},{
				name: '角色13',
				id: 13
			},{
				name: '角色14',
				id: 14
			},{
				name: '角色15',
				id: 15
			},{
				name: '角色16',
				id: 16
			},{
				name: '角色17',
				id: 17
			},{
				name: '角色18',
				id: 18
			},{
				name: '角色19',
				id: 19
			}],
			checkedRoles: [] // 选中的checkedRoles
		}
	},
	created() {
		this.getDataTree();
		this.getDataList();
	},
	watch: {
		filterText(val) {
			this.pageIndex = 1;
			this.pageSize = 10;
			this.getDataList();
		}
	},
	computed: {
		checkedRolesTxt: function () {

			let checkedRolesTxt = [];
			let arrayL = this.checkedRoles.length + 1;
			for(let item of this.roleList) {

				if (this.checkedRoles.indexOf(item.id, -arrayL ) !== -1) {

					checkedRolesTxt.push(item.name);
				}
			}
			return checkedRolesTxt
		}
	},
	methods: {
		getDataTree() {

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
		// 获取分页
		getDataList() {
			api.getRolePage({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				unit_id: this.currentUserType,
				keyword: this.filterForm.keyword
			}).then((result) => {
				if (result.code == 0) {
					this.tableData = result.data.list;
					this.dataTotal = result.data.total;
					this.dataTotal = 999;
				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.msg
					})
				}
			})
		},
		// 分页检索方法
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		handleNodeClick(data) {
			this.currentUserType = data.id;
			this.filterText = '';
			this.pageIndex = 1;
			this.pageSize = 10;
			this.getDataList();
		},
		linkUserAdd() { // 新增
			this.$router.push({path: '/sysManager/userAdd'});
		},
		listEdit(id,type) {// 编辑
			this.$router.push({path: '/sysManager/userEdit', query: {id: id,type: type}});
		},
		roleSet(id) {// 编辑
			this.dialogRoleSet = true;
		},
		listDel(id) {
			this.$confirm('您确定要将删除该用户吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				
				// this.$https.post('/api/Account/update_users_pwd_init',{
				//     user_id: id,
				//     user_pwd: '888888'
				// }).then((result) => {
				//     if (result.data.code == 0) {
				//         this.$message({
				//             type: 'success',
				//             showClose: true,
				//             message: '密码重置成功',
				//             duration: 1500,
				//             onClose: () => {
				//                 this.getDataList();
				//             }
				//         })
				//     } else {
				//         this.$message({
				//             type: 'error',
				//             showClose: true,
				//             message: result.data.message
				//         })
				//     }
				// })
			}).catch(() => {     
			});
		},
		pageSizeChange(val) { // 分页：pageSize改变时
			this.pageSize = val;
			this.getDataList();
		},
		pageIndexChange(val) { // 分页：当前页码改变时
			this.pageIndex = val;
			this.getDataList();
		}
	}
}
</script>

<style scoped>
	.el-tree {
		background: transparent;
	}
	/deep/ .el-tree-node__content:hover,/deep/ .is-current.el-tree-node > .el-tree-node__content{
		background-color: #E6F3FF;
		color: #2795FF;
	}
	.user-type-radio .user-type-radio-group {
		padding: 2px;
		background-color: #fff;
		outline: none;
	}
	.user-type-radio .user-type-radio-title {
		color: rgba(0,0,0,0.85);
		font-size: 16px;
	}
	.user-type-radio .user-type-radio-group /deep/ .el-radio-button--small .el-radio-button__inner {
		padding: 8px 20px;
		font-size: 14px;
	}
	.user-type-radio .user-type-radio-group /deep/ .el-radio-button__inner {
		border-color: #fff;
		border-radius: 2px;
	}
	.user-type-radio .user-type-radio-group /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
		border-color: #2795FF;
	}

	.dialogRoleSetList {
		max-height: 137px;
		padding: 14px 10px;
		background-color: #F8F9FB;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.dialogRoleSetList .el-checkbox.is-bordered + .el-checkbox.is-bordered {
		margin-left: 0px;
	}
	.dialogRoleSetList .el-checkbox.is-bordered {
		margin-right: 10px;
		margin-bottom: 10px;
	}
	.dialogRoleCheckedList {
		margin-top: 15px;
	}
	.dialogRoleCheckedList dl {
		
		display: inline-block;
	}
	.dialogRoleCheckedList dt {
		display: inline-block;
		margin-right: 15px;
	}
	.dialogRoleCheckedList dd {
		display: inline-block;
		font-size: 14px;
		background:#9EA0A6;
		padding: 3px 10px;
		margin: 5px 10px 5px 0px;
		border-radius:4px;
		color: #fff;
	}
</style>
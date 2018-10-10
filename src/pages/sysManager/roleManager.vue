<template>
	<div>

		<div class="breadcrumb">
			<span>您当前位置：</span>
			<el-breadcrumb separator-class="el-icon-arrow-right" label="1">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>角色管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-card>
            <div slot="header" class="clearfix text-right">
                <el-button-group>
                    <el-button type="primary" size="small" @click="dialogRoleAdd = true">新增角色</el-button>
                </el-button-group>
            </div>
			<el-table :data="tableData" style="width: 100%" border v-loading="loading">
				<el-table-column prop="roleName" label="角色"></el-table-column>
				<el-table-column prop="roleDesc" label="描述"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="primary"
							@click="listEditor(scope.row.id)" plain>编辑</el-button>
						<el-button
							size="mini"
							type="danger"
							v-if="scope.row.system != 1"
							@click="listDelete(scope.row.id)" plain>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="text-center m-t">
				<el-pagination
					v-if="dataTotal > 10"
					@size-change="pageSizeChange"
					@current-change="pageIndexChange"
					:current-page="pageIndex"
					:page-sizes="[10, 15, 20, 30]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="dataTotal">
				</el-pagination>
			</div>
		</el-card>

        <el-dialog v-if="dialogRoleAdd" title="新增角色" :visible.sync="dialogRoleAdd" append-to-body width="800px">
            <roleAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></roleAdd>
        </el-dialog>
        <el-dialog v-if="dialogRoleEditor" title="编辑角色" :visible.sync="dialogRoleEditor" append-to-body width="800px">
            <roleEditor @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editorId"></roleEditor>
        </el-dialog>

	</div>
</template>

<script>
import api from '@/api/sysManager'
import roleAdd from './roleAdd'
import roleEditor from './roleEditor'

export default {
	components: {
		roleAdd,
		roleEditor
	},
	data () {
		return {
			editorId: null, // 编辑存值
			pageIndex: 1, // 当前页码
			pageSize: 10, // 页码大小
			dataTotal: 0, // 数据总数
			loading: true,
			tableData: [],
			dialogRoleEditor: false, // 编辑
			dialogRoleAdd: false // 新增店铺dialog
		}
	},
	created() {
		this.getDataList();
	},
	watch: {
	},
	methods: {
		pageSizeChange(val) { // 分页：pageSize改变时
			this.pageSize = val;
			this.getDataList();
		},
		pageIndexChange(val) { // 分页：当前页码改变时
			this.pageIndex = val;
			this.getDataList();
		},
		closeDialog(name) {
			this[name] = false;
		},
		getDataList() { // 分页获取
			api.getRolePage({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}).then((result) => {
				if (result.code == 0) {
					this.tableData = result.data.list;
					this.dataTotal = result.data.total;
				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.msg
					})
				}
				this.loading = false;
			})
		},
		listEditor(id) {
            this.editorId = Number(id);
            this.dialogRoleEditor = true;
		},
        listDelete(id) { // 删除
            
            this.$confirm('确定要删除该角色吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                api.deleteRole({
                    id: id
                }).then((result) => {
                    if (result.code == 0) {
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '删除成功！',
                            duration: 1500,
                            onClose: () => {
                                this.getDataList();
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

            }).catch(() => {     
            });
        }
	}
}
</script>

<style scoped>
</style>

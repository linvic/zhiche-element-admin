<template>
	<div class="main">
            <div class="clearfix m-b-10">
	            <el-row >
	                <el-col :span="12">
	                    <el-input
	                    	v-model="filterForm.keyword" 
							placeholder="角色名"
							style="width: 300px;">
							<i slot="suffix" class="el-input__icon el-icon-search"></i>
	                    </el-input>
	                </el-col>
	                <el-col :span="12" class="text-right">
	                	<router-link :to="{ name: 'roleAdd'}">
		                    <el-button type="success" size="small">新增</el-button>
		                </router-link>
	                </el-col>
	            </el-row>
            </div>
			<el-table :data="tableData" style="width: 100%" border>
				<el-table-column prop="roleName" label="序号"></el-table-column>
				<el-table-column prop="roleName" label="角色名"></el-table-column>
				<el-table-column prop="createTime" label="更新时间"></el-table-column>
				<el-table-column label="操作" class-name="operate">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="primary"
							@click="listEdit(scope.row.id)" plain>编辑</el-button>
						<el-button
							size="mini"
							type="danger"
							v-if="scope.row.system != 1"
							@click="listDel(scope.row.id)" plain>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
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
				keyword: ''
			},
			tableData: []
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
		getDataList() { // 分页获取
			api.getRolePage({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
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
		listEdit(id) {// 编辑
			return false;
			this.$router.push({path: '/sysManager/roleEdit', query: {id: id}});
		},
        listDel(id) { // 删除
            
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

<template>
	<div>
		<el-card>
			<el-form ref="filterForm" :model="filterForm" label-width="100px">
				<el-form-item label="店铺名称：">
					<el-input v-model="filterForm.clear_user" placeholder="请输入店铺名称" style="width: 300px;"></el-input>
					<el-button type="primary" @click="onSubmit" style="margin-left: 20px">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="hr-line-dashed"></div>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="12">
                    <el-button type="primary" size="small" @click="alert('敬请期待')">批量导出</el-button>
                </el-col>
                <el-col :span="12" class="text-right">
                    <el-button type="primary" size="small" @click="dialogShopsAdd = true">新增店铺</el-button>                
                </el-col>
            </el-row>
			<el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="loading">
				<el-table-column type="selection" width="55" prop="xxx"></el-table-column>
				<el-table-column prop="xxx" label="门店名称"></el-table-column>
				<el-table-column prop="xxx" label="用户名"></el-table-column>
				<el-table-column prop="xxx" label="手机号"></el-table-column>
				<el-table-column prop="xxx" label="创建时间"></el-table-column>
				<el-table-column prop="xxx" label="创建人"></el-table-column>
				<el-table-column prop="xxx" label="店铺位置"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="primary"
							@click="alert(scope.row.id)" plain>编辑</el-button>
						<el-button
							size="mini"
							type="danger"
							@click="alert(scope.row.id)" plain>删除</el-button>
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

        <el-dialog v-if="dialogShopsAdd" title="新增店铺" :visible.sync="dialogShopsAdd" append-to-body width="900px">
            <ShopsAdd @closeDialog="closeDialog" @parentGetDataList="getDataList" :pid="currentUserType"></ShopsAdd>
        </el-dialog>

	</div>
</template>

<script>
import ShopsAdd from './shopsAdd'
export default {
	components: {
		ShopsAdd
	},
	data () {
		return {
			saleStatus: 0,
			editId: null, // 编辑id
			pageIndex: 1, // 当前页码
			pageSize: 10, // 页码大小
			dataTotal: 0, // 数据总数
			loading: true,
			selectionChecked: [], // 多选已选中项
			tableData: [{
				id: 1,
				xxx: 'xxx'
			},{
				id: 2,
				xxx: 'xxx2'
			},{
				id: 3,
				xxx: 'xxx3'
			}],
			filterForm: {
				brand: '0', // 品牌
				clear_user: ''
			},
			dialogShopsAdd: false // 新增店铺dialog
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
		handleSelectionChange(val) { // 多选执行的方法
			this.selectionChecked = val;
			console.info(this.selectionChecked);
		},
		closeDialog(name) {
			this[name] = false;
		},
		getDataList() { // 分页获取
			this.loading = false;
		}
	}
}
</script>

<style scoped>
</style>

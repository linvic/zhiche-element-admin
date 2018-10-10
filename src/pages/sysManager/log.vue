<template>
	<div>
		<div class="breadcrumb">
			<span>您当前位置：</span>
			<el-breadcrumb separator-class="el-icon-arrow-right" label="1">
				<el-breadcrumb-item>系统设置</el-breadcrumb-item>
				<el-breadcrumb-item>系统日志</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		
		<el-card>
            <div slot="header" class="clearfix">
            	<el-form ref="filterForm" :model="filterForm" label-width="100px">
					<el-select v-model="filterForm.mode" placeholder="统计">
						<el-option label="模块1" value="1"></el-option>
						<el-option label="模块2" value="2"></el-option>
					</el-select>
					<el-date-picker
						v-model="filterForm.time"
						type="daterange"
						align="left"
						unlink-panels
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:picker-options="pickerOptions">
					</el-date-picker>
					<el-input v-model="filterForm.account" placeholder="请输入账号" style="width: 300px;" suffix-icon="el-icon-search"></el-input>
					<el-button type="primary" @click="onSubmit" style="margin-left: 20px">搜索</el-button>
				</el-form>
            </div>
			<el-table :data="tableData" style="width: 100%" border v-loading="loading">
				<el-table-column prop="xxx" label="操作模块"></el-table-column>
				<el-table-column prop="xxx" label="操作页面"></el-table-column>
				<el-table-column prop="xxx" label="操作账号"></el-table-column>
				<el-table-column prop="xxx" label="操作时间"></el-table-column>
				<el-table-column prop="xxx" label="操作内容"></el-table-column>
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

        <el-dialog v-if="dialogRoleAdd" title="新增角色" :visible.sync="dialogRoleAdd" append-to-body width="900px">
            <roleAdd @closeDialog="closeDialog" @parentGetDataList="getDataList"></roleAdd>
        </el-dialog>

	</div>
</template>

<script>
import roleAdd from './roleAdd'
export default {
	components: {
		roleAdd
	},
	data () {
		return {
			pageIndex: 1, // 当前页码
			pageSize: 10, // 页码大小
			dataTotal: 0, // 数据总数
			loading: true,
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
				mode: '', // 
				time: '', // 
				account: ''
			},
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
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
			this.loading = false;
		}
	}
}
</script>

<style scoped>
</style>

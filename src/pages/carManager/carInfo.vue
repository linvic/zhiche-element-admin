<template>
	<div>

		<div class="breadcrumb">
			<span>您当前位置：</span>
			<el-breadcrumb separator-class="el-icon-arrow-right" label="1">
				<el-breadcrumb-item>车辆管理</el-breadcrumb-item>
				<el-breadcrumb-item>车辆信息</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-card>
			<div slot="header" class="clearfix">
				<el-radio-group v-model="saleStatus">
					<el-radio-button label="0">全部车辆</el-radio-button>
					<el-radio-button label="1">上架车辆</el-radio-button>
					<el-radio-button label="2">下架车辆</el-radio-button>
					<el-radio-button label="3">上架审核</el-radio-button>
					<el-radio-button label="4">已售审核</el-radio-button>
				</el-radio-group>
			</div>
			<el-form ref="filterForm" :model="filterForm" label-width="100px">
				<el-form-item label="车辆品牌：">
					<el-radio-group v-model="filterForm.brand" class="el-radio-group__seach">
						<el-radio label="0">不限</el-radio>
						<el-radio label="1">奥迪</el-radio>
						<el-radio label="2">宝马</el-radio>
						<el-radio label="3">奔驰</el-radio>
						<el-radio label="4">大众</el-radio>
						<el-radio label="5">别克</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="车辆等级：">
					<el-radio-group v-model="filterForm.brand" class="el-radio-group__seach">
						<el-radio label="0">不限</el-radio>
						<el-radio label="1">轿车</el-radio>
						<el-radio label="2">小型车</el-radio>
						<el-radio label="3">微型车</el-radio>
						<el-radio label="4">中型车</el-radio>
						<el-radio label="5">XXX</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="车辆价格：">
					<el-radio-group v-model="filterForm.brand" class="el-radio-group__seach">
						<el-radio label="0">不限</el-radio>
						<el-radio label="1">5万以下</el-radio>
						<el-radio label="2">5-10万</el-radio>
						<el-radio label="3">10-20万</el-radio>
						<el-radio label="4">20-30万</el-radio>
						<el-radio label="5">30-40万</el-radio>
						<el-radio label="6">40万以上</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="更多筛选：">
					<el-select v-model="filterForm.clear_user" placeholder="录入人">
						<el-option label="录入人1" value="1"></el-option>
						<el-option label="录入人2" value="2"></el-option>
					</el-select>
					<el-select v-model="filterForm.clear_user" placeholder="车辆状态">
						<el-option label="状态1" value="1"></el-option>
						<el-option label="状态2" value="2"></el-option>
					</el-select>
					
					<span style="margin-left: 20px;">关键字：</span>
					<el-select v-model="filterForm.clear_user" style="width: 80px;">
						<el-option label="综合" value=""></el-option>
						<el-option label="编号" value="2"></el-option>
					</el-select>
					<el-input v-model="filterForm.clear_user" placeholder="请输入品牌、车系、VIN码等" style="width: 300px;"></el-input>
					<el-button type="primary" style="margin-left: 20px">搜索</el-button>
					<el-button type="primary" @click="alert('敬请期待')">导入</el-button>
					<el-button type="primary" @click="alert('敬请期待')">导出</el-button>
				</el-form-item>
			</el-form>
			<div class="hr-line-dashed"></div>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="12">
                    <el-button type="success" size="small" @click="crmDel()">批量更新操作</el-button>
                </el-col>
                <el-col :span="12" class="text-right">
                    <span>在库车辆：1000辆</span>                    
                </el-col>
            </el-row>
			<el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange" v-loading="loading">
				<el-table-column type="selection" width="55" prop="xxx"></el-table-column>
				<el-table-column label="销售照片" width="120">
					<template slot-scope="scope">
						<img src="http://img3.imgtn.bdimg.com/it/u=3070110580,2362830267&fm=27&gp=0.jpg" width="100" height="60">
					</template>
				</el-table-column>
				<el-table-column label="车辆信息" width="300">
					<template slot-scope="scope">
						<h4>奥迪 A3 2018款 1.4T 双离合 30周年纪念版 Sportback 35TFSI 时尚型</h4>
						<ul class="list-car-info">
							<li>编号: A180001   采购人:tony</li>
							<li>VIN码:4324</li>
							<li>里程:454万公里</li>
							<li>tony</li>
							<li>所属公司：tony</li>
							<li>原车牌:3442324 现车牌:3454</li>
							<li>新车牌:43</li>
						</ul>
					</template>
				</el-table-column>
				<el-table-column prop="xxx" label="库龄(天)"></el-table-column>
				<el-table-column prop="xxx" label="录入人"></el-table-column>
				<el-table-column prop="xxx" label="所属店铺"></el-table-column>
				<el-table-column prop="xxx" label="入库时间"></el-table-column>
				<el-table-column prop="xxx" label="采购价"></el-table-column>
				<el-table-column label="推广" width="80" v-if="saleStatus < 3">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="success"
							@click="alert(scope.row.id)" plain>推广</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="xxx" label="采购价"></el-table-column>
				<el-table-column label="审核状态" width="80" v-if="saleStatus >= 3">
					<template slot-scope="scope">
						待审核
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button
							v-if="saleStatus < 3"
							size="mini"
							type="primary"
							@click="listEditor(scope.row.id)" plain>编辑</el-button>
						<el-button
							v-if="saleStatus < 3"
							size="mini"
							type="danger"
							@click="alert(scope.row.id)" plain>删除</el-button>
						<el-button
							v-if="saleStatus >= 3"
							size="mini"
							type="primary"
							@click="audit(scope.row.id)" plain>审核</el-button>
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

        <el-dialog v-if="dialogCarEditor" title="编辑车辆信息" :visible.sync="dialogCarEditor" append-to-body width="900px">
            <carEditor @closeDialog="closeDialog" @parentGetDataList="getDataList" :id="editorId"></carEditor>
        </el-dialog>
        <el-dialog v-if="dialogCarAudit" title="审核车辆" :visible.sync="dialogCarAudit" append-to-body width="900px">
            <carAudit @closeDialog="closeDialog" @parentGetDataList="getDataList"></carAudit>
        </el-dialog>
	</div>
</template>

<script>
import carAudit from './carAudit'
import carEditor from './carEditor'

import api from '@/api/carManager'
export default {
	components: {
		carAudit,
		carEditor
	},
	data () {
		return {
			saleStatus: 0,
			editorId: null, // 编辑id
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
			dialogCarEditor: false, // 车辆编辑弹层
			dialogCarAudit: false // 车辆审核弹层
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
			api.getCarList({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}).then((result) => {
				if (result.code == 0) {
					this.tableData = result.data.Items;
					this.dataTotal = result.data.Total;

					this.loading = false;
				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.msg
					})
				}
			})
		},
		listEditor(id) { // 编辑
			this.editorId = parseInt(id);
			this.dialogCarEditor = true;
		},
		audit(id) { // 审核
			this.editorId = parseInt(id);
			this.dialogCarAudit = true;
		}
	}
}
</script>

<style scoped>
	.list-car-info {
		font-size: 10px;
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

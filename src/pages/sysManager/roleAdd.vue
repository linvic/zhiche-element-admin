<template>
	<div class="main">
		<el-card shadow="never" style="margin-bottom: 20px;">
			<div class="form-title">基本信息</div>
			<el-form ref="form" status-icon :rules="form_rules" size="small" :model="form" label-width="78px" label-position="left" label-suffix="：">
				<el-form-item label="角色名" prop="roleName">
					<el-input v-model="form.roleName" style="width: 240px;" placeholder="请输入角色名"></el-input>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="never">
			
			<div class="form-title">权限</div>
			<div>
				<label class="role-checkbox">
					<input type="checkbox" name="optionsRadios" v-model="isAllChecked" v-on:click.stop="selectAll()">
					全选
				</label>
			</div>
			<table class="el-table el-table--border el-table--medium m-b" style="border-spacing: 0;border-collapse: collapse;">
				<thead>
					<tr>
						<th>一级</th>
						<th>页面权限</th>
						<th>可见字段</th>
						<th>操作权限</th>
					</tr>
				</thead>
				<tbody class="role-checkbox-group">
					<tr v-for="(item,index) in newTreeData" :key="index">
						<td :rowspan="item.parent.permisions.length" style="width: 150px" v-if="index === 0 || item.pid !== newTreeData[index-1].pid">
							<div class="role-checkbox">{{item.descrioption}}</div>
						</td>
						<td style="width: 150px">
							<label class="role-checkbox">
								<input type="checkbox" name="optionsRadios" :value="item.id" v-model="item.checked" v-on:click.stop="selectSecond(item,index)">
								{{item.descrioption}}
							</label>
						</td>
						<td>
							<label class="role-checkbox" v-for="(child,i) in item.fieldPermisions" :key="child.id">
								<input type="checkbox" :value="child.id" v-model="child.checked" v-on:click.stop="selectAllThree(child)">{{child.name}}
							</label>
						</td>
						<td>
							<label class="role-checkbox" v-for="(child,i) in item.optPermisions" :key="child.id">
								<input type="checkbox" :value="child.id" v-model="child.checked" v-on:click.stop="selectAllThree(child)">{{child.name}}
							</label>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="text-center">
				<el-button type="primary" @click="submit()">提交</el-button>
				<el-button @click="closeDialog()">取消</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
import api from '@/api/sysManager'
export default {
	data () {
		return {
			form: {
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
			isAllChecked: false, // 全选按钮
			treeData: [],
			newTreeData: [],
			defaultProps: {
				label: 'name',
				children: 'childs'
			}
		}
	},
	created() {
		this.getDataBase();
	},
	computed: {
	},
	methods: {
		getDataBase() { // 获取基础数据
			
			api.resourcesList().then((result) => {
				if (result.code == 0) {
					let data = {"name":null,"perssSessionId":null,"sessionId":null,"body":null,"status":200,"data":[{"id":2466,"name":"车辆分布图","pid":0,"level":1,"orderNumber":0,"url":null,"descrioption":"车辆分布图","permisions":[{"id":3,"name":"车辆分布图","pid":2466,"level":2,"orderNumber":2,"url":null,"descrioption":"车辆分布图","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"optPermisions":[],"fieldPermisions":[]},{"id":2465,"name":"车辆监控","pid":0,"level":1,"orderNumber":0,"url":null,"descrioption":"车辆监控","permisions":[{"id":87,"name":"车辆监控","pid":2465,"level":2,"orderNumber":1,"url":null,"descrioption":"车辆监控","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"optPermisions":[],"fieldPermisions":[]},{"id":150,"name":"车务管理","pid":0,"level":1,"orderNumber":0,"url":null,"descrioption":"车务管理","permisions":[{"id":96,"name":"车辆档案","pid":150,"level":2,"orderNumber":3,"url":null,"descrioption":"车辆档案","permisions":[],"optPermisions":[{"id":212,"name":"编辑","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"编辑","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":255,"name":"照片","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"照片","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":240,"name":"拍照","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"拍照","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":254,"name":"推送","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"推送","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":100,"name":"删除","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"删除","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":97,"name":"导出","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"导出","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2513,"name":"批量导入","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"批量导入","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2514,"name":"模板下载","pid":96,"level":3,"orderNumber":0,"url":null,"descrioption":"模板下载","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"fieldPermisions":[{"id":269,"name":"企业名称","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"opeName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":270,"name":"级别","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"groupName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":268,"name":"车主姓名","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"ownerName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":492,"name":"车架号","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"sourceOwnerVIN","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2426,"name":"车主手机","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"phoneNumber","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2427,"name":"设备类型","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"deviceTypeStr","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":530,"name":"设备数量","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"carCount","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2457,"name":"解绑时间","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"unBindTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":274,"name":"报警数量","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"warnCount","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":275,"name":"拍照数量","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"takePhotoCount","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":272,"name":"高危等级","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"level","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":531,"name":"行驶里程","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"travelDistance","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":532,"name":"行驶时间","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"drivingTimeStr","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":529,"name":"车辆状态","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"vehicleStateStr","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":533,"name":"车辆报警状态","pid":96,"level":-1,"orderNumber":0,"url":null,"descrioption":"vehicleWarnStatusStr","permisions":[],"optPermisions":[],"fieldPermisions":[]}]},{"id":2471,"name":"档案详情","pid":150,"level":2,"orderNumber":53,"url":null,"descrioption":"档案详情","permisions":[],"optPermisions":[{"id":2479,"name":"基本信息-清除车辆","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"基本信息-清除车辆","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2480,"name":"基本信息-更改手机","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"基本信息-更改手机","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2481,"name":"基本信息-清除手机","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"基本信息-清除手机","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2487,"name":"基本信息-修改级别","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"基本信息-修改级别","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2482,"name":"设备信息-清除设备","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"设备信息-清除设备","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2483,"name":"设备信息-解除绑定","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"设备信息-解除绑定","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2484,"name":"风控信息-拍照","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"风控信息-拍照","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2485,"name":"风控信息-推送","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"风控信息-推送","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2486,"name":"风控信息-照片对比","pid":2471,"level":3,"orderNumber":0,"url":null,"descrioption":"风控信息-照片对比","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"fieldPermisions":[{"id":2472,"name":"基本信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"基本信息","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2473,"name":"设备信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"设备信息","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2474,"name":"驾驶信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"驾驶信息","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2475,"name":"报警信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"报警信息","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2476,"name":"照片信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"照片信息","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2477,"name":"异常信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"异常信息","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2478,"name":"风控信息","pid":2471,"level":-1,"orderNumber":0,"url":null,"descrioption":"风控信息","permisions":[],"optPermisions":[],"fieldPermisions":[]}]},{"id":2128,"name":"绑定信息","pid":150,"level":2,"orderNumber":4,"url":null,"descrioption":"绑定信息","permisions":[],"optPermisions":[{"id":2140,"name":"导出","pid":2128,"level":3,"orderNumber":0,"url":null,"descrioption":"导出","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"fieldPermisions":[{"id":2129,"name":"企业名称","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"companyName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2130,"name":"级别","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"groupName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2131,"name":"车架号","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"sourceOwnerVIN","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2132,"name":"SN号","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"SN","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2133,"name":"设备类型","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"equipmentType","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2134,"name":"绑定状态","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"bindStatus","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2135,"name":"绑定时间","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"installTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2136,"name":"绑定地址","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"installAddress","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2137,"name":"最后定位时间","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"lastLocationTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2138,"name":"最后定位地址","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"lastLocation","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2139,"name":"手机定位地址","pid":2128,"level":-1,"orderNumber":0,"url":null,"descrioption":"phoneLocation","permisions":[],"optPermisions":[],"fieldPermisions":[]}]},{"id":2401,"name":"设备信息","pid":150,"level":2,"orderNumber":5,"url":null,"descrioption":"设备信息","permisions":[],"optPermisions":[{"id":2428,"name":"导出","pid":2401,"level":3,"orderNumber":0,"url":null,"descrioption":"导出","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2414,"name":"处理","pid":2401,"level":3,"orderNumber":0,"url":null,"descrioption":"处理","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"fieldPermisions":[{"id":2402,"name":"企业名称","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"companyName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2403,"name":"级别","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"groupName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2404,"name":"车架号","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"sourceOwnerVIN","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2405,"name":"车主姓名","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"ownerName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2406,"name":"SN号","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"sourceSn","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2407,"name":"设备类型","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"equipmentType","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2408,"name":"最后在线时间","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"lastOnlineTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2409,"name":"最后定位时间","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"lastLocationTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2410,"name":"最后定位地址","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"lastLocation","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2411,"name":"设备离线时长","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"offLineTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2412,"name":"设备未定位时长","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"missLocationTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2413,"name":"处理结果","pid":2401,"level":-1,"orderNumber":0,"url":null,"descrioption":"handlingResult","permisions":[],"optPermisions":[],"fieldPermisions":[]}]}],"optPermisions":[],"fieldPermisions":[]},{"id":194,"name":"工单管理","pid":0,"level":1,"orderNumber":0,"url":null,"descrioption":"工单管理","permisions":[{"id":88,"name":"车辆工单","pid":194,"level":2,"orderNumber":6,"url":null,"descrioption":"车辆工单","permisions":[],"optPermisions":[{"id":90,"name":"绑定导入","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"绑定导入","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":1003,"name":"检修导入","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"检修导入","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":89,"name":"新建绑定","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"新建绑定","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":1001,"name":"新建检修","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"新建检修","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":1002,"name":"新建绑定(OBD)","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"新建绑定(OBD)","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":1009,"name":"新建检修(OBD)","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"新建检修(OBD)","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":92,"name":"下载模板","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"下载模板","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":91,"name":"导出","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"导出","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2468,"name":"进度","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"进度","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":190,"name":"工单详情","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"工单详情","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":95,"name":"删除","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"删除","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":93,"name":"编辑","pid":88,"level":3,"orderNumber":0,"url":null,"descrioption":"编辑","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"fieldPermisions":[{"id":2502,"name":"企业名称","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"企业名称","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2503,"name":"级别","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"级别","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2504,"name":"车主姓名","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"车主姓名","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2505,"name":"车架号","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"车架号","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2506,"name":"工单号","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"工单号","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2507,"name":"工单类型","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"工单类型","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2508,"name":"设备类型","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"设备类型","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2509,"name":"创建时间","pid":88,"level":-1,"orderNumber":0,"url":null,"descrioption":"创建时间","permisions":[],"optPermisions":[],"fieldPermisions":[]}]},{"id":195,"name":"绑定工单","pid":194,"level":2,"orderNumber":7,"url":null,"descrioption":"绑定工单","permisions":[],"optPermisions":[{"id":2488,"name":"备注","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"备注","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":202,"name":"绑定","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"绑定","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":200,"name":"派单","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"派单","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":199,"name":"分单","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"分单","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2511,"name":"取消分单","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"取消分单","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":201,"name":"取消派单","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"取消派单","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":197,"name":"批量派单","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"批量派单","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2432,"name":"删除","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"删除","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2467,"name":"待审核/待确认","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"待审核/待确认","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":1006,"name":"解绑审核","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"解绑审核","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":1005,"name":"申请解绑","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"申请解绑","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":198,"name":"导出","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"导出","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2520,"name":"待初审","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"待初审","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2521,"name":"审核通过(行车记录仪)","pid":195,"level":3,"orderNumber":0,"url":null,"descrioption":"审核通过(行车记录仪)","permisions":[],"optPermisions":[],"fieldPermisions":[]}],"fieldPermisions":[{"id":424,"name":"创建时间","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"createTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":425,"name":"工单号","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"workorderVIN","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":426,"name":"工单类型","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"workorderTypeName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":427,"name":"工单状态","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"deliverOrderTypeName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":428,"name":"设备类型","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"equipmentsTypeName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":429,"name":"企业名称","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"opeName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":430,"name":"级别","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"groupName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":434,"name":"最晚安装时间","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"installTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":435,"name":"设备安装地址","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"installAddress","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":436,"name":"车主姓名","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"ownerName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":438,"name":"品牌车型","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"carType","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":439,"name":"车辆颜色","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"carColor","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":441,"name":"派单人","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"deliverOrdererName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":442,"name":"派单时间","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"deliverOrderTime","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":443,"name":"接单商","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"installerName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":444,"name":"接单员","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"installerUserName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":445,"name":"绑定SN号","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"firstSourceSn","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":446,"name":"绑定时间","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"equipmentTime1","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":493,"name":"车架号","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"sourceOwnerVIN","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":515,"name":"车牌号","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"carId","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":516,"name":"发动机号","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"engineNumber","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":517,"name":"手机号码","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"phoneNumber","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":520,"name":"车辆类型","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"carStyleIdName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":521,"name":"车辆状态","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"vehicleStateName","permisions":[],"optPermisions":[],"fieldPermisions":[]},{"id":2463,"name":"安装方式","pid":195,"level":-1,"orderNumber":0,"url":null,"descrioption":"installTypeStr","permisions":[],"optPermisions":[],"fieldPermisions":[]}]}]}]};
					
					this.treeData = data.data;

					this.newTreeData = [];
					// 遍历生成二级数组
					for(let i in this.treeData) {
						for(let d in this.treeData[i].permisions) {
							this.treeData[i].permisions[d].parent = this.treeData[i];
							this.newTreeData.push(this.treeData[i].permisions[d]);
						}
					}
					// 遍历新数组，添加checked
					function forAddChecked(_data) {
						for(let i in _data) {
							_data[i].checked = false;
							if (_data[i].optPermisions) {
								forAddChecked(_data[i].optPermisions)
							}
							if (_data[i].fieldPermisions) {
								forAddChecked(_data[i].fieldPermisions)
							}
						}
					}
					forAddChecked(this.newTreeData)

				} else {
					this.$message({
						type: 'error',
						showClose: true,
						message: result.msg
					})
				}
			})
		},
		selectAll() { // 全选
			let self = this;
			self.isAllChecked = !self.isAllChecked;
			// 遍历checked属性
			let forDataChecked = (_data) => {
				for(let i in _data) {
					_data[i].checked = self.isAllChecked;
					if (_data[i].optPermisions) {
						forDataChecked(_data[i].optPermisions)
					}
					if (_data[i].fieldPermisions) {
						forDataChecked(_data[i].fieldPermisions)
					}
				}
			}
			forDataChecked(self.newTreeData);
		},
		changeIsAllChecked() { // 专用于 判断全选状态
			let _isAllChecked = true;
			for(let _item of this.newTreeData) {

				if (!_item.checked) _isAllChecked = false; // 只要有未选中就是不全选

				for(let _itemJ of _item.optPermisions) { // 遍历操作权限
					if (!_itemJ.checked) _isAllChecked = false; // 遍历第3级别时，判断是否有未选中的
				}
				for(let _itemK of _item.fieldPermisions) { // 遍历
					if (!_itemK.checked) _isAllChecked = false; // 遍历第3级别时，判断是否有未选中的
				}

			}
			console.log(_isAllChecked)
			this.isAllChecked = _isAllChecked;
		},
		selectSecond(item) { // 二级选项
			item.checked = !item.checked;
			let self = this;

			// 20181017写法
			for(let _item of self.newTreeData) {

				

				if (_item.id === item.id) { // 遍历找到当前对应的二级item

					_item.checked = item.checked;

					for(let _itemJ of _item.optPermisions) { // 遍历操作权限
						// _itemJ.name = _itemJ.name + ' ';
						_itemJ.checked = item.checked;
					}
					for(let _itemK of _item.fieldPermisions) { // 遍历
						_itemK.checked = item.checked;
					}
				}

			}

			this.newTreeData = [...self.newTreeData];

			this.changeIsAllChecked(); // 全选状态判断
		},
		selectAllThree(item) { // 3级选项

			item.checked = !item.checked;
			let self = this;

			for(let _item of self.newTreeData) {

				if (_item.id === item.pid) { // 遍历找到当前对应的二级item

					let _isSecondAllChecked = false;

					for(let _itemJ of _item.optPermisions) { // 遍历操作权限
						
						if (_itemJ.id === item.id) { // 遍历找到当前对应的三级item
							_itemJ.checked = item.checked;
						}
						if (_itemJ.checked) _isSecondAllChecked = true; // 遍历第3级别时，判断是否有未选中的
					}
					for(let _itemK of _item.fieldPermisions) { // 遍历
						if (_itemK.id === item.id) { // 遍历找到当前对应的三级item
							_itemK.checked = item.checked;
						}
						if (_itemK.checked) _isSecondAllChecked = true; // 遍历第3级别时，判断是否有未选中的
					}
					_item.checked = _isSecondAllChecked; // 重置第二级别选中状态
				}

			}
			this.newTreeData = [...self.newTreeData];
			this.changeIsAllChecked(); // 全选状态判断
			
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
	.el-table th, .el-table td {
		padding: 10px;
	}
	.role-checkbox {
		display: inline-block;
		margin:3px 10px;
		cursor: pointer;
	}
	.role-checkbox input[type=checkbox] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 14px;
		height: 14px;
		cursor: pointer;
		margin: 0;
		vertical-align: bottom;
		background: #fff;
		display: inline-block;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		-webkit-border-radius: 1px;
		-moz-border-radius: 1px;
		box-sizing: border-box;
		position: relative;
		top: -4px;
		left: -5px;
	}
	.role-checkbox input[type=checkbox]:hover {
		border-color: #409eff;
	}

	.role-checkbox input[type=checkbox]:checked {
		background: #409eff;
		border-color: #409eff;
	}
	.role-checkbox input[type=checkbox]:checked::after {
		content: "";
		box-sizing: content-box;
		content: "";
		border: 1px solid #fff;
		border-left: 0;
		border-top: 0;
		height: 7px;
		left: 4px;
		position: absolute;
		top: 1px;
		transform: rotate(45deg) scaleY(0);
		width: 3px;
		transition: transform .15s ease-in .05s;
		transform-origin: center;
		transform: rotate(45deg) scaleY(1);
	}
</style>
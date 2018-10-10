import https from './https'
import {systemService} from '../config/const'
export default {
	//分页查询角色
	getRolePage(params) {
		let par = '?pn=' + params.pageIndex + '&ps=' + params.pageSize;
		return https.post(systemService + '/mgr/v1/roles/searchByPage' + par)
	},
	//删除角色
	deleteRole(params) {
		return https.delete(systemService + '/mgr/v1/role',params)
	},
	//获取菜单集合
	resourcesList(params) {
		return https.get(systemService + '/mgr/v1/manageRoleResources', params)
	},
	//新增角色
	addRole(params) {
		return https.post(systemService + '/mgr/v1/role',params)
	},
	//获取角色详情回选接口
	editorRoles(params) {
		return https.get(systemService + '/mgr/v1/role', params)
	},
	//编辑更新角色对象
	updateRoles(params) {
		return https.put(systemService + '/mgr/v1/role',params)
	},
}
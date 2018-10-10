import https from './https'
import {systemService} from '../config/const'
export default {
	//登录接口
	login(params) {
		return https.post(systemService + '/mgr/v1/elogin', params)
	},
	//获取用户登录信息详情
	getUserInfo(params) {
		return https.get(systemService + '/mgr/v1/elogin/detail', params)
	},

}
import https from './https'
import {otherService} from '../config/const'
export default {
	getCarList(params) {
		return https.get(otherService + '/v1/couponEntity', params)
	},
}
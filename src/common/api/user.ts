import $http from '../http'
import {restURL} from "@/common/api/index";

export const wxLogin = () : any => {
	// console.log("wxLogin")
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		});
	})
}


export const userPhoneLogin = (obj: {
	code: string,
	iv: string,
	encryptedData: string,
}): any => {
	// console.log("wxLogin")
	return $http({
		url: restURL('customer/auth'),
		data: obj,
	}).then(res => {
		return res;
	})
}


export const getUserInfo = async (data: any) => {
	return $http({
		url: restURL('customer/auth'),
		data: {},
	}).then(res => {
		return res;
	})

}

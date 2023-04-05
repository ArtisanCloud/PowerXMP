import {$http} from "@/common/api/http";
import {API_METHOD_POST, restURL} from "@/common/api/index";

const URI_MP_CUSTOMER = 'mp/customer/'

export const wxLogin = (): any => {
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


export const userLogin = (obj: {
	code: string,
	iv: string,
	encryptedData: string,
}): any => {
	// console.log("wxLogin")
	return $http({
		url: restURL(URI_MP_CUSTOMER + 'login'),
		method: API_METHOD_POST,
		data: obj,
	}).then(res => {
		return res;
	})
}


export const authByPhone = async (data: any) => {
	return $http({
		url: restURL(URI_MP_CUSTOMER + 'authByPhone'),
		method: API_METHOD_POST,
		data: data,
	}).then(res => {
		return res;
	})

}

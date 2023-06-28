import {$http} from "@/common/api/http";
import {APIMethodPost, restURL} from "@/common/api/index";

const UriMPCustomer = 'mp/customer/'

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
		url: restURL(UriMPCustomer + 'login'),
		method: APIMethodPost,
		data: obj,
	}).then(res => {
		return res;
	})
}


export const authByPhone = async (data: any) => {
	return $http({
		url: restURL(UriMPCustomer + 'authByPhone'),
		method: APIMethodPost,
		data: data,
	}).then(res => {
		return res;
	})

}

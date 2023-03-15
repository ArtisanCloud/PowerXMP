import $http from '../http'

export const getUserInfo = (data: any) => {
	$http({
		url: 'http://localhost:8888/json/user',
		data: {},
	}).then(res => {
		return res;
	})
}

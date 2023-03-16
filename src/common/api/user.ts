import $http from '../http'


export const getUserInfo = async (data: any) => {
	return $http({
		url: 'http://localhost:8888/json/user',
		data: {},
	}).then(res => {
		return res;
	})

}

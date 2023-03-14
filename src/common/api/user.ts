import $http from '../http'

export const getUserInfo = (data: any) => {
	return $http({
		url: 'http://localhost:8888/json/user',
		data: {},
	})
}

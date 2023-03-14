import $http from './mock'

export const getUserInfo = (data: any) => {

	return $http({
		data: {
			'list|1-10': [{
				'id|+1': 1
			}]
		},
	})
}

export const
	STATUS_CODE_SUCCESS = 200,
	STATUS_CODE_UNAUTHORIZED = 401


export function $http(options: any) {
	const {
		url,
		method,
		data
	} = options

	return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: method,
				data: data,
				success(res: any) {
					// console.log(res)
					if (res.statusCode == STATUS_CODE_SUCCESS) {
						// .then
						resolve(res)
					} else if (res.statusCode == STATUS_CODE_UNAUTHORIZED) {
						console.error("http res :",)

						uni.redirectTo({
							url: '/pages/login/login',
						})

						return

					} else {
						//  catch
						reject(res)
					}
				},
				fail(err: any) {
					reject(err)
				}
			});
		}
	)
}
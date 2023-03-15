export default function $http(options: any) {

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
					console.log(res)
					if (res.statusCode == 200) {
						// .then
						resolve(res)
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

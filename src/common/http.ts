export default function $http(options: any) {

	const {
		url,
		data
	} = options

	return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: "GET",
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

import Mock from "mockjs";

export default function $http(options:any) {

	const {
		data
	} = options

	return new Promise((resolve, reject) => {
		const result = Mock.mock(data)

		return resolve(result)
	});
}

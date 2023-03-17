import Mock from "mockjs";

export default async function $http(options: any) {

	const {
		data
	} = options

	return new Promise((resolve, reject) => {
		const result = Mock.mock(data)
		return resolve(result)
	});
}


export const $getList = async (data: any, List: any[]) => {
	// console.log(data)
	// 获取传递的参数pageindex
	const pageNum = data.page
	// 获取传递的参数pagesize
	const pageSize = data.pageSize
	// 截取数据的起始位置
	const start = (pageNum - 1) * pageSize
	// 截取数据的终点位置
	const end = pageNum * pageSize
	// 计算总页数
	const totalPage = Math.ceil(List.length / pageSize)
	// 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
	const list = pageNum > totalPage ? [] : List.slice(start, end)

	return $http({
		meta: {
			resultCode: 200,
			resultMessage: "",
			returnCode: 200,
			returnMessage: "",
		},
		data: list,
		totalRows: List.length

	})


}

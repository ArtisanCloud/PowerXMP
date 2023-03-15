import Mock from "mockjs";

import type {RequestGetWorkList, ResponseGetWorkList} from "@/common/model/media";


const List: any = Mock.mock({
	"list|1-60": [
		{
			"id": '@increment(1)',
			"title": "@ctitle",
			"subTitle": "@ctitle",
			"content": "@cparagraph",
			"coverURL": "@cparagraph",
			"type|0-1": "@",
			"created_time": "@date(yyyy-MM-dd hh:mm:ss)"
		}
	]
})


export const getWorkList = (data: RequestGetWorkList): ResponseGetWorkList => {

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
	const totalPage = Math.ceil(List.list.length / pageSize)
	// 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
	const list = pageNum > totalPage ? [] : List.list.slice(start, end)

	return {
		meta: {
			resultCode: 200,
			resultMessage: "",
			returnCode: 200,
			returnMessage: "",
		},
		data: list,
		totalRows: List.list.length

	}


}

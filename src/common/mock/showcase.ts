import Mock from "mockjs";
import {$getList} from "@/common/mock/mock";
import type {RequestGetWorkList} from "@/common/model/media";


const List: any = Mock.mock({
	"list|1-60": [
		{
			"id": '@increment(1)',
			"title": Mock.Random.ctitle(1, 5),
			"subTitle": Mock.Random.ctitle(10, 20),
			"content": Mock.Random.cparagraph(20),
			"coverURL": "/static/mock/thumbnail.jpg",
			"type": 2,
			"viewedCount": Mock.Random.integer(20, 100),
			"created_time": Mock.Random.datetime()
		}
	]
})


export const getShowcaseList = async (data: RequestGetWorkList) => {
	return $getList(data, List)
}



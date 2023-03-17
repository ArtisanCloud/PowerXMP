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
			"awesomeLink": "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/demo/vtour/index.html?a=111",
			"coverURL": "https://m-1307679408.file.myqcloud.com/pano-demo-o/test-1/at.jpg",
			// "coverURL":Mock.Random.image(),
			// "type": MediaType.work,
			"type": 1,
			"viewedCount": Mock.Random.integer(20, 100),
			"created_time": Mock.Random.datetime()
		}
	]
})


export const getWorkList = async (data: RequestGetWorkList) => {
	return $getList(data, List)
}



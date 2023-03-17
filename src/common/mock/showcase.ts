import Mock from "mockjs";
import {$getList} from "@/common/mock/mock";
import type {RequestGetShowcaseList} from "@/common/model/media";
import {MediaType} from "@/common/model/constant";

let List: API.Media[] = []

for (let i = 0; i < 50; i++) {
	let newObject: any = {}

	newObject = createShowcase(i + 1)

	List.push(newObject)
}


function createShowcase(id: number) {
	return {
		"id": id,
		"title": Mock.Random.ctitle(1, 5),
		"subTitle": Mock.Random.ctitle(10, 20),
		"content": Mock.Random.cparagraph(20),
		"awesomeLink": "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/demo/vtour/index.html?a=111",
		"coverURL": "https://m-1307679408.file.myqcloud.com/pano-demo-o/test-1/at.jpg",
		"type": MediaType.showcase,
		"viewedCount": Mock.Random.integer(20, 100),
		"created_time": Mock.Random.datetime()
	}
}


export const getShowcaseList = async (data: RequestGetShowcaseList) => {
	return $getList(data, List)
}



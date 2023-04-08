import Mock from "mockjs";
import {$getList} from "@/common/mock/mock";
import {MediaType} from "@/common/model/constant";

let List: API.ProductCategory[] = []

for (let i = 0; i < 10; i++) {
	let newObject: any = {}

	newObject = mockCreateProductCategory(i + 1)

	List.push(newObject)
}


function mockCreateProductCategory(id: number) {
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


export const getProductCategoryList = async (data: API.RequestGetProductCategoryList) => {
	return $getList(data, List)
}



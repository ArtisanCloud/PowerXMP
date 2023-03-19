import Mock from "mockjs";
import {$getList} from "@/common/mock/mock";
import type {RequestGetWorkList} from "@/common/model/media";
import {MediaType} from "@/common/model/constant";

let List: API.Media[] = []

for (let i = 0; i < 50; i++) {
	let newObject: any = {}
	switch (i % 2) {
		case 1: {
			newObject = create3DWork(i + 1)
			break;
		}
		default: {
			newObject = createPanoWork(i + 1)
			break;
		}
	}
	List.push(newObject)
}


function createPanoWork(id: number) {

	let awesomeLink = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/demo/vtour/index.html?a=111";
	let coverURL = "https://m-1307679408.file.myqcloud.com/pano-demo-o/test-1/at.jpg";

	if (Math.random() < 0.7) {
		awesomeLink = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/pano-demo-o/test-4s/index.html?v=2";
		coverURL = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/pano-demo-o/test-4s/preview.jpg";
	}

	return {
		"id": id,
		"title": Mock.Random.ctitle(1, 5),
		"subTitle": Mock.Random.ctitle(10, 20),
		"content": Mock.Random.cparagraph(20),

		"awesomeLink":awesomeLink,
		"coverURL":coverURL,
		"type": MediaType.panoWork,
		"viewedCount": Mock.Random.integer(20, 100),
		"created_time": Mock.Random.datetime()
	}
}

function create3DWork(id: number) {

	// let awesomeLink = "https://threejs.org/examples/webgl_animation_keyframes.html";
	// let awesomeLink = "http://localhost:5173";
	let awesomeLink = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/threeD-demo/littlest-tokyo/index.html?a=222";
	let coverURL = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/threeD-demo/littlest-tokyo/preview-tokyo.jpg";
	let title = "仅限demo展示";

	if (Math.random() < 0.5) {
		awesomeLink = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/threeD-demo/sphere/index.html?a=111";
		coverURL = "https://m-1307679408.cos-website.ap-shanghai.myqcloud.com/threeD-demo/sphere/preview.jpg";
		title = Mock.Random.ctitle(1, 5)
	}

	return {
		"id": id,
		"title": title,
		"subTitle": Mock.Random.ctitle(10, 20),
		"content": Mock.Random.cparagraph(20),
		"awesomeLink": awesomeLink,
		"coverURL": coverURL,
		"type": MediaType.threeDWork,
		"viewedCount": Mock.Random.integer(20, 100),
		"created_time": Mock.Random.datetime()
	}
}


export const getWorkList = async (data: RequestGetWorkList) => {
	return $getList(data, List)
}



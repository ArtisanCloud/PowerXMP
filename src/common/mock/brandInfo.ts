import Mock from "mockjs";
import {MediaType} from "@/common/model/constant";


function mockEmployee(id: number): API.Employee {
	return {
		id: id,
		account: Mock.Random.title(),
		name: Mock.Random.ctitle(),
		avatar: Mock.Random.image("128rpx"),
		position: Mock.Random.title(),
		isEnabled: true,
	}
}

function mockBrandInfo(): API.Brand {

	let team: API.Employee[] = []

	for (let i = 0; i < 4; i++) {
		let newObject: API.Employee = mockEmployee(i + 1)

		team.push(newObject)
	}

	return {
		name: "小裂匠",
		extra: "帮助品牌社交裂变",
		description: "一家专注于提供全面的房地产品牌管理服务的公司，致力于帮助房地产企业塑造并提升品牌形象，提高市场竞争力。我们的团队由一群来自不同领域的专业人士组成，包括市场营销、品牌策划、设计、媒体传播等领域的精英，以及拥有多年行业经验的资深管理者。",
		team: team,
	}
}


export const getBrandInfo = async () => {
	return mockBrandInfo()
}



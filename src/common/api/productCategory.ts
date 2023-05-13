import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import type {GetCategoryTreeReply, GetCategoryTreeRequest} from "@/common/model/productCategory";
import {UriProductApi} from "@/common/api/product";


export const getCategoryTree = (data: GetCategoryTreeRequest): Promise<GetCategoryTreeReply> => {
	const url = restURL(UriProductApi + "product-category-tree");

	return $http<GetCategoryTreeReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};



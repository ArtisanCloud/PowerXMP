import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import type {
	GetCategoryListReply,
	GetCategoryListRequest,
	GetCategoryTreeReply,
	GetCategoryTreeRequest
} from "@/common/model/productCategory";
import {UriMPProduct} from "@/common/api/product";


export const getCategoryTree = (data: GetCategoryTreeRequest): Promise<GetCategoryTreeReply> => {
	const url = restURL(UriMPProduct + "product-category-tree");

	return $http<GetCategoryTreeReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};


export const getCategoryList = (data: GetCategoryListRequest): Promise<GetCategoryListReply> => {
	const url = restURL(UriMPProduct + "product-categories");

	return $http<GetCategoryListReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};

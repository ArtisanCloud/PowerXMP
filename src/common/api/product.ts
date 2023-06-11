import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import type {
	GetProductReply,
	GetProductRequest,
	ListProductPageReply,
	ListProductPageRequest
} from "@/common/model/product";

export const UriMPProduct = 'mp/product/'


export const getProductList = (data: ListProductPageRequest): Promise<ListProductPageReply> => {
	const url = restURL(UriMPProduct + "products/page-list");

	return $http<ListProductPageReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};


export const getProduct = (data: GetProductRequest): Promise<GetProductReply> => {
	const url = restURL(UriMPProduct + 'products/' + data.id);

	return $http<GetProductReply>({
		url: url,
		method: APIMethodGet,
	}).then((res) => {
		return res;
	});
};




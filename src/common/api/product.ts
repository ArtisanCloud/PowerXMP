import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import type {ListProductPageReply, ListProductPageRequest} from "@/common/model/product";

export const UriProductApi = 'mp/product/'


export const getProductList = (data: ListProductPageRequest): Promise<ListProductPageReply> => {
	const url = restURL(UriProductApi + "page-list");

	return $http<ListProductPageReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};



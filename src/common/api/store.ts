import {$http} from "@/common/api/http";
import {APIMethodGet, restURL} from "@/common/api/index";
import type {ListStoreReply, ListStoreRequest, Store} from "@/common/model/store";
import {UriMPMarket} from "@/common/api/media";


export const getStoreList = (data: ListStoreRequest): Promise<ListStoreReply> => {
	const url = restURL(UriMPMarket + "stores/page-list");

	return $http<ListStoreReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};
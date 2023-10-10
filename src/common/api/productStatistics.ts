import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";
import type {

	GetProductStatisticsRequest, GetProductStatisticsReply
} from "@/common/model/product";
import {UriMPProduct} from "@/common/api/product";


export const getProductStatistics = (data: GetProductStatisticsRequest): Promise<GetProductStatisticsReply> => {
	const url = restURL(UriMPProduct + `product-statistics/${data.productId}`);

	return $http<GetProductStatisticsReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};

